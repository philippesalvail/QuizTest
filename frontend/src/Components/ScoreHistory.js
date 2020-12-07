import React from "react";
import styled from "styled-components";
import style from "styled-components";
import Pagination from "./Pagination";

function ScoreHistory({
  scores,
  totalScores,
  setCurrentPage,
  currentPage,
  totalQuestions,
}) {
  const [scoresPerPage] = React.useState(3);
  const indexOfLastPage = currentPage * scoresPerPage;
  const indexOfFirstPage = indexOfLastPage - scoresPerPage;
  const currentScores = scores.slice(indexOfFirstPage - indexOfLastPage);
  const paginate = (pageNumber) => {
    console.log("pageNumber: ", pageNumber);
    setCurrentPage(pageNumber);
  };

  let sortedScored = scores.sort(function (a, b) {
    return b - a;
  });

  return (
    <>
      <ScoreList>
        {sortedScored.length > 0 ? (
          sortedScored.map((score, index) => {
            return (
              <Score key={index}>
                <Record>{index + 1}:</Record>
                <Record>
                  {score} / {totalQuestions}
                </Record>
              </Score>
            );
          })
        ) : (
          <NoScores>No Scores to Display</NoScores>
        )}

        <Pagination
          scoresPerPage={scoresPerPage}
          totalScores={totalScores}
          paginate={paginate}
        />
      </ScoreList>
    </>
  );
}
const ScoreWrapper = styled.div``;
const Record = styled.div`
  font-size: 1.17em;
  font-weight: bold;
`;

const ScoreList = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
const Score = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const NoScores = styled.div`
  text-align: center;
`;

export default ScoreHistory;
