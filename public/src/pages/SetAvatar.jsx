/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
function SetAvatar() {
  const api = "https://api.dicebear.com/6.x/bottts/svg";
  const navigate = useNavigate();
  let [avatars, setAvatars] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    async function execute() {
      if (!localStorage.getItem("chat-app-user")) navigate("/login");
    }
    execute();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please Select an Avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error(
          "An error ocurred while setting an avatar. Please try again.",
          toastOptions
        );
      }
    }
  };
  useEffect(() => {
    async function getData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios
          .get(`${api}?seed=${Math.round(Math.random() * 10000)}`)
          .catch((error) => {
            console.log(error.message);
          });

        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
        // console.log(data);
      }
      setAvatars(data);
      setIsloading(false);
    }
    getData();
  }, []);
  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="Loader" className="loader"></img>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar !</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Let's Go!
          </button>

          <ToastContainer />
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #0d1117;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title-container {
    h1 {
      color: #ffc345;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.25s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #fff345;
    }
  }
  .submit-btn {
    background-color: #ffc345;
    color: black;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s;
    &:hover {
      background-color: #fff345;
    }
  }
`;
export default SetAvatar;
