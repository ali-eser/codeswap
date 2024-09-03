import { useSelector } from "react-redux";
import { Link, useMatch, useNavigate } from "react-router-dom";
import projectService from "../services/projectService";
import { useEffect, useState } from "react";

const ProjectPage = () => {
  const { projects, loading } = useSelector(({ projects }) => projects);
  const user = useSelector(({ user }) => user);

  const [commentBox, setCommentBox] = useState("");
  const [comments, setComments] = useState([]);

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
      setComments(projectToShow.comments);
    }
  }, [projectToShow]);

  console.log(comments);

  const handleLike = async e => {
    e.preventDefault();
    const updatedProject = await projectService.likeProject(projectToShow.id);
    setLikeCount(updatedProject.data.likes);
  };

  const handleDelete = async e => {
    e.preventDefault();
    const confirmation = prompt(`Type "${projectToShow.title}" below to confirm.\nPlease note that this action is irreversible!`);
    if (confirmation === projectToShow.title) {
      await projectService.deleteProject(projectToShow.id);
      navigate("/home");
    } else {
      alert("You have mistyped the title of the post.\nAction cancelled.")
    }
  };

  const handleComment = async e => {
    e.preventDefault();
    const comment = await projectService.postComment(commentBox, user.id, projectToShow.id);
    console.log(comment);
    setComments([...comments, comment.data]);
    setCommentBox("")
  };

  return (
    <div className={"page-body"}>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        projectToShow && (
          <div style={{marginBottom: "100px"}}>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              <p className="title">{projectToShow.title}</p>
              <p>submitted by <i><Link to={`/users/${projectToShow.user.username}`}>{projectToShow.user.username}</Link></i> on {projectToShow.createdAt.split("T")[0]}</p>
            </div>
            <hr />
            <p>{projectToShow.description}</p>
            <br />
            <br />
            <div id="img-div">
                {projectToShow.imagePath && (
                <img src={"http://localhost:3001/" + projectToShow.imagePath} alt="Project Image" width="400px" />
                )}
            </div>
            <br />
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <br />
                <h5>{likeCount}<a href="" onClick={handleLike}> &#9829;</a></h5>
                    {projectToShow.user.username === user.username && (
                <h5><a href="" onClick={handleDelete}> Delete Post</a></h5>
              )}
            </div>
            <div>
              <hr />
              <h4>Comments ({projectToShow.comments.length})</h4>
              <br />
              <form onSubmit={handleComment}>
                <div>
                    <textarea className="form-control" style={{ width: "100%" }} onChange={(e) => setCommentBox(e.currentTarget.value)} 
                    name="comment" id="comment" cols="999" rows="2" placeholder="Write a comment"></textarea>
                    <br />
                    <button className="btn btn-primary" type="submit" >Comment</button>
                </div>
              </form>
              {comments.map(c => (
                <li style={{listStyle: "none", marginTop: "55px"}} key={c.id}>
                  {c.text} <hr />
                  <div style={{float: "right", marginTop: "0px"}}>
                    <div>by <i><Link to={`/users/${c.username}`}>{c.username}</Link></i> on {c.createdAt.split("T")[0]}</div>
                  </div>
                </li>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProjectPage;