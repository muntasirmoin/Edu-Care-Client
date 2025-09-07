import { useNavigate, useParams } from "react-router-dom";
import { useGetCoursesQuery } from "@/redux/features/Course/course.api";
import { toast } from "sonner";
import type { ICourse } from "../CourseDeleteTable/CourseDeleteTable";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetCoursesQuery(undefined);

  const course = data?.data?.find((c: ICourse) => c._id === id);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1  gap-6">
        {[...Array(1)].map((_, idx) => (
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

  if (!course || isError) {
    return <p className="text-center py-10 text-red-500">Course not found.</p>;
  }

  return (
    <div className=" bg-violet-50 dark:bg-violet-900 flex justify-center items-start py-2 px-4">
      <div className="bg-white dark:bg-violet-900 shadow-2xl rounded-2xl max-w-3xl w-full p-6 sm:p-8 mx-auto transition-all">
        {/* Course Image */}
        <div className="w-full h-64 sm:h-80 overflow-hidden rounded-xl mb-6 shadow-inner">
          <img
            src={course.image}
            alt={course.title}
            className="object-fill w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Course Info */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-wide">
          {course.title}
        </h2>

        <p className="text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 text-lg">
          {course.description || "No description available."}
        </p>

        {/* Stats Row */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-6 text-violet-700 dark:text-violet-200 font-bold text-lg">
          <span>
            Price: <span className="font-extrabold">{course.price} Tk</span>
          </span>
          <span>
            ⏱ Duration:{" "}
            <span className="font-extrabold">{course.duration} Day's</span>
          </span>
          <span>
            🎓 Available Seats:{" "}
            <span className="font-extrabold">{course.seat}</span>
          </span>
        </div>

        {/* Instructor & Category */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-6">
          <p className="text-gray-800 dark:text-white text-lg font-semibold">
            <span className="inline-block bg-violet-100 dark:bg-violet-700 text-violet-800 dark:text-violet-100 font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wide">
              👨‍🏫 Instructor: {course.instructor}
            </span>
          </p>
          <span className="inline-block bg-violet-100 dark:bg-violet-700 text-violet-800 dark:text-violet-100 font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wide">
            📂 Category: {course.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            disabled={course.seat <= 0}
            onClick={() => toast.success("Added to cart!")}
            className="cursor-pointer flex-1 bg-violet-600 hover:bg-violet-700 dark:bg-violet-200 dark:hover:bg-violet-300 text-white dark:text-gray-900 font-bold py-3 rounded-xl shadow-lg transition-all text-lg"
          >
            Add to Cart
          </button>
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer flex-1 border-2 border-violet-600 dark:border-violet-200 hover:bg-violet-100 dark:hover:bg-violet-700 text-violet-700 dark:text-violet-200 font-bold py-3 rounded-xl transition-all text-lg"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
