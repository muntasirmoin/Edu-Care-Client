import { baseApi } from "@/redux/baseApi";

export interface ICartItem {
  _id: string;
  userId: string;
  courseId: string;
  priceSnapshot: number;
  createdAt: string;
  updatedAt: string;
  course?: {
    _id: string;
    title: string;
    image: string;
    price: number;
    duration: number;
    seat: number;
  };
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Add to cart
    addToCart: builder.mutation({
      query: (payload) => ({
        url: "/cart",
        method: "POST",
        data: payload, // { courseId: "123" }
      }),
      invalidatesTags: ["CART"],
    }),

    // get cart
    getCart: builder.query({
      query: (params) => {
        if (!params) {
          return {
            url: "/cart",
            method: "GET",
          };
        }

        // If params exist, pass them (page & limit)
        return {
          url: "/cart",
          method: "GET",
          params,
        };
      },
      providesTags: ["CART"],
      // transformResponse: (response) => response.data,
    }),

    // Get user cart items
    // getCartItems: builder.query<{ data: ICartItem[] }, void>({
    //   query: () => ({
    //     url: "/carts",
    //     method: "GET",
    //   }),
    //   providesTags: ["CART"],
    // }),

    // Remove item from cart
    removeCartItem: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CART"],
    }),
    //
    // checkout
    checkoutCart: builder.mutation<void, void>({
      query: () => ({
        url: "/cart/checkout",
        method: "POST",
      }),
      invalidatesTags: ["CART"],
    }),

    //
  }),
});

export const {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveCartItemMutation,
  useCheckoutCartMutation,
} = cartApi;
