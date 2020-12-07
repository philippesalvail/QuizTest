import React from "react";
import MultipleChoice from "./MultipleChoice";
import styled from "styled-components";
import {nextQuestion} from "../Model/functions";
import ScoreHistory from "./ScoreHistory";
import Loading from "./Loader";

function Question() {
  const [answerSelected, setAnswerSelected] = React.useState(null);
  const [correctAnswer, setCorrectAnswer] = React.useState(null);
  const [question, setQuestion] = React.useState(null);
  const [next, setNext] = React.useState(false);
  const [playerScore, setPlayerScore] = React.useState(0);
  const [choices, setChoices] = React.useState(null);

  const [scores, setScores] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [scoresPerPage] = React.useState(2);

  const indexOfLastScore = currentPage * scoresPerPage;
  const indexOfFirstScore = indexOfLastScore - scoresPerPage;
  const currentScores = scores.slice(indexOfFirstScore, indexOfLastScore);

  React.useEffect(() => {
    fetch("/getQuestion")
      .then((response) => response.json())
      .then((questionRetrieved) => {
        setQuestion(questionRetrieved.questionWithoutAnswer);
        setChoices(questionRetrieved.questionWithoutAnswer.options);
      })
      .catch((error) => console.log(error));
  }, [next]);

  if (scores.length > 0) {
    console.log("scores in if statement: ", scores);
  }

  const resetGame = () => {
    setScores([...scores, playerScore]);
    setPlayerScore(0);
    setCorrectAnswer(null);
    setNext(!next);
  };

  return (
    <>
      {question ? (
        <QuestionPage>
          <SideBar>
            <ScoreHistoryBanner>Highest Score to Lowest</ScoreHistoryBanner>
            <ScoreHistory
              scores={currentScores}
              totalScores={scores.length}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </SideBar>
          <Wrapper>
            <QuestionSelected>
              <WelcomeBanner>
                <UserScore>Score: {playerScore} / 50</UserScore>{" "}
              </WelcomeBanner>
              <QuestionForm>
                <QuestionAsked>{question.question}</QuestionAsked>
                <div>
                  <MultipleChoice
                    setAnswerSelected={setAnswerSelected}
                    answerSelected={answerSelected}
                    answers={choices}
                    question={question}
                    setCorrectAnswer={setCorrectAnswer}
                    setQuestion={setQuestion}
                  />
                </div>
              </QuestionForm>
              {correctAnswer && correctAnswer.correct && (
                <RightAnswer>
                  <div>{correctAnswer.message} </div>
                  <NextQuestionBtn
                    onClick={() => {
                      nextQuestion(
                        setNext,
                        next,
                        setCorrectAnswer,
                        playerScore,
                        setPlayerScore,
                        setChoices
                      );
                    }}
                  >
                    Next Question
                  </NextQuestionBtn>
                </RightAnswer>
              )}
              {correctAnswer && !correctAnswer.correct && (
                <WrongAnswer>
                  <div>{correctAnswer.message}</div>
                  <ResetBtn
                    onClick={() => {
                      resetGame();
                    }}
                  >
                    Play Again?
                  </ResetBtn>
                </WrongAnswer>
              )}
            </QuestionSelected>
          </Wrapper>
        </QuestionPage>
      ) : (
        <Loading />
      )}
    </>
  );
}
const Wrapper = styled.div`
  flex: 2;
`;
const SideBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ScoreHistoryBanner = styled.h2`
  text-align: center;
`;

const WelcomeBanner = styled.div`
  text-align: right;
  display: flex;
  justify-content: flex-end;
`;
const QuestionAsked = styled.h3``;
const QuestionSelected = styled.div`
  position: relative;
  min-height: 100vh;
  postion: relative;
  margin: 0 auto;
  width: 75%;
`;

const NextQuestionBtn = styled.button`
  background-color: #023047;
  font-size: 15px;
  color: #ffb703;
  width: 25%;
`;
const ResetBtn = styled.button`
  background-color: #023047;
  font-size: 15px;
  color: #ffb703;
  width: 25%;
`;

const QuestionForm = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 25px;
  padding: 2%;
  background-color: #219ebc;
`;

const QuestionPage = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-color: #8ecae6;
`;

const UserScore = styled.h2`
  padding-right: 2%;
`;

const RightAnswer = styled.div`
  display: flex;
  justify-content: space-between;
  color: green;
  font-size: 20px;
  margin-top: 2%;
  padding: 0 3%;
`;
const WrongAnswer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #ba274a;
  font-size: 20px;
  margin-top: 2%;
  padding: 0 3%;
`;

export default Question;
