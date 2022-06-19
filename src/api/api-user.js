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

export const executeScript = () => {
  const config = { headers: authHeader() };
  return axios.get(urlUserScript, config);
};

export const getAllUsers = () => {
  const config = { headers: authHeader() };
  return axios.get(urlUsers, config);
};

export const getUserById = (id) => {
  const config = { headers: authHeader() };
  return axios.get(urlUserById + id, config);
};

export const deleteUser = (id) => {
  const config = { headers: authHeader() };
  return axios.delete(urlUserDelete + id, config);
};

export const updateUser = (id, inputs) => {
  const config = { headers: authHeader() };
  return axios.put(urlUserUpdate + id, inputs, config);
};
