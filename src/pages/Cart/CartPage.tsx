import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  useCheckoutCartMutation,
  useGetCartQuery,
  useRemoveCartItemMutation,
} from "@/redux/features/Cart/cart.api";
import type { ICartItem } from "@/types/caertInterface";
import { Skeleton } from "@/components/ui/skeleton";
import TitleSubTitle from "@/components/layout/Shared/TitleSubTitle";
import Swal from "sweetalert2";

const CartPage = () => {
  const navigate = useNavigate();
  const { data: cartData, isLoading: cartLoading } = useGetCartQuery(undefined);
  const [removeFromCart, { isLoading: removing }] = useRemoveCartItemMutation();

  const handleRemove = async (cartItemId: string) => {
    console.log("cartItemId", cartItemId);
    try {
      await removeFromCart(cartItemId).unwrap();
      toast.success("Removed from cart!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.data?.message === "CartItem not found") {
        toast.error(`${error?.data?.message}`);
      } else {
        toast.error("Failed to remove item");
      }
    }
  };

  const [checkoutCart, { isLoading }] = useCheckoutCartMutation();

  const handleCheckout = async () => {
    const confirm = await Swal.fire({
      title: "Confirm Checkout",
      text: "Do you want to complete the checkout and enroll in the courses?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Checkout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;
    try {
      await checkoutCart().unwrap(); // call backend
      toast.success("Checkout successful! Courses enrolled.");
      navigate("/enrollment"); // redirect to success page
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.data?.message || "Checkout failed. Please try again.");
    }
  };

  if (cartLoading) {
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

  if (!cartData || cartData.data.length === 0) {
    return (
      <div className="min-h-screen py-5 bg-white dark:bg-violet-800">
        <TitleSubTitle title="🛒 Your Shopping Cart 🛒" subtitle="Its Empty!" />
      </div>
    );
  }

  // Calculate total price
  const totalPrice = cartData.data.reduce(
    (sum: number, item: ICartItem) => sum + item.courseId.price,
    0
  );

  return (
    <div className="p-6 sm:p-8 bg-violet-50 dark:bg-violet-900 min-h-screen">
      {/* <h1 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white text-center">
        Your Cart
      </h1> */}
      <TitleSubTitle
        title="🛒 Your Shopping Cart 🛒"
        subtitle="Review your courses and proceed to checkout"
      />
      {/* Total & Checkout */}
      <div className="mt-3 mb-3 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          <span className="inline-block py-3 px-6  bg-violet-100 dark:bg-violet-700 text-violet-800 dark:text-violet-100 font-bold  rounded-full text-xl uppercase tracking-wide">
            🛒 Total: {totalPrice} Tk
          </span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={isLoading || !cartData?.data?.length}
          className="bg-green-500 mr-0.5  cursor-pointer hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all text-lg"
        >
          {isLoading ? "Processing..." : "Checkout"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse rounded-lg shadow-lg">
          <thead>
            <tr className="bg-violet-200 dark:bg-violet-700 text-gray-900 dark:text-white text-center uppercase tracking-wide">
              <th className="p-3 rounded-l-lg">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Category</th>
              {/* <th className="p-3">Seat</th> */}
              <th className="p-3 rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartData.data.map((item: ICartItem) => {
              const isSoldOut = item.courseId.seat <= 0;

              return (
                <tr
                  key={item._id}
                  className={`border-b border-gray-200 dark:border-violet-700 transition ${
                    isSoldOut
                      ? ""
                      : "bg-white dark:bg-violet-800 text-gray-900 dark:text-white hover:bg-violet-50 dark:hover:bg-violet-900"
                  }`}
                >
                  <td className="p-3 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <img
                      src={item.courseId.image}
                      alt={item.courseId.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-sm"
                    />
                  </td>
                  <td className="p-3 text-center font-bold text-violet-700 dark:text-violet-200">
                    <span className="font-semibold">{item.courseId.title}</span>
                    {isSoldOut && (
                      <p className="text-sm font-medium text-red-600 dark:text-red-300 mt-1">
                        ❌ No seats available — remove from cart
                      </p>
                    )}
                  </td>
                  <td className="p-3 text-center text-violet-700 dark:text-violet-200 font-semibold">
                    {item.courseId.price} Tk
                  </td>
                  <td className="p-3 text-center">
                    {item.courseId.duration} Day's
                  </td>
                  <td className="p-3 text-center uppercase">
                    {item.courseId.category}
                  </td>
                  {/* <td className="p-3 text-center">{isSoldOut ? "0" : 1}</td> */}
                  <td className="p-3 text-center">
                    <div className="flex justify-center items-center">
                      <button
                        onClick={() => handleRemove(item._id)}
                        disabled={removing}
                        className="bg-red-500 cursor-pointer hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartPage;
