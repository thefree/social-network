import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/publications";

const getAll = () => {
  return axios.get(API_URL + "/");
};

const getAllByUser = () => {
  return axios.get(API_URL + "/byuser", { headers: authHeader() });
};

const get = (id) => {
  return axios.get(API_URL + `/${id}`);
};

const getWithComments = (id) => {
  return axios.get(API_URL + `/withcomments/${id}`);
};

const create = async (data) => {
  const user = await JSON.parse(localStorage.getItem("user"));
  const myHeaders = {
    "x-access-token": user.accessToken,
  };
  if (typeof data.has === "function") {
    return axios.post(API_URL + "/", data, { headers: myHeaders });
  } else {
    return axios.post(API_URL + "/nofile", data, { headers: myHeaders });
  }
};

const update = async (id, data) => {
  const user = await JSON.parse(localStorage.getItem("user"));
  const myHeaders = {
    "x-access-token": user.accessToken,
  };
  if (typeof data.has === "function") {
    return axios.put(API_URL + `/${id}`, data, { headers: myHeaders });
  } else {
    return axios.put(API_URL + `/nofile/${id}`, data, { headers: myHeaders });
  }
};

// const update = (id, data) => {
//   return axios.put(API_URL + `/${id}`, data);
// };

const remove = (id) => {
  return axios.delete(API_URL + `/${id}`);
};

// const removeAll = () => {
//   return http.delete(`/tutorials`);
// };

const findByTitle = (title) => {
  return axios.get(API_URL + `/?title=${title}`);
};

export default {
  getAll,
  getAllByUser,
  get,
  create,
  update,
  remove,
  // removeAll,
  getWithComments,
  findByTitle,
};

// if (user && user.accessToken) {
//   myHeaders.append("x-access-token", user.accessToken);
// }

// myHeaders.append("x-access-token", user.accessToken);
// myHeaders.append(
//   "x-access-token",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjMxODY4NDM2LCJleHAiOjE2MzE4ODI4MzZ9.d27w72lx1eg3ZLqS-OBI8wUCjtOSIadAf4F7mDgxlWQ"
// );

// myHeaders;

// myHeaders.append("Content-Type", "multipart/form-data");

// for (var value of myHeaders.values()) {
//   console.log(value);
// }
// for (var key of myHeaders.keys()) {
//   console.log(key);
// }

// Display the key/value pairs

// for (var pair of myHeaders.entries()) {
//   console.log(pair[0] + ", " + pair[1]);
// }

// return axios.post(API_URL + "/", data, { headers: authHeader() });
