const API_BASE = "http://localhost:8000";

interface ModerationAPIResponse {
    text: string;
    scores: [string, number][];
}

export interface ModerationResult {
    text: string;
    scores: ModerationCategory[];
}

export interface ModerationCategory {
    category: string;
    score: number;
}

export interface LatencyResult {
    text: string;
    scores: ModerationCategory[];
    durationMs: number;
}

export async function moderateText(text: string): Promise<ModerationResult> {
    const res = await fetch(`${API_BASE}/moderate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });

    if (!res.ok) {
        throw new Error("Moderation failed");
    }

    const data: ModerationAPIResponse = await res.json();
    const transformedScores: ModerationCategory[] = data.scores.map(
        ([category, score]) => ({
            category,
            score
        })
    );
    const result: ModerationResult = {text: data.text, scores: transformedScores};
    return result
}

export async function moderateWithTiming(text: string): Promise<LatencyResult> {
    const start = performance.now()
    const res = await fetch(`${API_BASE}/moderate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });
    const end = performance.now()

    if (!res.ok) {
        throw new Error("Moderation failed");
    }

    const data: ModerationAPIResponse = await res.json();
    const transformedScores: ModerationCategory[] = data.scores.map(
        ([category, score]) => ({
            category,
            score
        })
    );
    const result: LatencyResult = {
        text: data.text,
        scores: transformedScores,
        durationMs: +(end - start).toFixed(2)};
    return result
}