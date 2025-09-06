import App from "@/App";
import DashboardLayout from "@/components/layout/Dashboard/DashboardLayout";
import Unauthorized from "@/components/layout/Unauthorized";
import { role } from "@/constants/role";
import Login from "@/pages/Auth/Login";
import Registration from "@/pages/Auth/Registration";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";
import { withAuth } from "@/utils/withAuth";

import { createBrowserRouter, Navigate } from "react-router-dom";
import { userSidebarItems } from "./userSidebarItems";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import type { TRole } from "@/types";
export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        index: true,
      },

      {
        Component: Contact,
        path: "contact",
      },
    ],
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
    // errorElement: <GlobalError />,
  },

  {
    Component: Login,
    path: "/login",
    // errorElement: <GlobalError />,
  },
  {
    Component: Registration,
    path: "/register",
    // errorElement: <GlobalError />,
  },

  // user dashboard
  {
    Component: withAuth(DashboardLayout, role.USER as TRole),
    path: "/user",
    // errorElement: <GlobalError />,
    children: [
      { index: true, element: <Navigate to="/user/user-overview" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },

  // admin dashboard
  {
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    path: "/admin",
    // errorElement: <GlobalError />,
    children: [
      { index: true, element: <Navigate to="/admin/overview" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
]);
