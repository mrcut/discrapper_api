import axios from "axios";
import {
  authHeader,
  urlDiscordById,
  urlDiscordCreate,
  urlDiscords,
} from "../constantes";

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
  return axios.delete(urlDiscordById + id);
};

export const getDiscordById = (id) => {
  return axios.get(urlDiscordById + id);
};
