/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Minus, Plus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getSidebarItems } from "@/utils/getSidebarItems";

// import Logo from "@/assets/icons/Logo";
import { useUserInfoQuery } from "@/redux/features/User/user.api";
import { useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userInfo } = useUserInfoQuery(undefined);

  const location = useLocation();
  const data = {
    navMain: getSidebarItems(userInfo?.data?.role),
  };

  // const role = userInfo?.data?.role;

  const LogoImage = `https://res.cloudinary.com/dta2gcxsl/image/upload/v1757134951/logoEducare-Photoroom_nkm3rp.png`;

  return (
    <Sidebar {...props}>
      <SidebarHeader
        className="flex items-center h-18 border-b px-4 sticky top-0  border-violet-200 dark:border-violet-700 transition-colors duration-300
      bg-gradient-to-r from-violet-50/80 via-violet-100/70 to-violet-50/80 dark:from-violet-900/80 dark:via-violet-800/70 dark:to-violet-900/80"
      >
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className="flex items-center gap-3 p-0.5 border-violet-200 dark:border-violet-700 transition-colors duration-300
      bg-gradient-to-r from-violet-50/80 via-violet-100/70 to-violet-50/80 dark:from-violet-900/80 dark:via-violet-800/70 dark:to-violet-900/80 rounded-lg shadow-sm w-full"
            >
              {/* Logo on the left */}
              <img
                src={LogoImage}
                alt="EduCare Logo"
                className="h-10 w-10 ml-1.5 md:h-12 md:w-12 object-contain flex-shrink-0 dark:invert"
              />

              {/* Name on the right */}
              <span className="font-semibold mr-1.5 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-violet-700 rounded-md px-3 py-1 text-sm md:text-base truncate w-full">
                {userInfo?.data?.name || "Admin User"}
              </span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        {/* <SearchForm /> */}
      </SidebarHeader>
      {/* <SelectSeparator /> */}
      <SidebarContent
        className="flex items-center h-18 border-b px-4 sticky top-0  border-violet-200 dark:border-violet-700 transition-colors duration-300
      bg-gradient-to-r from-violet-50/80 via-violet-100/70 to-violet-50/80 dark:from-violet-900/80 dark:via-violet-800/70 dark:to-violet-900/80"
      >
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item: any) => (
              <Collapsible
                key={item.title}
                defaultOpen={item.items.some(
                  (subItem: any) => location.pathname === subItem.url
                )}
                className="group/collapsible"
              >
                <SidebarMenuItem className="font-bold">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="dark:hover:bg-violet-100 dark:hover:text-black hover:bg-violet-200">
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden cursor-pointer" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden cursor-pointer" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item: any) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              className="dark:hover:bg-violet-100 dark:hover:text-black hover:bg-violet-200"
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
