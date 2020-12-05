import React from "react";
import MultipleChoice from "./MultipleChoice";
import styled from "styled-components";
import {answeredSubmitted, nextQuestion} from "../Model/functions";

function Question() {
  const [answerSelected, setAnswerSelected] = React.useState(null);
  const [correctAnswer, setCorrectAnswer] = React.useState(null);
  const [question, setQuestion] = React.useState(null);
  const [next, setNext] = React.useState(false);
  const [playerScore, setPlayerScore] = React.useState(0);
  const [choices, setChoices] = React.useState(null);
  React.useEffect(() => {
    fetch("/getQuestion")
      .then((response) => response.json())
      .then((questionRetrieved) => {
        setQuestion(questionRetrieved.questionWithoutAnswer);
        setChoices(questionRetrieved.questionWithoutAnswer.options);
      })
      .catch((error) => console.log(error));
  }, [next]);

  return (
    <QuestionPage>
      {question && (
        <QuestionSelected>
          <WelcomeBanner>
            <UserLogged>Welcome </UserLogged>
            <UserScore>{playerScore} / 50</UserScore>{" "}
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
              <ResetBtn onClick={() => {}}>Restart Game</ResetBtn>
            </WrongAnswer>
          )}
        </QuestionSelected>
      )}
    </QuestionPage>
  );
}

const WelcomeBanner = styled.div`
  text-align: right;
  display: flex;
  justify-content: space-between;
`;
const QuestionAsked = styled.h3``;
const QuestionSelected = styled.div`
  position: relative;
  min-height: 100vh;
  postion: relative;
  width: 40%;
  margin: 0 auto;
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
  width: 100%;
  border: 1px solid black;
  border-radius: 25px;
  padding: 2%;
  background-color: #219ebc;
`;

const QuestionPage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #8ecae6;
`;
const UserLogged = styled.h3``;
const UserScore = styled.h3``;

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
