export const answeredSubmitted = (
  questionId,
  answerSelected,
  setCorrectAnswer
) => {
  fetch("/checkAnswer", {
    method: "POST",
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
      id: questionId,
      answerSelected: answerSelected,
    }),
  })
    .then((response) => response.json())
    .then((answer) => setCorrectAnswer(answer))
    .catch((error) => alert(error.message));
};

export const nextQuestion = (
  setNext,
  next,
  setcorrectAnswer,
  playerScore,
  setPlayerScore
) => {
  setNext(!next);
  setcorrectAnswer(null);
  setPlayerScore(playerScore + 1);
};
