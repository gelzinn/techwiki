'use client';

import { useEffect, useState } from "react";

export type ThemeType = "light" | "dark";

export const getTheme = () => {
    if (typeof window === "undefined") return "light";

    const theme = localStorage.getItem("theme") as ThemeType;
    if (theme) return theme;

    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return dark ? "dark" : "light";
};

export const useTheme = () => {
    const [theme, setTheme] = useState<ThemeType>(getTheme());
    
    const toggleTheme = (t?: ThemeType) => {
        const newTheme = t || (theme === "light" ? "dark" : "light");
        setTheme(newTheme);

        localStorage.setItem("theme", newTheme);
        
        if (theme === "light") {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
        }
    };

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handler = () => setTheme(getTheme());

        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", handler);
        return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", handler);
    }, []);

    return {
        theme,
        setTheme,
        toggleTheme
    };
}