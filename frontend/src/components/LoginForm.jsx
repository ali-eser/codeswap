import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initUser } from "../reducers/userReducer"
import { defineNotification } from "../reducers/notificationReducer";
import loginService from "../services/loginService";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch(initUser(user));
      navigate("/home");
      dispatch(defineNotification(`${user.username} has successfully logged in`, 5));
    } catch (err) {
      dispatch(defineNotification(err.response.data, 5));
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
        <br />
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;