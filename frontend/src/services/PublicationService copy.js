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

const create = (data) => {
  return axios.post(API_URL + "/", data, { headers: authHeader() });
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
