import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";
function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <FiLogOut />
    </Button>
  );
}
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
  background-color: #d89a14;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: white;
  }
  &:hover {
    transition: 0.2s ease-in-out;
    margin-bottom: 0.5rem;
    background-color: #ffb619;
  }
`;
export default Logout;
