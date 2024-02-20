import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import projectService from "../services/projectService";

const ProjectPage = () => {
  const projects = useSelector(({ projects }) => projects);
  const [likeCount, setLikeCount] = useState(0);
  const match = useMatch("/projects/:id");

  const projectToShow = match
    ? projects.find(p => p.id === Number(match.params.id))
    : null

  
  console.log(projectToShow.imagePath);
  const handleLike = async e => {
    e.preventDefault();
    console.log(projectToShow.id);
    setLikeCount(projectToShow.likes.length);
    await projectService.likeProject(projectToShow.id);
  };

  return (
    <div className={"page-body"+ " " +"general-item"}>
      {projectToShow && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <p className="title">{projectToShow.title}</p>
            <p>submitted by <i><Link to={`/users/${projectToShow.user.username}`}>{projectToShow.user.username}</Link></i> on {projectToShow.updatedAt.split("T")[0]}</p>
          </div>
          <hr />
          <p>{projectToShow.description}</p>
          <img src={"http://localhost:3001/" + projectToShow.imagePath} alt="Project Image" width="400px" />
          <h5>{likeCount}<a href="" onClick={handleLike}> &#9829;</a></h5>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;