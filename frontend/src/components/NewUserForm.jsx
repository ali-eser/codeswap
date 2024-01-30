import { useState } from "react";
import { useDispatch } from "react-redux";
import { defineNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";

const NewUserForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === passwordVerification) {
      try {
        const userToCreate = {
          username: username,
          password: password,
          name: name,
          email: email
        };
        await userService.create(userToCreate);
        navigate("/");
      } catch (err) {
        dispatch(defineNotification(err.response.data, 5));
      }
    } else if (password != passwordVerification) {
      dispatch(defineNotification("Passwords do not match!", 5));
    }

  };

  return (
    <div className={"page-body"+ " " +"general-item"}>
      <h1 className="title">Create CodeSwap Account</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <br />
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <input type="password" placeholder="enter password again" onChange={(e) => setPasswordVerification(e.target.value)} />
        <br />
        <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
        <br />
        <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default NewUserForm;