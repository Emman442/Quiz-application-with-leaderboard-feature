import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();

  return (
    <div className="start">
      <h2 className="">Welcome to The Solana Quiz!</h2>
      <h3>{numQuestions} questions to test your Solana mastery</h3>
      <button
        className="btn btn-ui"
        style={{
          backgroundColor: "#00FF89",
          color: "black"
        }}
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
