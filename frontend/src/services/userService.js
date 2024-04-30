import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
const baseURL = "/api/users";

const create = async userToAdd => {
  const newUser = await axios.post(baseURL, userToAdd);
  console.log(newUser);
  return newUser;
};

const getOne = async username => {
  const user = await axios.get(`${baseURL}/${username}`);
  return user;
};

const follow = async (followerId, followeeId) => {
  const relation = await axios.put(`${baseURL}/${followerId}/follow/${followeeId}`);
  return relation;
};

const getFollowings = async id => {
  const followingsArray = await axios.get(`${baseURL}/getFollowings/${id}`);
  return followingsArray;
}

const checkFollow = async id => {
  const isFollowed = await axios.get(`${baseURL}/follow/${id}`);
  return isFollowed;
};

export default { create, getOne, follow, getFollowings, checkFollow };