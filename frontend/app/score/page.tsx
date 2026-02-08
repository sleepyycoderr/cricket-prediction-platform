"use client";

import { useState } from "react";
import { predictScore } from "@/lib/api";
import SelectField from "@/components/SelectField";
import NumberField from "@/components/NumberField";
import Select from "@/components/DropdownSelect";


// ===== OPTIONS =====

// 1. Batting Teams
const BATTING_TEAMS = [
  'Australia', 'New Zealand', 'South Africa', 'England', 'India',
  'West Indies', 'Pakistan', 'Bangladesh', 'Afghanistan', 'Sri Lanka'
];


// 2. Bowling Teams
const BOWLING_TEAMS = [
  'Sri Lanka', 'Bangladesh', 'New Zealand', 'England',
  'South Africa', 'India', 'Pakistan', 'West Indies',
  'Australia', 'Afghanistan'
];

// 3. venuw/cities
const VENUES = [
  'Melbourne', 'Adelaide', 'Mount Maunganui', 'Auckland',
  'Southampton', 'Cardiff', 'Nagpur', 'Bangalore', 'Lauderhill',
  'Dubai', 'Abu Dhabi', 'Sydney', 'Wellington', 'Hamilton',
  'Barbados', 'Trinidad', 'Colombo', 'St Kitts', 'Manchester',
  'Delhi', 'Lahore', 'Johannesburg', 'Centurion', 'Cape Town',
  'Mumbai', 'Kolkata', 'Durban', 'Chandigarh', 'Christchurch',
  'London', 'Nottingham', 'St Lucia', 'Pallekele', 'Mirpur',
  'Chittagong'
];

const SCORE_MODELS = [
  { label: "CatBoost Regressor (Best Accuracy)", value: "catboost" },
  { label: "Extra Trees Regressor", value: "extratrees" },
  { label: "XGBoost Regressor", value: "xgboost" },
] as const;


export default function WinnerPage() {

  type ScoreModel = (typeof SCORE_MODELS)[number]["value"];

const [model, setModel] = useState<ScoreModel>("catboost");


  const [battingTeam, setBattingTeam] = useState("");
  const [bowlingTeam, setBowlingTeam] = useState("");
  const [venue, setVenue] = useState("");

  const [oversCompleted, setOversCompleted] = useState("");
  const [runsScored, setRunsScored] = useState("");
  const [wicketsFallen, setWicketsFallen] = useState("");
  const [runsLast5, setRunsLast5] = useState("");

  const [result, setResult] = useState<null | {
    predictedScore: number;
  }>(null);

  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
  setLoading(true);
  try {
    const res = await predictScore({
  model,
  batting_team: battingTeam,
  bowling_team: bowlingTeam,

  city: venue,                
  current_score: Number(runsScored),
  overs_done: Number(oversCompleted), 
  wickets_out: Number(wicketsFallen), 
  last_five: Number(runsLast5),        
});

  


    setResult({
      predictedScore: res.predicted_score,
   });
  } catch (err) {
    console.error(err);
    alert("Prediction failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="space-y-10">
      <div className="text-center space-y-2">
  {/* Main Heading */}
  <h2
    className="
      text-3xl font-bold

    
    /* LIGHT MODE → green-yellow */
    text-green-700

    /* DARK MODE → purple */
    dark:text-purple-300
    "
  >
    Cricket Score Prediction
  </h2>

  {/* Subtitle */}
  <p
    className="
      text-sm

      text-black/70
      dark:text-white/80
    "
  >
    Predict the final score during the first innings
  </p>
</div>


      {/* INPUT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Dropdowns */}


  <Select
  label="Prediction Model"
  value={
    SCORE_MODELS.find((m) => m.value === model)?.label || ""
  }
  options={SCORE_MODELS.map((m) => m.label)}
  onChange={(label) => {
    const selected = SCORE_MODELS.find((m) => m.label === label);
    if (selected) setModel(selected.value);
  }}
/>


  <Select
    label="Batting Team"
    value={battingTeam}
    onChange={setBattingTeam}
    options={BATTING_TEAMS}
  />

  <Select
    label="Bowling Team"
    value={bowlingTeam}
    onChange={setBowlingTeam}
    options={BOWLING_TEAMS}
  />

  <Select
    label="Venue"
    value={venue}
    onChange={setVenue}
    options={VENUES}
  />

  {/* Numbers */}
  <NumberField
  label="Overs Completed"
  value={oversCompleted}
  onChange={setOversCompleted}
  min={0.1}
  max={19.5}
  step={0.1}
  placeholder="e.g. 14.3 (between 0.1 – 19.5)"
/>


  <NumberField
    label="Runs Scored So Far"
    value={runsScored}
    onChange={setRunsScored}
    min={0}
    max={300}
    step={1}
    placeholder="0 to 300"
  />

  <NumberField
    label="Wickets Fallen"
    value={wicketsFallen}
    onChange={setWicketsFallen}
    min={0}
    max={10}
    step={1}
    placeholder="between 0 to 10"
  />

  <NumberField
    label="Runs in Last 5 Overs"
    value={runsLast5}
    onChange={setRunsLast5}
    min={0}
    max={100}
    step={1}
    placeholder="Runs in last 5 overs"
  />

</div>


      {/* BUTTON */}
      <button
  onClick={handlePredict}
  disabled={loading}
  className="
    relative mx-auto block overflow-hidden
    px-14 py-4 rounded-full
    text-lg font-semibold
    text-black dark:text-white

    /* LIGHT MODE (UNCHANGED) */
    bg-gradient-to-r
    from-green-400 via-green-300 to-yellow-400
    shadow-[0_10px_40px_rgba(34,197,94,0.35)]

    /* DARK MODE → PURPLE BUTTON */
    dark:bg-gradient-to-r
    dark:from-purple-500
    dark:via-fuchsia-500
    dark:to-indigo-500

    /* DARK MODE → PURPLE GLOW */
    dark:shadow-[0_0_80px_rgba(168,85,247,0.75)]

    transition-all duration-300
    hover:scale-[1.04]

    /* Hover glow boost */
    hover:shadow-[0_0_60px_rgba(34,197,94,0.7)]
    dark:hover:shadow-[0_0_90px_rgba(168,85,247,0.9)]


    active:scale-[0.97]
    disabled:opacity-60
    disabled:cursor-not-allowed
  "
>
  {/* glass shine */}
  <span className="
    absolute inset-0
    bg-white/20
    dark:bg-purple-400/15
    blur-xl
  " />

  <span className="relative z-10">
    {loading ? "Predicting..." : "Predict Score"}
  </span>
</button>

{result && (
  <div className="text-center text-2xl font-bold mt-6">
    Predicted Final Score: {result.predictedScore}
  </div>
)}


    </div>
  );
}
