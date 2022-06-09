import {
  Accessibility,
  AccountBox,
  Add,
  BarChart,
  ChatBubble,
  Javascript,
  Logout,
  PersonAdd,
  QuestionAnswer,
} from "@mui/icons-material";

export const generateItem = (id, icon, label, route) => {
  return {
    id,
    icon,
    label,
    route,
  };
};

export const navbarUser = [generateItem(0, <QuestionAnswer />, "FAQ", "faq")];
export const navbarEmploye = [
  generateItem(0, <ChatBubble />, "Messages", "messages"),
  generateItem(1, <BarChart />, "Statistiques", "stats"),
];

export const navbarAdmin = [
  generateItem(0, <ChatBubble />, "Messages", "messages"),
  generateItem(1, <BarChart />, "Statistiques", "stats"),
  generateItem(2, <BarChart />, "Liste des Discord", "discords"),
  generateItem(3, <Accessibility />, "Liste des Users", "users"),
];

export const settings = [
  generateItem(0, <AccountBox />, "Profile", "/user/profile"),
  generateItem(1, <Logout />, "Logout", "/"),
];

export const settingsAdmin = [
  generateItem(0, <AccountBox />, "Profile", "/user/profile"),
  generateItem(1, <Javascript />, "Executer le Script", null),
  generateItem(2, <PersonAdd />, "Ajouter un User", "user/create"),
  generateItem(3, <Add />, "Ajouter un Discord", "discord/create"),
  generateItem(4, <Logout />, "Logout", "/"),
];
