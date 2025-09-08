import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useGetAllEnrollmentsQuery } from "@/redux/features/Enrollement/enrollement.api";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import PaginationComponent from "@/components/pagination";
import type { ICourse } from "@/pages/Course/CourseUpdateTable/CourseUpdateTable";

interface IUser {
  _id: string;
  name: string;
  email: string;
}

// Enrollment info
export interface IEnrollment {
  _id: string;
  userId: IUser;
  courseId: ICourse;
  status: "active" | "completed" | "cancelled";
  paymentStatus: "paid" | "unpaid";
  isDeleted: boolean;
  createdAt: string;
  updatedAt?: string;
}

export default function EnrollmentView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState<number>(8);
  const {
    data: enrollmentsData,
    isLoading,
    isError,
  } = useGetAllEnrollmentsQuery({
    page: currentPage,
    limit,
  });

  const enrollmentsMapData = enrollmentsData?.data ?? [];
  const totalPages = enrollmentsData?.meta?.totalPage ?? 1;
  //   console.log("asds", enrollmentsData?.meta?.total);

  if (isLoading) {
    return (
      <div className="space-y-4 overflow-x-auto px-4">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
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
    <div className="space-y-4">
      {/* Header */}
      {/* <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Course Enrollments
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          A list of students enrolled in courses with their enrollment details.
        </p>
      </div> */}

      {/* Table */}
      <div className="rounded-xl border shadow-sm overflow-hidden dark:bg-violet-900 transition-colors">
        <h2 className="text-2xl font-bold text-gray-800 mt-5 py-3 dark:text-white mb-4">
          A list of students enrolled in courses with their enrollment details.
        </h2>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-violet-800/50">
                <TableHead className="text-center text-gray-700 dark:text-gray-200 font-semibold">
                  Student
                </TableHead>
                <TableHead className="text-center text-gray-700 dark:text-gray-200 font-semibold">
                  Course Title
                </TableHead>
                <TableHead className="text-center text-gray-700 dark:text-gray-200 font-semibold">
                  Category
                </TableHead>
                <TableHead className="text-center text-gray-700 dark:text-gray-200 font-semibold">
                  Price
                </TableHead>
                <TableHead className="text-center text-gray-700 dark:text-gray-200 font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-center text-gray-700 dark:text-gray-200 font-semibold">
                  Enrolled Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enrollmentsMapData.map((enroll: IEnrollment) => (
                <TableRow
                  key={enroll._id}
                  className="hover:bg-gray-100 dark:hover:bg-violet-800 transition-colors"
                >
                  <TableCell className="font-medium">
                    {enroll.userId.name}
                  </TableCell>
                  <TableCell>{enroll.courseId.title}</TableCell>
                  <TableCell>{enroll.courseId.category}</TableCell>
                  <TableCell>{enroll.courseId.price}</TableCell>
                  <TableCell>
                    <Badge
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        enroll.status === "active"
                          ? "bg-green-100 text-green-700 border border-green-300 dark:bg-green-800 dark:text-green-100 dark:border-green-700"
                          : "bg-gray-100 text-gray-700 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                      }`}
                    >
                      {enroll.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(enroll.createdAt), "PPpp")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
}
