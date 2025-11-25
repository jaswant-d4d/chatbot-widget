import { useEffect, useState } from "react";

type ThemeType = "light" | "dark" | "auto";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeType>(
    (localStorage.getItem("theme") as ThemeType) || "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "auto") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(prefersDark ? "dark" : "light");
    } else {
      root.classList.add(theme);
    }

    // ✅ Always keep localStorage in sync
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
