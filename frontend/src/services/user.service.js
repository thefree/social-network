import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = async () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};
// Only for isModOrAdmin
const getAllUser = () => {
  return axios.get(API_URL + "list", { headers: authHeader() });
};

const removeUser = () => {
  // return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  return axios.delete(API_URL + "user", { headers: authHeader() });
};

const removeUserById = (id) => {
  return axios.delete(API_URL + `user/${id}`, { headers: authHeader() });
  // return axios.delete(API_URL + "user", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllUser,
  removeUser,
  removeUserById,
};
