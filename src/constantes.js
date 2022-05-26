export const urlApi = "http://localhost:3030/api/";

export const urlLogin = urlApi + "login";

export const userKey = "user";

export const urlUserCreate = urlApi + "user/create";

export const urlUserScript = urlApi + "user/script";

export const urlUserUpdate = urlApi + "user/update";

export const urlMessages = urlApi + "messages";

export const urlMessageById = urlApi + "message/";

export const urlDiscordCreate = urlApi + "discord/create";

export const urlDiscords = urlApi + "discords";

export const urlDiscordById = urlApi + "discord/";



export const getUserFromLocalStorage = () => {
  const userJson = localStorage.getItem(userKey);
  return JSON.parse(userJson);
};

export const authHeader = () => {
  const user = getUserFromLocalStorage();
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
};
