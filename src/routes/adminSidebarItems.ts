import AdminOverView from "@/pages/Admin/AdminOverView";
import CreateCourse from "@/pages/Course/CreateCourse/CreateCourse";

import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Summary",
        url: "/admin/overview",
        component: AdminOverView,
      },
    ],
  },

  //course
  {
    title: "Course",
    items: [
      {
        title: "Create Course",
        url: "/admin/create-course",
        component: CreateCourse,
      },
    ],
  },

  //
];
