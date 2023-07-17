import { fetchAllUserData, loginUser } from "../api-handlers";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";

const Login = (props) => {
  const setIsLoggedIn = props.setIsLoggedIn;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setMyNewUserId = props.setMyUserId;
  const setMyUsername = props.setMyUsername;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser(username, password);
      setIsLoggedIn(true);
      setMyUsername(username);


      localStorage.setItem("token", result.token);
      localStorage.setItem("userId", result.id);
      localStorage.setItem("username", username);
      const myToken = result.token;


      if (myToken) {
        const fetchUsers = await fetchAllUserData();

        fetchUsers.users.find((user) => {
          if (username === user.username) {
            setMyNewUserId(user.id);
          }
        });
      }

      navigate("/browse");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google"; // Redirect to Google authentication
  };

  return (
    <div className="flex flex-col items-center justify-center text-black">

            <h1 className="text-center">Login</h1>

            <br/>

            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="flex items-center">
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
              </div>

              <br/>

              <div className="flex items-center">
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
              </div>

              <button type="submit">Login</button>
            </form>




      <button type="button" onClick={handleGoogleLogin}>
        Login with Google
      </button>
      <Link to="/register">Don't have an account? Click Here!</Link>
    </div>
  );
};

export default Login;
