import { useGetCoursesQuery } from "@/redux/features/Course/course.api";
import DashboardChart from "./Chart/ChartView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUsersQuery } from "@/redux/features/User/user.api";
import { useGetAllEnrollmentsQuery } from "@/redux/features/Enrollement/enrollement.api";
import CourseTable from "../Course/CourseTable/CourseTable";
import { Skeleton } from "@/components/ui/skeleton";

const AdminOverView = () => {
  const {
    data: enrollmentsData,
    isLoading: enrollmentLoading,
    isError: enrollmentError,
  } = useGetAllEnrollmentsQuery(undefined);

  const {
    data: usersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useGetUsersQuery(undefined);

  const {
    data: coursesData,
    isLoading: coursesLoading,
    isError: CoursesError,
  } = useGetCoursesQuery(undefined);

  //  enrollments={enrollmentsData?.meta?.total ?? 0}
  //       users={usersData?.meta?.total ?? 0}
  //       courses={coursesData?.meta?.total ?? 0}

  if (coursesLoading || usersLoading || enrollmentLoading) {
    return (
      <Card className="bg-white dark:bg-violet-900 transition-colors">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            Dashboard Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    );
  }

  // Error placeholder
  if (CoursesError || usersError || enrollmentError) {
    return (
      <Card className="bg-white dark:bg-violet-900 transition-colors">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            Dashboard Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-600 dark:text-red-400">
            Failed to load chart data.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <DashboardChart
        enrollments={enrollmentsData?.meta?.total ?? 0}
        users={usersData?.meta?.total ?? 0}
        courses={coursesData?.meta?.total ?? 0}
      ></DashboardChart>

      <CourseTable limitNumber={5} tableTitle="All Courses" />
    </>
  );
};

export default AdminOverView;
