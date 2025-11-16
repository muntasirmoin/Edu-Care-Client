import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useGetCartQuery } from "@/redux/features/Cart/cart.api";

export function CartButton() {
  const { data: cartData, isLoading: cartLoading } = useGetCartQuery(undefined);
  // console.log("cartData", cartData?.data?.length);
  const totalCartData = cartData?.data?.length;
  return (
    <Link to="/cart">
      <Button
        variant="ghost"
        className="
          relative flex items-center gap-2 cursor-pointer
         
        "
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="hidden sm:inline">Cart</span>

        {totalCartData > 0 && (
          <Badge
            variant="destructive"
            className="
              absolute -top-2 -right-2 h-5 w-5 
              flex items-center justify-center rounded-full 
              text-[10px] p-0
              bg-violet-600 dark:bg-violet-300
              text-white dark:text-black
            "
          >
            {cartLoading ? "..." : `${totalCartData}`}
          </Badge>
        )}
      </Button>
    </Link>
  );
}
