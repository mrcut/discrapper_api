import axios from "axios";
import {
  urlDiscordById,
  urlDiscords,
  urlMessageById,
  urlMessages,
  urlUserById,
  urlUserProfile,
  urlUsers,
} from "../constantes";
import {
  authHeader,
  urlApi,
  urlDiscordCreate,
  urlLogin,
  urlUserCreate,
  urlUserUpdate,
  urlUserScript,
} from "../constantes";

export const login = (inputs) => {
  return axios.post(urlLogin, inputs);
};

// Discord

export const createDiscord = (inputs) => {
  const config = { headers: authHeader() };
  return axios.post(urlDiscordCreate, inputs, config);
};

export const updateDiscord = (id) => {
  return axios.put(urlDiscordById + id);
};

export const getAllDiscords = () => {
  const config = { headers: authHeader() };
  return axios.get(urlDiscords, config);
};

export const deleteDiscord = (id) => {
  const config = { headers: authHeader() };
  return axios.delete(urlDiscordById + id);
};

export const getDiscordById = (id) => {
  return axios.get(urlDiscordById + id);
};
// User

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
  return axios.delete(urlUserById + id);
};

// Messages

export const getMessages = () => {
  const config = { headers: authHeader() };
  return axios.get(urlMessages, config);
};

export const getMessageById = (id) => {
  return axios.get(urlMessageById + id);
};

export const deleteMessage = (id) => {
  return axios.delete(urlMessageById + id);
};
