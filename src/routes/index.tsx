import App from "@/App";
import Unauthorized from "@/components/layout/Unauthorized";
import Login from "@/pages/Auth/Login";
import Registration from "@/pages/Auth/Registration";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";

import { createBrowserRouter } from "react-router";
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
]);
