import { AppSidebar } from "@/components/app-sidebar";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header
          className="flex items-center h-18 border-b px-4 sticky top-0  border-violet-200 dark:border-violet-700 transition-colors duration-300
      bg-gradient-to-r from-violet-50/80 via-violet-100/70 to-violet-50/80 dark:from-violet-900/80 dark:via-violet-800/70 dark:to-violet-900/80"
        >
          {/* Left side: Sidebar Trigger + Home Button */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <ThemeToggle />
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="bg-violet-700 h-10  hover:bg-violet-800 dark:bg-violet-200 dark:hover:bg-violet-300 text-white dark:text-gray-900 font-bold px-6 py-3 rounded-lg shadow-lg transition-all"
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
            </Button>
          </div>

          {/* Center or right aligned Dashboard title */}
          <div className="flex-1 flex justify-center max-sm:justify-end pointer-events-none px-4 absolute left-0 right-0">
            <h1 className="text-lg md:text-xl font-bold text-rose-500 text-center whitespace-nowrap pointer-events-none">
              Dashboard
            </h1>
          </div>
        </header>

        {/*  */}

        <div className="flex flex-1 flex-col gap-4  dark:bg-violet-900">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
