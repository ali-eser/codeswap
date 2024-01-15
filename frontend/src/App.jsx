import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initUser } from "./reducers/userReducer";
import LoginForm from "./components/LoginForm";
import NewUserForm from "./components/NewUserForm";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector(({ user }) => user);
  const notification = useSelector(({ notification }) => notification);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(initUser(user))
    }
  }, [dispatch]);

  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.clear();
    dispatch(initUser(null));
  };

  return (
    <div>
      <h4>{notification}</h4>
      {!user && (
        <div>
          <LoginForm />
          <NewUserForm />
        </div>
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
