import { baseApi } from "@/redux/baseApi";

export const enrollmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getMyEnrollments
    getMyEnrollments: builder.query({
      query: (params) => {
        if (!params) {
          return {
            url: "/enrollment/my-enrollments",
            method: "GET",
          };
        }

        // If params exist, pass them (page & limit)
        return {
          url: "/enrollment/my-enrollments",
          method: "GET",
          params,
        };
      },
      providesTags: ["ENROLLMENT"],
      // transformResponse: (response) => response.data,
    }),
    //
  }),

  //
});

export const { useGetMyEnrollmentsQuery } = enrollmentApi;
