import UserOverView from "@/pages/User/UserOverView";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Transaction Summary",
        url: "/user/user-overview",
        component: UserOverView,
      },
    ],
  },
];
