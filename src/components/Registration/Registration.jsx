import React, { useState } from "react";
import { registerUser } from "../api-handlers/index";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const setIsLoggedIn = props.setIsLoggedIn;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const setMyUsername = props.setMyUsername;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await registerUser(username, password, email, name);


      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.id)
      localStorage.setItem("username", username)
      setIsLoggedIn(true);
      setMyUsername(username);

      navigate("/browse");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
