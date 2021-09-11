import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/comments";

const getAll = () => {
  return axios.get(API_URL + "/");
};

const get = (id) => {
  return axios.get(API_URL + `/${id}`);
};

const create = (data) => {
  return axios.post(API_URL + "/", data);
};

const update = (id, data) => {
  return axios.put(API_URL + `/${id}`, data);
};

const remove = (id) => {
  return axios.delete(API_URL + `/${id}`);
};

// const removeAll = () => {
//   return http.delete(`/tutorials`);
// };

const findByText = (text) => {
  return axios.get(API_URL + `/?text=${text}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  // removeAll,
  findByText,
};
