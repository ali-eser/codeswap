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

const addProject = async newProject => {
  const config = {
    headers: {Authorization: token}
  };
  const project = await axios.post(baseURL, newProject, config);
  return project;
};

export default { getAll, addProject, setToken };