import {
  AccountBox,
  Add,
  BarChart,
  ChatBubble,
  Javascript,
  Logout,
  PersonAdd,
  QuestionAnswer,
} from "@mui/icons-material";

export const navbarUser = [
  {
    id: 0,
    icon: <QuestionAnswer />,
    label: "FAQ",
    route: "faq",
  },
];

export const navbarEmploye = [
  {
    id: 0,
    icon: <ChatBubble />,
    label: "Messages",
    route: "messages",
  },
  {
    id: 1,
    icon: <BarChart />,
    label: "Statistiques",
    route: "stats",
  },
];

export const settings = [
  {
    id: 0,
    icon: <AccountBox />,
    label: "Profile",
    route: "user/profile",
  },
  {
    id: 1,
    icon: <Logout />,
    label: "Logout",
    route: "/",
  },
];

export const settingsAdmin = [
  {
    id: 0,
    icon: <AccountBox />,
    label: "Profile",
    route: "profile",
  },
  {
    id: 1,
    icon: <Javascript />,
    label: "Executer le Script",
    route: "script",
  },
  {
    id: 2,
    icon: <PersonAdd />,
    label: "Ajouter un User",
    route: "user/create",
  },
  {
    id: 3,
    icon: <Add />,
    label: "Ajouter un Discord",
    route: "discord/create",
  },
  {
    id: 4,
    icon: <Logout />,
    label: "Logout",
    route: "logout",
  },
];
