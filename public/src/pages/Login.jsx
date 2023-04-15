import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Logo from "../assets/Logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";
function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      // eslint-disable-next-line
      navigate("/");
    }
  }, []);
  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Email and password is required.", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Email and password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        try {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        } catch (error) {
          console.log(error.message);
        }

        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>PingME</h1>
          </div>
          <input
            type="text"
            placeholder="username"
            name="username"
            min="3"
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            New User?
            <Link to="/register"> Create an account</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0d1117;
  .brand {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: #ffc345;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #161b22;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #ffc345;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #fff445;
      outline: none;
    }
  }
  button {
    background-color: #ffc345;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.25s ease-in-out;
    &:hover {
      background-color: #fff345;
    }
  }
  span {
    text-align: center;
    text-transform: uppercase;
    color: #ffc345;
    a {
      color: #ffc345;
      text-decoration: none;
      font-weight: bold;
      transition: 0.2s ease-in-out;
      &:hover {
        color: #fff345;
      }
    }
  }
`;

export default Login;
