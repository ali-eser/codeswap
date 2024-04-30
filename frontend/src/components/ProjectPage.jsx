import { useSelector } from "react-redux";
import { Link, useMatch, useNavigate } from "react-router-dom";
import projectService from "../services/projectService";
import { useEffect, useState } from "react";

const ProjectPage = () => {
  const { projects, loading } = useSelector(({ projects }) => projects);
  const user = useSelector(({ user }) => user);
  const navigate = useNavigate();
  const match = useMatch("/projects/:id");
  const projectToShow = match
    ? projects.find(p => p.id === Number(match.params.id))
    : null

  const [likeCount, setLikeCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (projectToShow) {
      setIsLoading(false);
      setLikeCount(projectToShow.likes);
    }
  }, [projectToShow]);

  console.log("projects state: ", projects);
  console.log("projectToShow: ", projectToShow);
  console.log(user);

  const handleLike = async e => {
    e.preventDefault();
    const updatedProject = await projectService.likeProject(projectToShow.id);
    setLikeCount(updatedProject.data.likes);
  };

  const handleDelete = async e => {
    e.preventDefault();
    const confirmation = prompt(`Type "${projectToShow.title}" below to confirm.\nPlease note that this action is irreversible!`);
    console.log(confirmation);
    if (confirmation === projectToShow.title) {
      await projectService.deleteProject(projectToShow.id);
      navigate("/home");
    } else {
      alert("You have mistyped the title of the post.\nAction cancelled.")
    }
  };

  return (
    <div className={"page-body"}>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        projectToShow && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              <p className="title">{projectToShow.title}</p>
              <p>submitted by <i><Link to={`/users/${projectToShow.user.username}`}>{projectToShow.user.username}</Link></i> on {projectToShow.createdAt.split("T")[0]}</p>
            </div>
            <hr />
            <p>{projectToShow.description}</p>
            {projectToShow.imagePath && (
              <img src={"http://localhost:3001/" + projectToShow.imagePath} alt="Project Image" width="400px" />
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h5>{likeCount}<a href="" onClick={handleLike}> &#9829;</a></h5>
              {projectToShow.user.username === user.username && (
                <h5><a href="" onClick={handleDelete}> Delete Post</a></h5>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProjectPage;