import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface CartButtonProps {
  count?: number;
}

export function CartButton({ count = 0 }: CartButtonProps) {
  return (
    <Link to="/cart">
      <Button
        variant="ghost"
        className="
          relative flex items-center gap-2 cursor-pointer
          text-violet-600 dark:text-violet-300
          hover:text-violet-700 dark:hover:text-violet-100
          hover:bg-violet-300/30 dark:hover:bg-violet-700/30
          transition
        "
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="hidden sm:inline">Cart</span>

        {count > 0 && (
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
            {count}
          </Badge>
        )}
      </Button>
    </Link>
  );
}
