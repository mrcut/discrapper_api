import axios from "axios";
import {
  urlDiscordById,
  urlDiscords,
  urlMessageById,
  urlMessages,
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

export const getAllDiscord = () => {
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

export const updateUser = (inputs) => {
  const config = { headers: authHeader() };
  return axios.put(urlDiscordById, inputs, config);
};

export const executeScript = (inputs) => {
  const config = { headers: authHeader() };
  return axios.post(urlUserScript, inputs, config);
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
