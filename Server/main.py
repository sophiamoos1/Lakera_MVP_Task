from transformers import AutoTokenizer, AutoModelForSequenceClassification
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch

# FastAPI App start
app = FastAPI()
cache_dir = "./local_model"

# Prepare Model
model_name = "KoalaAI/Text-Moderation"
tokenizer = AutoTokenizer.from_pretrained(model_name, cache_dir=cache_dir)
model = AutoModelForSequenceClassification.from_pretrained(model_name, cache_dir=cache_dir)
id2label = model.config.id2label

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request-Datamodel
class TextRequest(BaseModel):
    text: str

# Main Endepoint
@app.post("/moderate")
def moderate(request: TextRequest):
    try:
        inputs = tokenizer(request.text, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)
            scores = torch.nn.functional.softmax(outputs.logits[0], dim=0)

        label_score_pairs = [(id2label[i], float(scores[i])) for i in range(len(scores))]
        label_score_pairs.sort(key=lambda x: x[1], reverse=True)

        return {"text": request.text, "scores": label_score_pairs}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
