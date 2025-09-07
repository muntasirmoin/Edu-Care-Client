import AdminOverView from "@/pages/Admin/AdminOverView";

import CreateCourse from "@/components/modules/Course/CreateCourse";

import type { ISidebarItem } from "@/types";
import ViewCourse from "@/components/modules/Course/ViewCourse";
import UpdateCourse from "@/components/modules/Course/UpdateCourse";

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
        title: "View",
        url: "/admin/table-course",
        component: ViewCourse,
      },
      {
        title: "Create Course",
        url: "/admin/create-course",
        component: CreateCourse,
      },
      {
        title: "Update Course",
        url: "/admin/update-course",
        component: UpdateCourse,
      },
    ],
  },

  //
];
