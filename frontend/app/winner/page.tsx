"use client";

import { useState } from "react";
import { predictWinner } from "@/lib/api";
import SelectField from "@/components/SelectField";
import NumberField from "@/components/NumberField";
import Select from "@/components/DropdownSelect";


// ===== OPTIONS =====

// 1. Batting Teams
const BATTING_TEAMS = [
  'Sri Lanka','Ireland','New Zealand','Bangladesh','England',
  'South Africa','India','Australia','Pakistan','Hong Kong',
  'Netherlands','Oman','West Indies','United Arab Emirates',
  'Papua New Guinea','Scotland','Zimbabwe','Thailand','Uganda',
  'Malaysia','Lesotho','Namibia','Botswana','Sierra Leone',
  'Malawi','Nepal','Kuwait','China','Philippines','Vanuatu',
  'United States of America','Italy','Mozambique','Nigeria',
  'Tanzania','Rwanda','Kenya','Indonesia','Samoa','Fiji',
  'Canada','Ghana','Germany','Norway','Denmark','Guernsey',
  'Maldives','Qatar','Singapore','South Korea','Japan',
  'Cayman Islands','Bermuda','Jersey','Spain','Portugal',
  'Bhutan','Saudi Arabia','Bahrain','Austria','Luxembourg',
  'Czech Republic','Romania','Greece','Serbia','Malta',
  'Belgium','France','Sweden','Gibraltar','Finland','Eswatini',
  'Bulgaria','Hungary','Cyprus','Isle of Man','Estonia',
  'Switzerland','Brazil','Seychelles','Cameroon','Belize',
  'Argentina','Panama','Bahamas','Barbados','Israel','Turkey',
  'Croatia','Slovenia','Cook Islands','Mali','Gambia',
  'Cambodia','Myanmar','Mongolia','Costa Rica','Mexico',
  'Suriname'
];

// 2. Bowling Teams
const BOWLING_TEAMS = [
  'Australia','Hong Kong','Bangladesh','New Zealand',
  'South Africa','England','West Indies','India','Sri Lanka',
  'Scotland','Oman','Pakistan','Papua New Guinea',
  'United Arab Emirates','Netherlands','Ireland','Zimbabwe',
  'Thailand','Uganda','Malaysia','Botswana','Malawi',
  'Sierra Leone','Mozambique','Namibia','Lesotho','Nepal',
  'China','Kuwait','Vanuatu','Philippines',
  'United States of America','Germany','Nigeria','Tanzania',
  'Japan','Indonesia','Fiji','Samoa','Ghana','Kenya',
  'Guernsey','Denmark','Jersey','Italy','Norway','Maldives',
  'Mali','Singapore','Bermuda','Canada','Cayman Islands',
  'Portugal','Gibraltar','Spain','Bhutan','Qatar','Iran',
  'Austria','Belgium','Isle of Man','Luxembourg',
  'Czech Republic','Rwanda','Greece','Serbia','Bulgaria',
  'Romania','Malta','France','Sweden','Finland','Eswatini',
  'Cameroon','Hungary','Estonia','Cyprus','Switzerland',
  'Argentina','Seychelles','Swaziland','Bahrain','Belize',
  'Bahamas','Panama','Barbados','Saudi Arabia','Brazil',
  'Israel','Croatia','Turkey','Slovenia','Cook Islands',
  'South Korea','Gambia','Cambodia','Myanmar','Mexico',
  'Costa Rica','Mongolia','Suriname'
];

