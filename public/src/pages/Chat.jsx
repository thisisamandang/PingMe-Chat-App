import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    async function avatarCheck() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    avatarCheck();
  }, [currentUser]);
  useEffect(() => {
    async function currentUserinfo() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        try {
          setCurrentUser(
            await JSON.parse(localStorage.getItem("chat-app-user"))
          );
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    currentUserinfo();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);

      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      {currentUser && (
        <Container>
          <div className="container">
            <Contacts
              contacts={contacts}
              changeChat={handleChatChange}
              currentUser={currentUser}
            ></Contacts>
            {currentChat === undefined ? (
              <Welcome currentUser={currentUser}></Welcome>
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              ></ChatContainer>
            )}
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0d1117;
  .container {
    border-start-start-radius: 30px;
    border-bottom-right-radius: 30px;
    height: 85vh;
    width: 85vw;
    background-color: black;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
