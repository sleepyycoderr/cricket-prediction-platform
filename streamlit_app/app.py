import streamlit as st
import requests

API_URL = "http://127.0.0.1:8000"

st.title("🏏 Cricket Predictor System")

st.header("Score Prediction")

model = st.selectbox("Model", ["catboost", "extratrees", "xgboost"])
batting_team = st.text_input("Batting Team")
bowling_team = st.text_input("Bowling Team")
city = st.text_input("City")

current_score = st.number_input("Current Score", 0)
overs_done = st.number_input("Overs Done", 0.0)
wickets_out = st.number_input("Wickets Out", 0)
last_five = st.number_input("Runs in last 5 overs", 0)

if st.button("Predict Score"):
    payload = {
        "model": model,
        "batting_team": batting_team,
        "bowling_team": bowling_team,
        "city": city,
        "current_score": current_score,
        "overs_done": overs_done,
        "wickets_out": wickets_out,
        "last_five": last_five
    }

    res = requests.post(f"{API_URL}/predict-score", json=payload)

    if res.status_code == 200:
        st.success(f"Predicted Score: {res.json()['predicted_score']}")
    else:
        st.error(res.text)
