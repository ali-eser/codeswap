import { useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";

const ProjectPage = () => {
  const projects = useSelector(({ projects }) => projects);
  const match = useMatch("/projects/:id");

  const projectToShow = match
    ? projects.find(p => p.id === Number(match.params.id))
    : null

  return (
    <div className="pageBody">
      {projectToShow && (
        <div>
          <div>
            <h1 className="title">{projectToShow.title}</h1>
            <p>submitted by <Link to={`/users/${projectToShow.user.username}`}>{projectToShow.user.username}</Link> on {projectToShow.updatedAt.split("T")[0]}</p>
          </div>
          <hr />
          <p>{projectToShow.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;