import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // register
    // register: builder.mutation({
    //   query: (userInfo) => ({
    //     url: "/auth/register",
    //     method: "POST",
    //     data: userInfo,
    //   }),
    // }),
    // my-profile
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    // get all user
    getUsers: builder.query({
      query: (params) => {
        if (!params) {
          return {
            url: "/user",
            method: "GET",
          };
        }

        // If params exist, pass them (page & limit)
        return {
          url: "/user",
          method: "GET",
          params,
        };
      },
      providesTags: ["USER"],
      // transformResponse: (response) => response.data,
    }),

    //
  }),
});

export const { useUserInfoQuery, useGetUsersQuery } = userApi;
