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
    //     getDivisions: builder.query({
    //       query: () => ({
    //         url: "/division",
    //         method: "GET",
    //       }),
    //       providesTags: ["DIVISION"],
    //       transformResponse: (response) => response.data,
    //     }),
  }),
});

// export const {} = courseApi;
export const { useAddCourseMutation } = courseApi;
