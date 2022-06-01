import { BarChart, ChatBubble, QuestionAnswer } from "@mui/icons-material";

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
