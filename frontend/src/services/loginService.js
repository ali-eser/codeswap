import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
const baseUrl = "/api/login";

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
};

export default { login };