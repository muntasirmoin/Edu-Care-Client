import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetCoursesQuery } from "@/redux/features/Course/course.api";
import { useState } from "react";
import TitleSubTitle from "@/components/layout/Shared/TitleSubTitle";
import { useNavigate } from "react-router-dom";
import { useAddToCartMutation } from "@/redux/features/Cart/cart.api";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import type { ICourse } from "@/pages/Course/CourseUpdateTable/CourseUpdateTable";

// type CourseCardProps = {
//   courses: ICourse[];
// };

export default function HomeCourse() {
  const [limit] = useState<number>(5);
  const navigate = useNavigate();

  const {
    data: coursesData,
    isLoading,
    isError,
  } = useGetCoursesQuery({
    limit,
  });

  const courseMapData = coursesData?.data ?? [];

  const { data } = useUserInfoQuery(undefined);

  const userId = data?.data?._id;
  console.log(data);
  // handle add to cart

  const [addToCart, { isLoading: addIsLoading }] = useAddToCartMutation();
  const handleAddToCart = async (courseId: string) => {
    try {
      const res = await addToCart({ userId, courseId }).unwrap();
      if (res) {
        toast.success("Added to cart!");
      }
      console.log("addToCart Res:", res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.data?.message === "Already enrolled in this course") {
        toast.error(`Please Login!:${error?.data?.message}`);
      } else if (error?.data?.message === "Course not found") {
        toast.error(`${error?.data?.message}`);
      } else if (error?.data?.message === "Course already in cart") {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error("Failed to add item to cart");
        navigate("/login");
      }
    }
  };

  // handle add to cart end

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(5)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-violet-800 shadow-lg rounded-lg overflow-hidden flex flex-col animate-pulse"
          >
            {/* Image Skeleton */}
            <Skeleton className="h-40 w-full" />

            {/* Content Skeleton */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" /> {/* title */}
                <Skeleton className="h-5 w-1/4" /> {/* price */}
              </div>

              {/* Buttons Skeleton */}
              <div className="flex gap-2 mt-4">
                <Skeleton className="flex-1 h-10 rounded-lg" />
                <Skeleton className="flex-1 h-10 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center py-6">Failed to load courses.</p>
    );
  }

  return (
    <div className="bg-violet-50 dark:bg-violet-900 py-4 px-4 sm:px-6 lg:px-12">
      <TitleSubTitle
        title="Your Success Starts Here!"
        subtitle="Join thousands of students achieving their goals through Edu Care"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {courseMapData.map((course: ICourse) => (
          <div
            key={course._id?.toString()}
            className="bg-white dark:bg-violet-800 shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            {/* Course Image */}
            <div className="h-40 w-full overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-fill transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col ">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                  <span className="inline-block bg-violet-100 dark:bg-violet-700 text-violet-800 dark:text-violet-100 font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wide">
                    {course.title}
                  </span>
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-violet-700 dark:text-violet-200 font-bold">
                    {course.price} Tk
                  </p>
                  <p className="text-violet-700 dark:text-violet-200 font-bold">
                    {course.duration} Day's
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  disabled={course.seat <= 0 || addIsLoading}
                  onClick={() => handleAddToCart(course?._id)}
                  className={`flex-1 py-2 rounded-lg font-semibold transition
    ${
      course.seat <= 0
        ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
        : " cursor-pointer bg-violet-500 hover:bg-violet-600 dark:bg-violet-200 dark:hover:bg-violet-300 text-white dark:text-gray-900"
    }`}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigate(`/courses/${course._id}`)}
                  className="cursor-pointer flex-1 border border-violet-500 dark:border-violet-200 hover:bg-violet-100 dark:hover:bg-violet-700 text-violet-700 dark:text-violet-200 font-semibold py-2 rounded-lg transition"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
