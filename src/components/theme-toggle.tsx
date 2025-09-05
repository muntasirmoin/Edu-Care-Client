"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { Toggle } from "./ui/toggle";
import { useContext } from "react";
import { ThemeProviderContext } from "@/context/theme.context";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeProviderContext);

  return (
    <div>
      <Toggle
        role="switch"
        aria-checked={theme === "dark"}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        variant="outline"
        className="
          group size-10 rounded-full border-none shadow-none cursor-pointer
          transition-all duration-200
          bg-violet-100 dark:bg-violet-700/30
          hover:bg-violet-200 dark:hover:bg-violet-700
          data-[state=on]:bg-violet-700 dark:data-[state=on]:bg-violet-200
          data-[state=on]:hover:bg-violet-800/80 dark:data-[state=on]:hover:hover:bg-violet-300/30
        "
        pressed={theme === "dark"}
        onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <MoonIcon
          size={18}
          className="
            shrink-0 scale-0 opacity-0 transition-all duration-200
            group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100
            text-violet-900 dark:text-violet-800
          "
          aria-hidden="true"
        />
        <SunIcon
          size={18}
          className="
            absolute shrink-0 scale-100 opacity-100 transition-all duration-200
            group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0
            text-violet-800/80 dark:text-violet-100
          "
          aria-hidden="true"
        />
      </Toggle>
    </div>
  );
}
