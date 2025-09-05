import App from "@/App";
import Unauthorized from "@/components/layout/Unauthorized";
import Contact from "@/pages/Contact/contact";

import Home from "@/pages/Home/home";

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
]);
