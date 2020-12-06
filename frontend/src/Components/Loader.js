import React from "react";
import styled from "styled-components";
import loaderImg from "../Images/loading.gif";

const Loading = () => {
  return (
    <Load>
      <Loader src={loaderImg} />
    </Load>
  );
};

const Load = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f1faee;
`;

const Loader = styled.img``;

export default Loading;
