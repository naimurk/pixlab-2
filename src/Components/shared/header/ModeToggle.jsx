import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../../ui/button";

export default function ModeToggle() {
  // Initialize theme state from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  // Toggle theme between 'light' and 'dark'
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Effect to apply the theme to the document body and persist it
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <Button
      variant="outline"
      size="icon"
      className="dark:bg-gray-950 dark:text-white  border-none"
      onClick={toggleTheme}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
