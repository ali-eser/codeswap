import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initUser } from "./reducers/userReducer";
import LoginForm from "./components/LoginForm"; 
import loginService from "./services/loginService";

const App = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(({user}) => user);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(initUser(user))
    }
  }, [dispatch])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch(initUser(user));
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.clear();
    dispatch(initUser(null));
  };

  return (
    <div>
      {!user && (
        <LoginForm 
        username={username} 
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin} 
      />
      )}
      {user && (
        <div>
          <h3>{user.username} logged in!</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  )
};

export default App
