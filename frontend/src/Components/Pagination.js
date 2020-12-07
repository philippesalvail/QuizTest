import React from "react";
import styled from "styled-components";

const Pagination = ({scoresPerPage, totalScores, paginate}) => {
  console.log("totalScores: ", totalScores);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalScores / scoresPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log("pageNumbers: ", pageNumbers);

  return (
    <PageNumbers>
      {pageNumbers.map((pageNumber) => {
        return (
          <PageNumber key={pageNumber}>
            <PageLink onClick={() => paginate(pageNumber)}>
              {pageNumber}
            </PageLink>
          </PageNumber>
        );
      })}
    </PageNumbers>
  );
};

const PageNumbers = styled.div`
  display: flex;
`;
const PageNumber = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex: 1;
`;

const PageLink = styled.button`
  text-decoration: none;
`;

export default Pagination;
