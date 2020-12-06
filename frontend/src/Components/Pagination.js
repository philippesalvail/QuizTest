import {number} from "prop-types";
import React from "react";
import styled from "styled-components";

const Pagination = ({scoresPerPage, totalScores, paginate}) => {
  const pageNumbers = [];
  for (let i = 0; i <= Math.ceil(totalScores / scoresPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log("pageNumbers: ", pageNumbers);

  return (
    <PageNumbers>
      {pageNumbers.map((pageNumber) => {
        return (
          <PageNumber key={number}>
            <PageLink href="#" onClick={() => paginate(number)}>
              {pageNumber + 1}
            </PageLink>
          </PageNumber>
        );
      })}
    </PageNumbers>
  );
};

const PageNumbers = styled.div`
  diplay: flex;
  flex-direction: column;
`;
const PageNumber = styled.div`
  diplay: flex;
`;

const PageLink = styled.a`
  text-decoration: none;
  flex: 1;
`;

export default Pagination;
