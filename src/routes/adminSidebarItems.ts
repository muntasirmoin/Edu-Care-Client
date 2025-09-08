import AdminOverView from "@/pages/Admin/AdminOverView";

import CreateCourse from "@/components/modules/Course/CreateCourse";

import type { ISidebarItem } from "@/types";
import ViewCourse from "@/components/modules/Course/ViewCourse";
import UpdateCourse from "@/components/modules/Course/UpdateCourse";
import DeleteCourse from "@/components/modules/Course/DeleteCourse";
import UserView from "@/pages/Admin/USER/UserView";
import EnrollmentView from "@/pages/Admin/Enrollment/EnrollmentView";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Explore",
    items: [
      {
        title: "View Records",
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
      {
        title: "Delete Course",
        url: "/admin/delete-course",
        component: DeleteCourse,
      },
    ],
  },

  // user
  {
    title: "User",
    items: [
      {
        title: "View",
        url: "/admin/user-view",
        component: UserView,
      },
    ],
  },

  // enrollment
  {
    title: "Enrollment",
    items: [
      {
        title: "View",
        url: "/admin/enrollment-view",
        component: EnrollmentView,
      },
    ],
  },

  //
];
