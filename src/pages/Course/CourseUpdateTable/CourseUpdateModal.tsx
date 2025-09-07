import { useState } from "react";
import {
  CourseCategoryEnum,
  CourseStatusEnum,
  type ICourse,
} from "./CourseUpdateTable";
import { useUpdateCourseMutation } from "@/redux/features/Course/course.api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = {
  course: ICourse;
  onClose: () => void;
  onUpdated: () => void;
};

export default function UpdateCourseModal({
  course,
  onClose,
  onUpdated,
}: Props) {
  const [formData, setFormData] = useState<ICourse>(course);
  const [updateCourse] = useUpdateCourseMutation(); // RTK Query mutation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("course.id", course._id, formData);
    // const { _id, ...payload } = formData;
    try {
      const res = await updateCourse({
        id: formData._id,
        payload: formData,
      }).unwrap(); // <-- unwrap() to get the raw response instead of RTK action object

      if (res) {
        toast.success("Course updated successfully!");
        onUpdated();
        onClose();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Failed to update course!");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-violet-900 p-6 rounded-md w-full max-w-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Update Course Here!</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md"
        >
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Course Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Enter course title"
              required
            />
          </div>

          {/* Instructor */}
          <div>
            <label
              htmlFor="instructor"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Instructor
            </label>
            <input
              id="instructor"
              type="text"
              value={formData.instructor}
              onChange={(e) =>
                setFormData({ ...formData, instructor: e.target.value })
              }
              className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Instructor name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              rows={3}
              placeholder="Write a short description"
            />
          </div>

          {/* Seat */}
          <div>
            <label
              htmlFor="seat"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Available Seats
            </label>
            <input
              id="seat"
              type="number"
              value={formData.seat}
              onChange={(e) =>
                setFormData({ ...formData, seat: Number(e.target.value) })
              }
              className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Number of seats"
              min={0}
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: Number(e.target.value) })
              }
              className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Enter price"
              min={0}
            />
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Duration (Day)
            </label>
            <input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: Number(e.target.value) })
              }
              className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
              placeholder="Duration in hours"
              min={0}
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(CourseCategoryEnum)
                .filter(([key]) => key !== "ALL")
                .map(([key, value]) => (
                  <option key={key} value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </option>
                ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="border border-gray-300 dark:border-gray-700 p-2 w-full rounded-md bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value={CourseStatusEnum.Draft}>Draft</option>
              <option value={CourseStatusEnum.Published}>Published</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
            <Button
              type="button"
              className="px-4 py-2 cursor-pointer rounded-md bg-red-500 text-white hover:bg-red-600 w-full sm:w-auto"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 cursor-pointer rounded-md bg-violet-500 text-white hover:bg-violet-600 w-full sm:w-auto"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
