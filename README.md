# Lakera_MVP_Task
## AI Assistance
For this task, ChatGPT was used - not for writing specific code segments, but rather to help identify suitable models on Hugging Face for the task, generate base phrases, and explain certain concepts to me.

---
## Installation 
Follow these steps to run the MVP on your local machine:

1. **Clone the repository**  
```bash
git clone <repository-url>
```

2. **Navigate to the server/backend directory**
```bash
cd Server
```


3. **Install the required Python packages**
```bash
pip install -r requirements.txt
```

4. **Start the backend server**
```bash
uvicorn main:app --reload
```

5. **Navigate back to the root of the repository, then into the frontend directory**
```bash
cd ../Frontend/no-harm
```

6. **Install the frontend dependencies**
```bash
npm install
```

7. **Start the frontend application**
```bash
npm start
```
---
##  What needs to be done to make this MVP production-ready?
A basic MVP isn't enough for real-world usage. Production completness includes improvements in:
- Code quality
- Security
- Monitoring
- Performance
- Frontend behavior
- Deployment
- Documentation

### Code Quality and Structure
- Logging: Add Python's logging module
- Use evniroment variables: Manage things like port, CORS, model name via .env
- Add Tests: Include automated tests for APU and inference
- Improve error handling: Use consistent status, details and messages for errors

### Security 
- Restrict CORS: Only allow trusted domains
- Rate limiting: To prevent abuse
- Input validation: Limit the input size and block unsafe content
- Authentication / API-Key: Secure usage
- Force HTTPS: Only accept encrypted connections

### Monitoring & Observability
- Log response times and errors
- Healthh endpoint: Add an endpoint for status checks
- Setul alerts: Add Notifications for high latency ir outages

### Performance & Scalability
- Optimize model usage
- Async API: Use async in FastAPI for better performance
- Prediction caching: cache the repeated results
- Load testing: Add tests to simulate traffic

### Frontend Optimizations
- Error hadnling in UI: Show clearer messages and validate the user input
- Loading states & tiemouts: Improve user feedback with UI components
- Hosting: Deploy the frontend
- Load testing: Simulate traffic with tools

### Deployment & Infrastructure 
- Dockerize the APP
- Add reverse proxy
- Choose a platform: AWS, Fly.io, Heroku

### Dokumentation 
- Update README
- Create an Maintenance plan

___
