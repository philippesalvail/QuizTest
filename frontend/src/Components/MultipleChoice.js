import React from "react";
import styled from "styled-components";

const MultipleChoice = ({setAnswerSelected, answers}) => {
  console.log("answers: ", answers);
  const choiceHandler = (choice) => {
    setAnswerSelected(choice.value);
  };
  return (
    <>
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
    </>
  );
};
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

export default MultipleChoice;
