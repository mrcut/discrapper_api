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
  return axios.get(urlMessageById + id);
};

export const deleteMessage = (id) => {
  return axios.delete(urlMessageById + id);
};

export const getMessageByCategorie = (id) => {
  return axios.get(urlMessageByCategorie + id);
};

export const getAllCategories = () => {
  const config = { headers: authHeader() };
  return axios.get(urlCategories, config);
};
