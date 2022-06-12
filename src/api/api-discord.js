import axios from "axios";
import {
  authHeader,
  urlDiscordById,
  urlDiscordCreate,
  urlDiscordDelete,
  urlDiscords,
  urlDiscordUpdate,
} from "../constantes";

export const createDiscord = (inputs) => {
  const config = { headers: authHeader() };
  return axios.post(urlDiscordCreate, inputs, config);
};

export const updateDiscord = (id, inputs) => {
  return axios.put(urlDiscordUpdate + id, inputs);
};

export const getAllDiscords = () => {
  const config = { headers: authHeader() };
  return axios.get(urlDiscords, config);
};

export const deleteDiscord = (id) => {
  return axios.delete(urlDiscordDelete + id);
};

export const getDiscordById = (id) => {
  return axios.get(urlDiscordById + id);
};
