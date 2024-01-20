import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Feed = () => {
  const projects = useSelector(({ projects }) => projects);

  return (
    <div>
      <h1>Projects</h1>
      <ul>
      {projects.map(project => (
        <li key={project.id}><Link to={`/projects/${project.id}`} >{project.title}</Link> by <i>{project.user.username}</i></li>
      ))}
      </ul>
    </div>
  );
};

export default Feed;