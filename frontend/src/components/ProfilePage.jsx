import { useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";

const ProfilePage = () => {
  const projects = useSelector(({ projects }) => projects);
  const match = useMatch("/users/:username")

  const userProjects = match
    ? projects.filter(p => p.user.username === match.params.username)
    : null

  return (
    <div>
      <h1>{match.params.username}</h1>
      <h3>Projects</h3>
      {userProjects && (
        <ul>
          {userProjects.map(p => (
            <li key={p.id}><Link to={`projects/${p.id}`}>{p.title}</Link></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProfilePage;