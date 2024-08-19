import toast from "react-hot-toast";
import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const updateScore = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/user/update-score`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")).token}`,
          },
          body: JSON.stringify({
            scorePoints: points,
          }),
        }
      );
      if (res.ok) {
        toast.success(
          "Your score has been uplaoded succcessfully, you can proceed to view leaderboard"
        );
      }
    } catch (error) {
      toast.error(
        error.message || "something happened please try again later!"
      );
    }
  };
  const { dispatch, points, answer, index, numQuestions } = useQuiz();

  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "finish" });
          updateScore();
        }}
      >
        Finish
      </button>
    );
}

export default NextButton;
