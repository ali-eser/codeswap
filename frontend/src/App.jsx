import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initUser } from "./reducers/userReducer";
import { Routes, Route, useNavigate } from "react-router-dom";
import projectService from "./services/projectService";
import LoginForm from "./components/LoginForm";
import NewUserForm from "./components/NewUserForm";
import Feed from "./components/Feed";
import Navigation from "./components/Navigation";
import CreateNewProject from "./components/CreateNewProject";
import ProfilePage from "./components/ProfilePage";
import ProjectPage from "./components/ProjectPage";
import WelcomePage from "./components/WelcomePage";
import { initializeProjects } from "./reducers/projectReducer";
import { defineNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(({ user }) => user);
  const notification = useSelector(({ notification }) => notification);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(initUser(user));
      projectService.setToken(user.token);
      dispatch(initializeProjects());
    }
  }, [dispatch]);

  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.clear();
    dispatch(defineNotification({text: `${user.username} has successfully logged out`, type: "success"}, 5));
    dispatch(initUser(null));
    navigate("/");
  };

  return (
    <div>
      <Navigation handleLogout={handleLogout} />
      {notification && (
        <h5 className={"notification"+ " " +"general-item"+ " " +`${notification.type}`}>{notification.text}</h5>
      )}
      {!user && (
        <div>
          <Routes>
            <Route path={"/"} element={<WelcomePage />} />
            <Route path={"/login"} element={<LoginForm />} />
            <Route path={"/signin"} element={<NewUserForm />} />
          </Routes>
        </div>
      )}
      {user && (
        <div>
          <Routes>
            <Route path={"/"} element={<WelcomePage />} />
            <Route path={"/home"} element={<Feed />} />
            <Route path={"/create"} element={<CreateNewProject />} />
            <Route path={"/users/:username"} element={<ProfilePage />} />
            <Route path={"/projects/:id"} element={<ProjectPage />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
