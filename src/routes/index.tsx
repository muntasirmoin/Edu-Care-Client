import App from "@/App";
import Unauthorized from "@/components/layout/Unauthorized";
import { createBrowserRouter } from "react-router";
export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
    // errorElement: <GlobalError />,
  },
]);
