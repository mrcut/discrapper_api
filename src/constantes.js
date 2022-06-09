import { Icon } from "@mui/material";
import YourLogo from "./assets/Discrapper.svg";
import logoDiscord from "./assets/discord.svg";

export const urlApi = "http://localhost:3030/api/";

export const urlLogin = urlApi + "login";

export const userKey = "user";

export const urlUsers = urlApi + "users";

export const urlUserById = urlApi + "user/";

export const urlUserCreate = urlApi + "user/create";

export const urlUserScript = urlApi + "user/script";

export const urlUserProfile = urlApi + "user/profile";

export const urlUserUpdate = urlApi + "user/update/";

export const urlUserDelete = urlApi + "user/delete/";
// =========================================

export const urlMessages = urlApi + "messages";

export const urlMessageById = urlApi + "message/";

export const urlMessageByCategorie = urlApi + "category/";

// =========================================

export const urlDiscordCreate = urlApi + "discord/create";

export const urlDiscords = urlApi + "discords";

export const urlDiscordById = urlApi + "discord/";

export const urlDiscordUpdate = urlApi + "discord/update/";

export const urlDiscordDelete = urlApi + "discord/delete/";

// =========================================

export const urlCategories = urlApi + "categories";

// ========================================

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

export const execScript = "Executer le Script";

export const dc = "Logout";

export const Logo = () => (
  <Icon>
    <img alt="logo" src={YourLogo} height={60} width={60} />
  </Icon>
);

export const DiscordLogo = () => (
  <Icon>
    <img alt="discord_logo" src={logoDiscord} height={60} width={60} />
  </Icon>
);
