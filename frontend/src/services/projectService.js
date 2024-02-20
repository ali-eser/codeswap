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
    headers: {Authorization: token}
  };
  const updatedProject = await axios.put(`${baseURL}/${Number(id)}`, null, config);
  return updatedProject;
};

export default { getAll, addProject, likeProject, setToken, getOne };