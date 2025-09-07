import type { ICourse } from "@/pages/Course/CourseUpdateTable/CourseUpdateTable";
import { baseApi } from "@/redux/baseApi";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation({
      query: (courseData) => ({
        url: "/course",
        method: "POST",
        data: courseData,
      }),
      invalidatesTags: ["COURSE"],
    }),
    // get course
    getCourses: builder.query({
      query: (params) => {
        if (!params) {
          return {
            url: "/course",
            method: "GET",
          };
        }

        // If params exist, pass them (page & limit)
        return {
          url: "/course",
          method: "GET",
          params,
        };
      },
      providesTags: ["COURSE"],
      // transformResponse: (response) => response.data,
    }),
    //

    //update Course
    updateCourse: builder.mutation<
      ICourse,
      { id: string; payload: Partial<ICourse> }
    >({
      query: ({ id, payload }) => ({
        url: `/course/${id}`,
        method: "PATCH",
        data: payload, // <-- must be `data` for Axios
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["COURSE"],
    }),
    //delete
    deleteCourse: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/course/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["COURSE"],
    }),

    //
  }),
});

// export const {} = courseApi;
export const {
  useAddCourseMutation,
  useGetCoursesQuery,
  useUpdateCourseMutation,
} = courseApi;
