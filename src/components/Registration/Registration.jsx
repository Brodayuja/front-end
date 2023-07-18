import React, { useState } from 'react';
import { registerUser } from '../api-handlers/index';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

const Register = (props) => {
  const setIsLoggedIn = props.setIsLoggedIn;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const setMyUsername = props.setMyUsername;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await registerUser(username, password, email, name);

      localStorage.setItem('token', result.token);
      localStorage.setItem('userId', result.id);
      localStorage.setItem('username', username);
      setIsLoggedIn(true);
      setMyUsername(username);

      navigate('/browse');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="bg-columbiaBlue p-6 border text-black w-1/3 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <label>
              Email:
              <input
                className="w-full border rounded-lg px-4 py-2"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Name:
              <input
                className="w-full border rounded-lg px-4 py-2"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Username:
              <input
                className="w-full border rounded-lg px-4 py-2"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                className="w-full border rounded-lg px-4 py-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div className="flex justify-center">
              <button
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;



