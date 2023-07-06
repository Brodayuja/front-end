import { fetchAllUserData, loginUser } from "../api-handlers";
import { useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";

const Login = (props) => {
  const setIsLoggedIn = props.setIsLoggedIn;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setMyNewUserId = props.setMyUserId;


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser(username, password);
      setIsLoggedIn(true);
      console.log(result)

     localStorage.setItem("token", result.token);
     localStorage.setItem("userId", result.id)
     const myToken = result.token;
      console.log(myToken)
      
        if(myToken){
          const fetchUsers = await fetchAllUserData();
          
          fetchUsers.users.find((user)=>{
            if(username === user.username){
                setMyNewUserId(user.id);
                
            }
            
          })
        }

      navigate("/browse");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <Link to="/register">Don't have an account? Click Here!</Link>
    </div>
  );
};

export default Login;
