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
  const config = { headers: authHeader() };
  return axios.put(urlDiscordUpdate + id, inputs, config);
};

export const getAllDiscords = () => {
  const config = { headers: authHeader() };
  return axios.get(urlDiscords, config);
};

export const deleteDiscord = (id) => {
  const config = { headers: authHeader() };
  return axios.delete(urlDiscordDelete + id, config);
};

export const getDiscordById = (id) => {
  const config = { headers: authHeader() };
  return axios.get(urlDiscordById + id, config);
};
