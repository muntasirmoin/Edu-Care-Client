import {
  BoltIcon,
  BookOpenIcon,
  Layers2Icon,
  LogOutIcon,
  PinIcon,
  UserPenIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto cursor-pointer p-0 hover:bg-violet-200/30 dark:hover:bg-violet-700/30 transition rounded-full border-2 border-violet-300 dark:border-violet-600"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src="./avatar.jpg" alt="Profile image" />
            <AvatarFallback>KK</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="max-w-xs bg-white dark:bg-gray-900 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 p-2"
        align="end"
      >
        <DropdownMenuLabel className="flex flex-col min-w-0 px-2 py-1">
          <span className="text-foreground dark:text-violet-100 truncate text-sm font-medium">
            Keith Kennedy
          </span>
          <span className="text-muted-foreground dark:text-violet-300 truncate text-xs font-normal">
            k.kennedy@originui.com
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-violet-100/50 dark:hover:bg-violet-700/40 rounded-md px-2 py-1 flex items-center gap-2">
            <BoltIcon
              size={16}
              className="opacity-70 text-violet-600 dark:text-violet-300"
            />
            <span>Option 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-violet-100/50 dark:hover:bg-violet-700/40 rounded-md px-2 py-1 flex items-center gap-2">
            <Layers2Icon
              size={16}
              className="opacity-70 text-violet-600 dark:text-violet-300"
            />
            <span>Option 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-violet-100/50 dark:hover:bg-violet-700/40 rounded-md px-2 py-1 flex items-center gap-2">
            <BookOpenIcon
              size={16}
              className="opacity-70 text-violet-600 dark:text-violet-300"
            />
            <span>Option 3</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-violet-100/50 dark:hover:bg-violet-700/40 rounded-md px-2 py-1 flex items-center gap-2">
            <PinIcon
              size={16}
              className="opacity-70 text-violet-600 dark:text-violet-300"
            />
            <span>Option 4</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-violet-100/50 dark:hover:bg-violet-700/40 rounded-md px-2 py-1 flex items-center gap-2">
            <UserPenIcon
              size={16}
              className="opacity-70 text-violet-600 dark:text-violet-300"
            />
            <span>Option 5</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="hover:bg-red-100/50 dark:hover:bg-red-700/40 rounded-md px-2 py-1 flex items-center gap-2 text-red-600 dark:text-red-300">
          <LogOutIcon size={16} className="opacity-70" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
