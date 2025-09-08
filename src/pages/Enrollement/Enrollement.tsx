import TitleSubTitle from "@/components/layout/Shared/TitleSubTitle";
import PaginationComponent from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyEnrollmentsQuery } from "@/redux/features/Enrollement/enrollement.api";
import { useState } from "react";

interface IEnrollment {
  _id: string;
  courseId: {
    description: string;
    _id: string;
    title: string;
    image: string;
    price: number;
    duration: number;
    category: string;
    instructor: string;
  };
  status: string;
  paymentStatus: string;
}

const Enrollment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState<number>(3);
  const { data, isLoading, error } = useGetMyEnrollmentsQuery({
    page: currentPage,
    limit,
  });

  const totalPages = data?.meta?.totalPage ?? 1;

  console.log("enrollmentData", data);

  if (!data || data.data.length === 0) {
    return (
      <div className="mt-5 ">
        <TitleSubTitle
          title=" You have not enrolled in any course"
          subtitle="Its Empty!"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, idx) => (
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

  if (error) {
    return (
      <div className="text-center text-red-500 mt-8">
        Failed to load enrollments.
      </div>
    );
  }

  return (
    <div className="bg-violet-50 dark:bg-violet-900 py-8 px-4 sm:px-6 lg:px-12">
      {/* Title & Subtitle */}
      {/* <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          My Enrollments
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Here are all your enrolled courses. Keep track of your learning
          journey!
        </p>
      </div> */}
      <TitleSubTitle
        title="Enrollment Courses"
        subtitle="Here are all your enrolled courses. Keep track of your learning
          journey!"
      />
      {/* Enrollment Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.map((enrollment: IEnrollment) => {
          const course = enrollment.courseId;
          return (
            <div
              key={enrollment._id}
              className="bg-white dark:bg-violet-900 shadow-lg rounded-2xl overflow-hidden transition-transform hover:scale-105"
            >
              {/* Course Image */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-full transition-transform duration-300"
                />
              </div>

              {/* Card Content */}
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base">
                  <span className="inline-block bg-violet-100 dark:bg-violet-700 text-violet-800 dark:text-violet-100 font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wide">
                    👨‍🏫 {course.instructor}
                  </span>
                </p>

                <div className="flex items-center justify-between gap-4 mb-4">
                  {/* Duration */}
                  <span className="flex items-center gap-1 font-semibold text-violet-700 dark:text-violet-200">
                    ⏱ <span className="font-bold">{course.duration} Day's</span>
                  </span>

                  {/* Price */}
                  <span className="flex items-center gap-1 font-semibold text-violet-700 dark:text-violet-200">
                    📈 <span className="font-bold">{course.price} Tk</span>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 text-gray-800 dark:text-gray-200">
                  {/* Duration */}

                  {/* Category */}
                  <span className="flex items-center gap-1 bg-violet-100 dark:bg-violet-700 text-violet-800 dark:text-violet-100 font-bold px-3 py-1 rounded-full text-sm uppercase tracking-wide">
                    📂 {course.category}
                  </span>

                  {/* Enrollment Status */}
                  <span
                    className={`flex items-center gap-1 font-semibold px-3 py-1 rounded-full text-sm uppercase ${
                      enrollment.status === "ACTIVE"
                        ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-400"
                    }`}
                  >
                    🛈 {enrollment.status}
                  </span>

                  {/* Payment Status */}
                  <span
                    className={`flex items-center gap-1 font-semibold px-3 py-1 rounded-full text-sm uppercase bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-400`}
                  >
                    💳 Paid
                  </span>
                </div>

                {/* Payment Status */}
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <p className="text-gray-700 mt-2 py-0.5 dark:text-gray-300 mb-4 text-sm sm:text-base">
                    <span className="inline-block bg-violet-100 dark:bg-violet-700 text-violet-800 dark:text-violet-100 font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wide">
                      📝 {course.description}
                    </span>
                  </p>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Pagination */}
      <div className="mt-6 py-2.5 mb-5 flex justify-center">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Enrollment;
