import type { ICourse } from "@/pages/Course/CourseDeleteTable/CourseDeleteTable";

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  address: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItem {
  _id: string;
  userId: IUser;
  courseId: ICourse;
  priceSnapshot: number;
  createdAt?: Date;
  updatedAt?: Date;
}
