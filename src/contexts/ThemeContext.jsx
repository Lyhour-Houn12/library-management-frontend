import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { themes, getTheme } from "../config/theme";

const ThemeContext = createContext();

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("app-theme");
    return savedTheme && themes[savedTheme] ? savedTheme : "light"; // ✅ was "main"
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // ✅ Apply CSS variables from theme
  useEffect(() => {
    const theme = themes[currentTheme] || themes.light; // ✅ fallback added
    const root = document.documentElement;

    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    localStorage.setItem("app-theme", currentTheme);
    document.body.className = `theme-${currentTheme}`;
  }, [currentTheme]);

  const switchTheme = (themeName) => {
    if (!themes[themeName]) {
      console.error(`Theme "${themeName}" does not exist`);
      return;
    }

    setIsTransitioning(true);
    document.body.classList.add("theme-transitioning");
    setCurrentTheme(themeName);

    setTimeout(() => {
      setIsTransitioning(false);
      document.body.classList.remove("theme-transitioning");
    }, 300);
  };

  const cycleTheme = () => {
    const themeNames = Object.keys(themes);
    const currentIndex = themeNames.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeNames.length;
    switchTheme(themeNames[nextIndex]);
  };

  const value = {
    currentTheme,
    theme: getTheme(currentTheme),
    themes,
    switchTheme,
    cycleTheme,
    isTransitioning,
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={getTheme(currentTheme)}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
