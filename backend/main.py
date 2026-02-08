from schemas import (
    ScoreRequest, ScoreResponse,
    WinnerRequest, WinnerResponse
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import pickle
import os

# ✅ FIRST: create app
app = FastAPI(title="Cricket Predictor Backend")

# ✅ THEN: add middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

# Load models ONCE
score_models = {
    "catboost": pickle.load(open(os.path.join(MODEL_DIR, "catboost_score.pkl"), "rb")),
    "extratrees": pickle.load(open(os.path.join(MODEL_DIR, "extratress_score.pkl"), "rb")),
    "xgboost": pickle.load(open(os.path.join(MODEL_DIR, "xgb_score.pkl"), "rb")),
}

winner_models = {
    "catboost": pickle.load(open(os.path.join(MODEL_DIR, "catboost_win.pkl"), "rb")),
    "xgboost": pickle.load(open(os.path.join(MODEL_DIR, "xgb_win.pkl"), "rb")),
    "lightgbm": pickle.load(open(os.path.join(MODEL_DIR, "lgbm_win.pkl"), "rb")),
}

@app.get("/")
def health_check():
    return {"status": "Models loaded successfully"}


import pandas as pd
from fastapi import HTTPException

@app.post("/predict-score", response_model=ScoreResponse)
def predict_score(data: ScoreRequest):
    overs_done = data.overs_done
    current_score = data.current_score
    wickets_out = data.wickets_out

    balls_bowled = int(overs_done * 6)
    balls_left = max(0, 120 - balls_bowled)
    wicket_left = 10 - wickets_out
    current_run_rate = current_score / overs_done

    input_df = pd.DataFrame([{
        "batting_team": data.batting_team,
        "bowling_team": data.bowling_team,
        "city": data.city,
        "current_score": current_score,
        "balls_left": balls_left,
        "wicket_left": wicket_left,
        "current_run_rate": current_run_rate,
        "last_five": data.last_five
    }])

    model = score_models[data.model]
    prediction = int(model.predict(input_df)[0])

    return ScoreResponse(predicted_score=prediction)


from fastapi import HTTPException

@app.post("/predict-winner", response_model=WinnerResponse)
def predict_winner(payload: WinnerRequest):
    model = winner_models[payload.model]

    balls_left = int(120 - (payload.overs_completed * 6))
    runs_left = payload.target - payload.current_score
    wickets_left = 10 - payload.wickets_fallen

    crr = payload.current_score / payload.overs_completed
    rrr = (runs_left * 6) / balls_left if balls_left > 0 else 0.0

    input_df = pd.DataFrame([{
        "batting_team": payload.batting_team,
        "bowling_team": payload.bowling_team,
        "city": payload.city,
        "runs_left": runs_left,
        "balls_left": balls_left,
        "wickets_left": wickets_left,
        "total_runs_x": payload.target,
        "crr": crr,
        "rrr": rrr
    }])

    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(input_df)[0]
        batting_prob = probs[1] * 100
        bowling_prob = probs[0] * 100
    else:
        batting_prob = model.predict(input_df)[0] * 100
        batting_prob = max(0, min(100, batting_prob))
        bowling_prob = 100 - batting_prob

    return WinnerResponse(
        batting_team_win_prob=round(batting_prob, 2),
        bowling_team_win_prob=round(bowling_prob, 2)
    )