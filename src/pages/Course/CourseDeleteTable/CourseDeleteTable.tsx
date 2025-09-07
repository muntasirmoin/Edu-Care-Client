import { useState } from "react";
import PaginationComponent from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from "@/redux/features/Course/course.api";
import { toast } from "sonner";
import Swal from "sweetalert2";

// import your modal

export type ICourse = {
  _id: string;
  title: string;
  instructor: string;
  seat: number;
  price: number;
  duration: number;
  category: string;
  status: string;
  description: string;
  image: string;
};

export const CourseStatusEnum = {
  All: "",
  Draft: "draft",
  Published: "published",
} as const;

export type CourseStatusKey = keyof typeof CourseStatusEnum;
export type CourseStatusTypeValue = (typeof CourseStatusEnum)[CourseStatusKey];

export const CourseCategoryEnum = {
  ALL: "",
  PROGRAMMING: "programming",
  DESIGN: "design",
  MARKETING: "marketing",
  BUSINESS: "business",
  MUSIC: "music",
  MATH: "Math",
  SCIENCE: "Science",
  HISTORY: "History",
  ENGLISH: "English",
} as const;

export type CourseCategoryKey = keyof typeof CourseCategoryEnum;
export type CourseCategoryTypeValue =
  (typeof CourseCategoryEnum)[CourseCategoryKey];

type CourseTableProps = {
  limitNumber?: number; // optional number prop
  tableTitle?: string;
};

export default function CourseDeleteTable({
  limitNumber,
  tableTitle,
}: CourseTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState<number>(limitNumber ?? 8);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CourseStatusTypeValue>(
    CourseStatusEnum.All
  );
  const [categoryFilter, setCategoryFilter] = useState<CourseCategoryTypeValue>(
    CourseCategoryEnum.ALL
  );

  const actualStatusFilter = statusFilter === "" ? undefined : statusFilter;
  const actualCategoryFilter =
    categoryFilter === "" ? undefined : categoryFilter;

  const {
    data: coursesData,
    isLoading,
    isError,
  } = useGetCoursesQuery({
    page: currentPage,
    limit,
    searchTerm: search,
    status: actualStatusFilter,
    category: actualCategoryFilter,
    // sort: "-updatedAt",
  });

  const courseMapData = coursesData?.data ?? [];
  const totalPages = coursesData?.meta?.totalPage ?? 1;

  //  delete course
  const [deleteCourse] = useDeleteCourseMutation();

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This course will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteCourse(id).unwrap();
        toast.success("Course deleted successfully ✅");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error?.data?.message) {
          toast.error(error?.data?.message);
        } else {
          toast.error("Failed to delete course ❌");
        }
      }
    }
  };

  // Skeleton loader
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
    <div className="overflow-x-auto px-4">
      {/* Table Title */}
      <h2 className="text-2xl font-bold text-gray-800 border-2 mt-5 py-3 dark:text-white mb-4">
        {tableTitle}
      </h2>

      {/* Filters */}
      <div className="mt-4 sm:mt-6 mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded p-2 w-full sm:w-1/3 dark:bg-violet-900 dark:text-white"
        />

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value as CourseCategoryTypeValue);
              setCurrentPage(1);
            }}
            className="border rounded p-2 w-full sm:w-auto bg-white dark:bg-violet-900 text-black dark:text-white"
          >
            <option value={CourseCategoryEnum.ALL}>Category</option>
            {Object.entries(CourseCategoryEnum).map(([key, value]) => {
              if (key === "ALL") return null;
              return (
                <option key={key} value={value}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </option>
              );
            })}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as CourseStatusTypeValue);
              setCurrentPage(1);
            }}
            className="border rounded p-2 w-full sm:w-auto bg-white dark:bg-violet-900 text-black dark:text-white"
          >
            <option value={CourseStatusEnum.All}>Status</option>
            <option value={CourseStatusEnum.Draft}>Draft</option>
            <option value={CourseStatusEnum.Published}>Published</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <Table className="min-w-[800px] rounded-lg shadow-md border border-gray-200 dark:border-violet-700">
        <TableHeader>
          <TableRow className="bg-white dark:bg-violet-900 text-gray-700 dark:text-white uppercase text-xs tracking-wide">
            <TableHead className="text-center">Image</TableHead>
            <TableHead className="text-center">Action</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Instructor</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="text-center">Seat</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Duration</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseMapData.length > 0 ? (
            courseMapData.map((course: ICourse) => (
              <TableRow
                key={course._id}
                className="hover:bg-gray-100 dark:hover:bg-violet-800 transition-colors duration-200"
              >
                <TableCell className="text-center">
                  <div className="w-16 h-16 overflow-hidden rounded-md mx-auto">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="bg-red-600 cursor-pointer px-4 py-2 rounded-lg text-white hover:bg-red-900 transition"
                  >
                    DELETE
                  </button>
                </TableCell>
                <TableCell className="font-medium text-center">
                  {course.title}
                </TableCell>
                <TableCell className="text-center">
                  {course.instructor}
                </TableCell>
                <TableCell className="hidden md:table-cell max-w-xs truncate">
                  {course.description}
                </TableCell>
                <TableCell className="text-center">{course.seat}</TableCell>
                <TableCell className="text-center">{course.price}</TableCell>
                <TableCell className="text-center">{course.duration}</TableCell>
                <TableCell className="text-center">{course.category}</TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      course.status === "published"
                        ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {course.status.charAt(0).toUpperCase() +
                      course.status.slice(1)}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={10}
                className="text-center text-gray-500 py-6"
              >
                No courses available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
