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
import NavCourse from "@/pages/Course/NavCourse/NavCourse";
import CourseDetailsPage from "@/pages/Course/NavCourse/CourseDetailsPage";
import CartPage from "@/pages/Cart/CartPage";
import Enrollment from "@/pages/Enrollement/Enrollement";
import FAQPage from "@/pages/Faq/FAQPage";
import GlobalError from "@/components/layout/GlobalError";
import About from "@/pages/About/About";
export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        index: true,
        errorElement: <GlobalError />,
      },

      {
        Component: Contact,
        path: "contact",
        errorElement: <GlobalError />,
      },
      {
        Component: About,
        path: "about",
        errorElement: <GlobalError />,
      },
      {
        Component: FAQPage,
        path: "faq",
        errorElement: <GlobalError />,
      },
      {
        Component: NavCourse,
        path: "courses",
        errorElement: <GlobalError />,
      },
      {
        Component: withAuth(CourseDetailsPage, role.USER as TRole),
        path: "/courses/:id",
        errorElement: <GlobalError />,
      },
      {
        Component: withAuth(CartPage, role.USER as TRole),
        path: "/cart",
        errorElement: <GlobalError />,
      },
      {
        Component: withAuth(Enrollment, role.USER as TRole),
        path: "/enrollment",
        errorElement: <GlobalError />,
      },
    ],
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
    errorElement: <GlobalError />,
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
    errorElement: <GlobalError />,
    children: [
      { index: true, element: <Navigate to="/user/user-overview" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },

  // admin dashboard
  {
    Component: withAuth(DashboardLayout, role.ADMIN as TRole),
    path: "/admin",
    errorElement: <GlobalError />,
    children: [
      { index: true, element: <Navigate to="/admin/overview" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
]);
