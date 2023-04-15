import React, { useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <Container>
      <div>
        <form className="input-container" onSubmit={(event) => sendChat(event)}>
          <input
            type="text"
            placeholder="Message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button className="submit">
            <IoMdSend />
          </button>
        </form>
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  align-items: center;

  padding: 0 2rem;
  border-radius: 100px;
  margin-right: 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    /* gap: 2rem; */
    background-color: #ffffff34;
    input {
      width: 90%;
      /* height: 60%; */
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 3rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #d89a14;
      border: none;
      cursor: pointer;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
export default ChatInput;