// 3. Cities
const CITIES = [
  'Victoria','Londonderry','Napier','Mount Maunganui','Auckland',
  'Southampton','Taunton','Cardiff','Chester-le-Street','Kanpur',
  'Nagpur','Bangalore','Lauderhill','Colombo','Abu Dhabi',
  'Nelson','Bangkok','Hobart','Wellington','Hamilton',
  'Bloemfontein','Potchefstroom','Barbados','Trinidad','Sydney',
  'Canberra','Jamaica','Ranchi','Guwahati','Birmingham',
  'Manchester','Bristol','Delhi','Rajkot','Thiruvananthapuram',
  'Lahore','Johannesburg','Centurion','Cape Town','Cuttack',
  'Indore','Mumbai','Antigua','East London','Chelmsford',
  'Edinburgh','Dhaka','New Plymouth','Karachi','Dublin',
  'Rotterdam','Deventer','Amstelveen','Brisbane','St Kitts',
  'Utrecht','Kuala Lumpur','Guyana','St Lucia','Sylhet',
  'FTZ Sports Complex','Kolkata','Lucknow','Chennai',
  'Gros Islet','Basseterre','Gaborone','Northampton','Brighton',
  'Visakhapatnam','Bengaluru','Bready','Derry','Dubai',
  'Al Amarat','Perth','Melbourne','Port Moresby','Pretoria',
  'Pietermaritzburg','Benoni','Windhoek','Harare','Port Vila',
  'Adelaide','Kampala','Castel','St Peter Port','Durban',
  'Port Elizabeth','Chandigarh','Hyderabad','Christchurch',
  'Providence','Kigali City','Murcia','Singapore','The Hague',
  'Kandy','Dundee','Arbroath','Chattogram','Incheon',
  'Bridgetown','Surat','Pune',"St George's",'Almeria',
  'Kirtipur','Pokhara','Lower Austria','Walferdange','Derby',
  'Dunedin','Paarl','Nottingham','Leeds','Ahmedabad','Belfast',
  'Coolidge','Carrara','Prague','Sofia','North Sound','Marsa',
  'Krefeld','Brondby','Albergaria','Kerava','Sharjah','Entebbe',
  'Kolsva','Ilfov County','Jaipur','Dharamsala','Episkopi',
  'Naucalpan','Lagos','Doha','Queenstown','Geelong','Worcester',
  'Bulawayo','Ajman','Roseau','Tarouba','Kingston','Dambulla',
  'Bangi','Ghent','Waterloo','St Saviour','Vantaa','Schiedam',
  'Belgrade','Nairobi','Sano','London','Osaka','Gqeberha',
  'Rawalpindi','Chiang Mai','Navi Mumbai','Phnom Penh',
  'Buenos Aires','Mong Kok','Gibraltar','Copenhagen',
  'St Clement','Raipur','Szodliget','Los Angeles','Kimberley',
  'Canterbury','Hangzhou','Kathmandu','Bali',
  'Wong Nai Chung Gap','Dallas','New York','Kingstown','Johor',
  'Accra','Houston','Mackay','Guacima','Dreux','Spinaceto',
  'Rome','Hambantota','Gwalior','Port  Soif','Zagreb','Apia',
  'Oslo','Multan','Koge','Dar-es-Salaam','King City','Corfu',
  'Seropedica','Gelephu','Blantyre','Jinja','Abuja',
  'Mexico City','Cave Hill','Noumea','Tallinn','Darwin',
  'Cairns','Panama City','George Town','Latschach','Zemst',
  'Glasgow','Graz','Ishoj','Stockholm','Suva','Malkerns',
  'Mirpur','Hove','Loughborough','St Vincent','Chittagong',
  'Dominica','Gold Coast','Grenada','Dharmasala','Mohali',
  'Hong Kong','Townsville','Khulna','Fatullah'
];

const WINNER_MODELS = [
  { label: "LightGBM (Best Accuracy)", value: "lightgbm" },
  { label: "CatBoost", value: "catboost" },
  { label: "XGBoost", value: "xgboost" },
] as const;

type WinnerModel = (typeof WINNER_MODELS)[number]["value"];



export default function WinnerPage() {
  const [model, setModel] = useState<WinnerModel>("lightgbm");

  const [battingTeam, setBattingTeam] = useState("");
  const [bowlingTeam, setBowlingTeam] = useState("");
  const [city, setCity] = useState("");

  // USER INPUTS (UI)
  const [target, setTarget] = useState("");
  const [currentScore, setCurrentScore] = useState("");
  const [oversCompleted, setOversCompleted] = useState("");
  const [wicketsFallen, setWicketsFallen] = useState("");

  const [result, setResult] = useState<null | {
    batting: number;
    bowling: number;
  }>(null);

  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await predictWinner({
        model, // dynamic
        batting_team: battingTeam,
        bowling_team: bowlingTeam,
        city,
        target: Number(target),
        current_score: Number(currentScore),
        overs_completed: Number(oversCompleted),
        wickets_fallen: Number(wicketsFallen),
      });

      setResult({
        batting: Math.round(res.batting_team_win_prob ),
        bowling: Math.round(res.bowling_team_win_prob ),
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
    Match Winner Predictor
  </h2>

  {/* Subtitle */}
  <p
    className="
      text-sm

      text-black/70
      dark:text-white/80
    "
  >
    Predict the match outcome during second innings
  </p>
</div>


      {/* INPUT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Prediction Model"
            value={
              WINNER_MODELS.find((m) => m.value === model)?.label || ""
            }
            options={WINNER_MODELS.map((m) => m.label)}
            onChange={(label) => {
              const selected = WINNER_MODELS.find((m) => m.label === label);
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
          label="City"
          value={city}
          onChange={setCity}
          options={CITIES}
        />


        <NumberField
          label="Target"
          value={target}
          onChange={setTarget}
          min={0}
          max={300}
          step={1}
          placeholder="Between 0 to 300"
        />



        <NumberField
          label="Current Score"
          value={currentScore}
          onChange={setCurrentScore}
          min={50}
          max={300}
          step={1}
          placeholder="Between 50 to 300"
        />



        <NumberField
          label="Overs Completed"
          value={oversCompleted}
          onChange={setOversCompleted}
          min={0}
          max={19.5}
          step={0.1}
          placeholder="e.g. 14.3 (overs.balls)->{between 0.0 to 19.5}"
        />




        <NumberField
          label="Wickets Fallen"
          value={wicketsFallen}
          onChange={setWicketsFallen}
          min={1}
          max={10}
          step={1}
          placeholder="Between 1 to 10"
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
    {loading ? "Predicting..." : "Predict Winner"}
  </span>
</button>


      {/* RESULT */}
      {result && (
        <div className="space-y-4 mt-6">
          <div>
            Batting Team: {result.batting}%
            <div className="h-3 bg-white/10 rounded">
              <div
                className="h-3 bg-green-400 rounded"
                style={{ width: `${result.batting}%` }}
              />
            </div>
          </div>

          <div>
            Bowling Team: {result.bowling}%
            <div className="h-3 bg-white/10 rounded">
              <div
                className="h-3 bg-purple-400 rounded"
                style={{ width: `${result.bowling}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
