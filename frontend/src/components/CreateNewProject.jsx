import { useState } from "react";
import { useNavigate } from "react-router-dom";
import projectService from "../services/projectService";

const CreateNewProject = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = {
      title: title,
      description: desc,
    };

    await projectService.addProject(newProject);
    setTitle("");
    setDesc("");
    navigate("/home");
  };

  return (
    <div className={"page-body"+ " " +"general-item"}>
      <h1 className="title">Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.currentTarget.value)} />
        <br />
        <textarea placeholder="Description" onChange={(e) => setDesc(e.currentTarget.value)} />
        <br />
        <input type="file" />
        <br />
        <button type="submit">Share</button>
      </form>
    </div>
  );
};

export default CreateNewProject;