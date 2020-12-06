import React from "react";
import styled from "styled-components";

const MultipleChoice = ({
  setAnswerSelected,
  answers,
  question,
  answerSelected,
  setCorrectAnswer,
}) => {
  const choiceHandler = (choice) => {
    setAnswerSelected(choice.value);
  };

  const answeredSubmitted = (questionId, answerSelected, setCorrectAnswer) => {
    fetch("/checkAnswer", {
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        id: questionId,
        answerSelected: answerSelected,
      }),
    })
      .then((response) => response.json())
      .then((answer) => {
        console.log("answer: ", answer);
        setCorrectAnswer(answer);
        let radios = document.getElementsByName("choice");
        for (let i = 0; i < radios.length; i++) {
          radios[i].checked = false;
        }
        setAnswerSelected(null);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <ChoiceOfAnswers>
        {answers &&
          answers.map((answer, index) => {
            return (
              <Choice>
                <Answer>
                  <ChoiceInput
                    type="radio"
                    name="choice"
                    value={answer.value}
                    onChange={(e) => {
                      choiceHandler(e.target);
                    }}
                  />
                  {answer.label} - {answer.value}
                </Answer>
              </Choice>
            );
          })}
        <ButtonRow>
          <SubmitBtn
            onClick={() => {
              if (answerSelected) {
                answeredSubmitted(
                  question.questionId,
                  answerSelected,
                  setCorrectAnswer
                );
              } else {
                alert("Please select option");
              }
            }}
          >
            submit
          </SubmitBtn>
        </ButtonRow>
      </ChoiceOfAnswers>
    </>
  );
};
const ChoiceOfAnswers = styled.div``;
const Choice = styled.div`
  display: flex;
  margin-bottom: 2%;
`;
const Answer = styled.label`
  vertical-align: middle;
  font-size: 20px;
`;
const ChoiceInput = styled.input`
  margin: 0 10px 0 10px;
`;
const SubmitBtn = styled.button`
  background-color: #023047;
  font-size: 15px;
  color: #ffb703;
  width: 20%;
`;
const ButtonRow = styled.div`
  text-align: center;
`;

export default MultipleChoice;
