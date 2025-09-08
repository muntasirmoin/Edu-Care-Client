import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useGetUsersQuery } from "@/redux/features/User/user.api";
import PaginationComponent from "@/components/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import type { IUser } from "@/types/caertInterface";

export default function UserView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState<number>(5);
  const {
    data: usersData,
    isLoading,
    isError,
  } = useGetUsersQuery({
    page: currentPage,
    limit,
  });

  const usersMapData = usersData?.data ?? [];
  const totalPages = usersData?.meta?.totalPage ?? 1;

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
    <div className="rounded-xl border shadow-sm overflow-hidden dark:bg-violet-900 transition-colors">
      <div className="w-full overflow-x-auto">
        <h2 className="text-2xl font-bold text-gray-800 mt-5 py-3 dark:text-white mb-4">
          A list of All Users
        </h2>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-violet-800/50">
              <TableHead className="text-center text-gray-700 dark:text-gray-200 font-semibold">
                Name
              </TableHead>
              <TableHead className="text-center text-gray-700 dark:text-gray-200 font-semibold">
                Email
              </TableHead>
              <TableHead className="text-center text-gray-700 dark:text-gray-200 font-semibold">
                Address
              </TableHead>
              <TableHead className="text-center text-gray-700 dark:text-gray-200 font-semibold">
                Role
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersMapData.map((user: IUser) => (
              <TableRow
                key={user._id}
                className="hover:bg-gray-100 dark:hover:bg-violet-800 transition-colors"
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="truncate max-w-[200px]">
                  {user.email}
                </TableCell>
                <TableCell className="truncate max-w-[250px]">
                  {user.address}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.role === "ADMIN"
                        ? "outline"
                        : user.role === "USER"
                        ? "secondary"
                        : "outline"
                    }
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === "USER"
                        ? "bg-green-100 text-green-700 border border-green-300 dark:bg-green-800 dark:text-green-100 dark:border-green-700"
                        : "bg-green-100 text-red-700 border border-red-300 dark:bg-red-800 dark:text-green-100 dark:border-red-700"
                    }`}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
