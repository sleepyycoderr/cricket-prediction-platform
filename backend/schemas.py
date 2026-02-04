from pydantic import BaseModel, Field
from typing import Literal


class ScoreRequest(BaseModel):
    model: Literal["catboost", "extratrees", "xgboost"]
    batting_team: str
    bowling_team: str
    city: str
    current_score: int = Field(ge=0)
    overs_done: float = Field(gt=0)
    wickets_out: int = Field(ge=0, le=10)
    last_five: int = Field(ge=0)


class ScoreResponse(BaseModel):
    predicted_score: int


class WinnerRequest(BaseModel):
    model: Literal["catboost", "xgboost", "lightgbm"]
    batting_team: str
    bowling_team: str
    city: str
    target: int = Field(gt=0)
    current_score: int = Field(ge=0)
    overs_completed: float = Field(gt=0)
    wickets_fallen: int = Field(ge=0, le=10)


class WinnerResponse(BaseModel):
    batting_team_win_prob: float
    bowling_team_win_prob: float
