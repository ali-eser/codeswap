import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
const baseURL = "/api/users";

const create = async (userToAdd) => {
  const newUser = await axios.post(baseURL, userToAdd);
  console.log(newUser);
  return newUser;
};

export default { create };