import { useState } from "react";
import { useNavigate } from "react-router-dom";
import projectService from "../services/projectService";

const CreateNewProject = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let image = e.target[2].files[0];

    const newProject = {
      title: title,
      description: desc,
    };
    if (image) {
      const formData = new FormData();
      formData.append("files", image);
      for (const [k, v] of Object.entries(newProject)) { // append title and description to formData
        formData.append(k, v)
      }
      await projectService.addProject(formData);
    } else {
      await projectService.addProject(newProject);
    }
    setTitle("");
    setDesc("");
    navigate("/home");
  };

  return (
    <div className={"page-body"+ " " +"general-item"}>
      <h1 className="title">Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" id="title" placeholder="Project Title" size="30" onChange={(e) => setTitle(e.currentTarget.value)} />
        <br />
        <textarea placeholder="Description (At least 20 characters)" cols="24" rows="5" onChange={(e) => setDesc(e.currentTarget.value)} />
        <br />
        <div style={{display: "flex", flexDirection: "column"}}>
          <p style={{ fontSize: "0.75em", marginBottom: "2px" }}>Add an image (optional):</p>
          <input type="file" name="files"/>
        </div>
        <button type="submit">Share Project</button>
      </form>
    </div>
  );
};

export default CreateNewProject;