import axios from "axios";
import {
  urlUserById,
  urlUserDelete,
  urlUserProfile,
  urlUsers,
  urlUserUpdate,
} from "../constantes";
import {
  authHeader,
  urlLogin,
  urlUserCreate,
  urlUserScript,
} from "../constantes";

export const login = (inputs) => {
  return axios.post(urlLogin, inputs);
};

export const createUser = (inputs) => {
  const config = { headers: authHeader() };
  return axios.post(urlUserCreate, inputs, config);
};

export const editProfile = (inputs) => {
  const config = { headers: authHeader() };
  return axios.put(urlUserProfile, inputs, config);
};

export const executeScript = (inputs) => {
  const config = { headers: authHeader() };
  return axios.post(urlUserScript, inputs, config);
};

export const getAllUsers = () => {
  const config = { headers: authHeader() };
  return axios.get(urlUsers, config);
};

export const getUserById = (id) => {
  return axios.get(urlUserById + id);
};

export const deleteUser = (id) => {
  return axios.delete(urlUserDelete + id);
};

export const updateUser = (id, inputs) => {
  const config = { headers: authHeader() };
  return axios.put(urlUserUpdate + id, inputs, config);
};
