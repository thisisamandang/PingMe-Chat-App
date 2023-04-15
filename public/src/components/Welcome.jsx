import React from "react";
import styled from "styled-components";
import hi from "../assets/hi.gif";

function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={hi} alt="Hi Gif" />
      <h1>Welcome!</h1>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: white;
    font-weight: bold;
  }
`;

export default Welcome;
