import axios from "axios";
import {
  authHeader,
  urlCategories,
  urlMessageByCategorie,
  urlMessageById,
  urlMessages,
} from "../constantes";

export const getMessages = () => {
  const config = { headers: authHeader() };
  return axios.get(urlMessages, config);
};

export const getMessageById = (id) => {
  const config = { headers: authHeader() };
  return axios.get(urlMessageById + id, config);
};

export const deleteMessage = (id) => {
  const config = { headers: authHeader() };
  return axios.delete(urlMessageById + id, config);
};

export const getMessageByCategorie = (id) => {
  const config = { headers: authHeader() };
  return axios.get(urlMessageByCategorie + id, config);
};

export const getAllCategories = () => {
  const config = { headers: authHeader() };
  return axios.get(urlCategories, config);
};
