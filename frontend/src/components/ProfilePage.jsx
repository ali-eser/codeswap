import { useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";

const ProfilePage = () => {
  const projects = useSelector(({ projects }) => projects);
  const match = useMatch("/users/:username");

  let userProjects = match
    ? projects.filter(p => p.user.username === match.params.username)
    : null

  if (userProjects.length === 0) {
    userProjects = null;
  }

  return (
    <div className={"page-body"+ " " +"general-item"}>
      <h1 className="title">{match.params.username}</h1> 
      {userProjects && (
        <div>
          <h3>Projects</h3>
          <ul>
            {userProjects.map(p => (
              <li key={p.id}><Link to={`/projects/${p.id}`}>{p.title}</Link></li>
            ))}
          </ul>
        </div>
      )}
      {!userProjects && (
        <div>
          <h3>This user has not posted any projects.</h3>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;