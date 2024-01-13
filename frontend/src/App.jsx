import { useState } from "react";
import LoginForm from "./components/LoginForm"; 
import loginService from "./services/loginService";

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <LoginForm 
        username={username} 
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin} 
      />
    </div>
  )
};

export default App
