import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
const baseURL = "/api/projects";

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseURL);
  return res.data;
};

const getOne = async id => {
  const res = await axios.get(`${baseURL}/${id}`);
  console.log(res.data);
  return res.data;
};

const addProject = async newProject => {
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data"
    }
  };
  console.log(token);
  const project = await axios.post(baseURL, newProject, config);
  return project;
};

const likeProject = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const updatedProject = await axios.put(`${baseURL}/${Number(id)}`, null, config);
  return updatedProject;
};

const deleteProject = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const status = await axios.delete(`${baseURL}/${Number(id)}`, null, config);
  return status;
};

const postComment = async (comment, userId, projectId) => {
  const config = {
    headers: { Authorization: token }
  };
  const newComment = await axios.post(`/api/comments/${projectId}`, { "text": comment, "userId": userId }, config);
  return newComment;
};

export default { getAll, addProject, likeProject, setToken, getOne, deleteProject, postComment };