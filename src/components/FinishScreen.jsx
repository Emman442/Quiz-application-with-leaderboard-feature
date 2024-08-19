import { useNavigate } from "react-router-dom";
import { useQuiz } from "../contexts/QuizContext";
import { useState } from "react";
import Leaderboard from "./Leaderboard";

function FinishScreen() {
  const [openLeaderboard, setOpenLeaderboard] = useState(false)
  const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();

  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      {openLeaderboard && (
        <Leaderboard setOpenLeaderboard={setOpenLeaderboard} />
      )}

      <p className="result" style={{ color: "black" }}>
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <div className="mobile-style">
        <button
          className="btn btn-ui option-text"
          onClick={() => dispatch({ type: "restart" })}
        >
          Restart quiz
        </button>
        <button
          onClick={() => setOpenLeaderboard(true)}
          className="block option-text font-semibold px-[1.2rem] hover:border-[2px] hover:bg-transparent  hover:text-white hover:border-[#00FF89] transition-[0.3s] rounded-[100px] py-[1.6rem] bg-[#00FF89] text-black text-[20px]"
        >
          View leaderboard
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
