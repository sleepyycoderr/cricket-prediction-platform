const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";




/* =======================
   TYPES
======================= */

// -------- Score (First Innings) --------

export interface ScoreRequest {
  model: "catboost" | "extratrees" | "xgboost";
  batting_team: string;
  bowling_team: string;
  city: string;
  current_score: number;
  overs_done: number;
  wickets_out: number;
  last_five: number;
}

export interface ScoreResponse {
  predicted_score: number;
}

// -------- Winner (Second Innings) --------
export interface WinnerRequest {
  model: "lightgbm" | "catboost" | "xgboost";
  batting_team: string;
  bowling_team: string;
  city: string;
  target: number;
  current_score: number;
  overs_completed: number;
  wickets_fallen: number;
}

export interface WinnerResponse {
  batting_team_win_prob: number;
  bowling_team_win_prob: number;
}

/* =======================
   API CALLS
======================= */

export async function predictScore(
  payload: ScoreRequest
): Promise<ScoreResponse> {
  const res = await fetch(`${BASE_URL}/predict-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Score prediction failed");
  }

  return res.json();
}


export async function predictWinner(
  payload: WinnerRequest
): Promise<WinnerResponse> {
  const res = await fetch(`${BASE_URL}/predict-winner`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Winner prediction failed");
  }

  return res.json();
}
