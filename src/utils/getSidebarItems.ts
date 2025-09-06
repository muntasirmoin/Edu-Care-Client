import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";

import { userSidebarItems } from "@/routes/userSidebarItems";

import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.ADMIN:
      return [...adminSidebarItems];

    case role.USER:
      return [...userSidebarItems];
    default:
      return [];
  }
};
