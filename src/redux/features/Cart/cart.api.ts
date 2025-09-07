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

    // Get user cart items
    // getCartItems: builder.query<{ data: ICartItem[] }, void>({
    //   query: () => ({
    //     url: "/carts",
    //     method: "GET",
    //   }),
    //   providesTags: ["CART"],
    // }),

    // Remove item from cart
    // removeCartItem: builder.mutation<{ message: string }, string>({
    //   query: (id) => ({
    //     url: `/carts/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["CART"],
    // }),
    //
  }),
});

export const {
  useAddToCartMutation,
  //   useGetCartItemsQuery,
  //   useRemoveCartItemMutation,
} = cartApi;
