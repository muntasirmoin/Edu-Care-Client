import { FileTextIcon, HomeIcon, UsersIcon } from "lucide-react";

import ThemeToggle from "@/components/theme-toggle";
import UserMenu from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CartButton } from "@/pages/Cart/cartButton";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/Logo/Logo";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import { role } from "@/constants/role";
import { authApi, useLogoutMutation } from "@/redux/features/Auth/auth.api";
import { useAppDispatch } from "@/redux/hook";

// Navigation links
const navigationLinks = [
  { href: "/", label: "Home", icon: HomeIcon, role: "PUBLIC" },
  { href: "/courses", label: "Courses", role: "PUBLIC" },
  { href: "#", label: "About", icon: FileTextIcon, role: "PUBLIC" },
  { href: "#", label: "Faq", icon: UsersIcon, role: "PUBLIC" },
  { href: "/contact", label: "Contact", icon: UsersIcon, role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", icon: UsersIcon, role: role.ADMIN },
];

export default function Navbar() {
  const location = useLocation();
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());
  };

  console.log("info", data);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md shadow-md border-b border-violet-200 dark:border-violet-700 transition-colors duration-300
      bg-gradient-to-r from-violet-50/80 via-violet-100/70 to-violet-50/80 dark:from-violet-900/80 dark:via-violet-800/70 dark:to-violet-900/80"
    >
      {/* <div className="flex h-16 items-center justify-between max-w-7xl mx-auto px-4 md:px-6"> */}
      <div className="flex h-16 items-center justify-between w-[95%]  mx-auto px-4 md:px-1">
        {/* Left side */}
        <div className="flex flex-1 items-center gap-4">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden p-2 hover:bg-violet-200/30 dark:hover:bg-violet-700/30 transition rounded-md"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 12L20 12" />
                  <path d="M4 6L20 6" />
                  <path d="M4 18L20 18" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-44 p-2 md:hidden rounded-md shadow-lg
              bg-gradient-to-b from-violet-50/90 via-violet-100/70 to-violet-50/90 dark:from-violet-900/90 dark:via-violet-800/70 dark:to-violet-900/90"
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-1">
                  {navigationLinks.map((link, index) => {
                    const canShow =
                      link.role === "PUBLIC" || link.role === data?.data?.role;
                    return canShow ? (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="flex items-center gap-2 px-3 py-2 rounded-md text-violet-600 dark:text-violet-300 hover:text-violet-500 dark:hover:text-violet-200 hover:bg-violet-100/30 dark:hover:bg-violet-700/30 transition"
                          // active={link.active}
                        >
                          <span>{link.label}</span>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ) : null;
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Logo */}
          <a
            href="#"
            className="text-violet-700 dark:text-violet-300 hover:text-violet-500 dark:hover:text-violet-200 transition text-lg font-bold"
          >
            <Logo />
          </a>

          {/* Desktop navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-3">
              <TooltipProvider>
                {navigationLinks.map((link) => {
                  const canShow =
                    link.role === "PUBLIC" || link.role === data?.data?.role;
                  return canShow ? (
                    <NavigationMenuItem key={link.label}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <NavigationMenuLink
                            href={link.href}
                            className={`px-4 py-2 rounded-md text-sm font-bold transition
    ${
      location.pathname === link.href
        ? "bg-violet-300/30 dark:bg-violet-700/30 text-violet-800 dark:text-violet-100"
        : "text-violet-600 dark:text-violet-300 hover:text-violet-500 dark:hover:text-violet-200 hover:bg-violet-300/30 dark:hover:bg-violet-700/30"
    }`}
                          >
                            {link.label}
                          </NavigationMenuLink>
                        </TooltipTrigger>
                      </Tooltip>
                    </NavigationMenuItem>
                  ) : null;
                })}
              </TooltipProvider>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {data?.data?.email ? (
            <>
              {/* <CartButton count={3} /> */}
              {data?.data?.role === role.USER && <CartButton count={3} />}
              <UserMenu />
              {/* logout */}
              <Button
                onClick={handleLogout}
                // variant="outline"
                className="bg-violet-700 hover:bg-violet-800 dark:bg-violet-200 dark:hover:bg-violet-300 text-white dark:text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg transition-all"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                className="bg-violet-700 hover:bg-violet-800 dark:bg-violet-200 dark:hover:bg-violet-300 text-white dark:text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg transition-all"
              >
                <Link to="/login">Login</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
