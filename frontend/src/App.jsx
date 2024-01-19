import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initUser } from "./reducers/userReducer";
import { initializeProjects } from "./reducers/projectReducer";
import { 
  Routes, Route, Link, useMatch, useNavigate 
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import NewUserForm from "./components/NewUserForm";
import Project from "./components/Project";
import Navigation from "./components/Navigation";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(initUser(user))
    }
  }, [dispatch]);

  const user = useSelector(({ user }) => user);
  const notification = useSelector(({ notification }) => notification);
  const projects = useSelector(({ projects }) => projects);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(initializeProjects());
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.clear();
    dispatch(initUser(null));
  };

  return (
    <div>
      <Navigation handleLogout={handleLogout} />
      <h4>{notification}</h4>
      {!user && (
        <div>
          <Routes>
            <Route path={"/login"} element={<LoginForm />} />
            <Route path={"/signin"} element={<NewUserForm />} />
          </Routes>
        </div>
      )}
      {user && (
        <div>
          <div>
            <h3>{user.username} logged in!</h3>
            <button onClick={handleLogout}>Logout</button>
          </div>
            <div>
              <h1>Projects</h1>
              <div>
                {projects.map(project => (
                  <Project project={project} key={project.id}/>
                ))}
              </div>
            </div>
        </div>

      )}
    </div>
  )
};

export default App;
