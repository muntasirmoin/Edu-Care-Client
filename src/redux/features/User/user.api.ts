import { baseApi } from "@/redux/baseApi";
import type { IUser } from "@/types/caertInterface";

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
    softDeleteUser: builder.mutation<
      IUser,
      { id: string; payload: Partial<IUser> }
    >({
      query: ({ id, payload }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: payload, // <-- must be `data` for Axios
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["USER"],
    }),

    //
  }),
});

export const { useUserInfoQuery, useGetUsersQuery, useSoftDeleteUserMutation } =
  userApi;
