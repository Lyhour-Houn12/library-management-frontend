/**
 * Theme Configuration
 * Author: Ashok Zarmariya
 */

import { createTheme } from "@mui/material/styles";

export const themeConfigs = {
  light: {
    name: "Light",
    palette: {
      mode: "light",
      primary: { main: "#4F46E5" },
      secondary: { main: "#82589F", contrastText: "#fff" },
      success: { main: "#2ed573", contrastText: "#fff" },
      error: { main: "#ff4757" },
      background: { default: "#ffffff", paper: "#f9fafb", paper2: "#FF0000" },
      text: { primary: "#111827", secondary: "#6b7280" },
    },
  },

  dark: {
    name: "Dark",
    palette: {
      mode: "dark",
      primary: { main: "#818CF8" },
      secondary: { main: "#a78bfa", contrastText: "#fff" },
      success: { main: "#2ed573", contrastText: "#fff" },
      error: { main: "#ff6b81" },
      background: { default: "#0f172a", paper: "#1e293b" },
      text: { primary: "#f9fafb", secondary: "#9ca3af" },
    },
  },
  ocean: {
    name: "Ocean",
    palette: {
      mode: "light",
      primary: { main: "#0891b2" },
      secondary: { main: "#0e7490", contrastText: "#fff" },
      success: { main: "#2ed573", contrastText: "#fff" },
      error: { main: "#ff4757" },
      background: { default: "#f0fdff", paper: "#e0f7fa" },
      text: { primary: "#0c4a6e", secondary: "#0e7490" },
    },
  },
  forest: {
    name: "Forest",
    palette: {
      mode: "light",
      primary: { main: "#15803d" },
      secondary: { main: "#4d7c0f", contrastText: "#fff" },
      success: { main: "#2ed573", contrastText: "#fff" },
      error: { main: "#ff4757" },
      background: { default: "#f7fdf7", paper: "#ecfdf3" },
      text: { primary: "#14532d", secondary: "#3f6212" },
    },
  },
  sunset: {
    name: "Sunset",
    palette: {
      mode: "light",
      primary: { main: "#ea580c" },
      secondary: { main: "#db2777", contrastText: "#fff" },
      success: { main: "#2ed573", contrastText: "#fff" },
      error: { main: "#ff4757" },
      background: { default: "#fff7ed", paper: "#ffedd5" },
      text: { primary: "#7c2d12", secondary: "#9a3412" },
    },
  },
};

export const getTheme = (themeKey = "light") => {
  const config = themeConfigs[themeKey] || themeConfigs.light;
  return createTheme(config);
};

// For non-MUI CSS variable usage — keys must match themeConfigs keys
export const themes = {
  light: {
    name: "Light",
    colors: {
      primary: "#4F46E5",
      secondary: "#d2dae2",
      success: "#2ed573",
      danger: "#ff4757",
      background: "#ffffff",
      backgroundSecondary: "#f9fafb",
      backgroundTertiary: "#f3f4f6",
      textPrimary: "#111827",
      textSecondary: "#6b7280",
      textTertiary: "#9ca3af",
      border: "#e5e7eb",
      borderSecondary: "#d1d5db",
      card: "#ffffff",
      cardHover: "#f9fafb",
      input: "#ffffff",
      inputBorder: "#d1d5db",
      inputFocus: "#4F46E5",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
  },
  dark: {
    name: "Dark",
    colors: {
      primary: "#818CF8",
      secondary: "#374151",
      success: "#2ed573",
      danger: "#ff6b81",
      background: "#0f172a",
      backgroundSecondary: "#1e293b",
      backgroundTertiary: "#334155",
      textPrimary: "#f9fafb",
      textSecondary: "#9ca3af",
      textTertiary: "#6b7280",
      border: "#334155",
      borderSecondary: "#475569",
      card: "#1e293b",
      cardHover: "#334155",
      input: "#1e293b",
      inputBorder: "#475569",
      inputFocus: "#818CF8",
      overlay: "rgba(0, 0, 0, 0.7)",
    },
  },
  ocean: {
    name: "Ocean",
    colors: {
      primary: "#0891b2",
      secondary: "#a5f3fc",
      success: "#2ed573",
      danger: "#ff4757",
      background: "#f0fdff",
      backgroundSecondary: "#e0f7fa",
      backgroundTertiary: "#cffafe",
      textPrimary: "#0c4a6e",
      textSecondary: "#0e7490",
      textTertiary: "#0891b2",
      border: "#a5f3fc",
      borderSecondary: "#67e8f9",
      card: "#ffffff",
      cardHover: "#e0f7fa",
      input: "#ffffff",
      inputBorder: "#67e8f9",
      inputFocus: "#0891b2",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
  },
  forest: {
    name: "Forest",
    colors: {
      primary: "#15803d",
      secondary: "#bbf7d0",
      success: "#2ed573",
      danger: "#ff4757",
      background: "#f7fdf7",
      backgroundSecondary: "#ecfdf3",
      backgroundTertiary: "#dcfce7",
      textPrimary: "#14532d",
      textSecondary: "#3f6212",
      textTertiary: "#4d7c0f",
      border: "#bbf7d0",
      borderSecondary: "#86efac",
      card: "#ffffff",
      cardHover: "#ecfdf3",
      input: "#ffffff",
      inputBorder: "#86efac",
      inputFocus: "#15803d",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
  },
  sunset: {
    name: "Sunset",
    colors: {
      primary: "#ea580c",
      secondary: "#fbcfe8",
      success: "#2ed573",
      danger: "#ff4757",
      background: "#fff7ed",
      backgroundSecondary: "#ffedd5",
      backgroundTertiary: "#fed7aa",
      textPrimary: "#7c2d12",
      textSecondary: "#9a3412",
      textTertiary: "#c2410c",
      border: "#fed7aa",
      borderSecondary: "#fdba74",
      card: "#ffffff",
      cardHover: "#ffedd5",
      input: "#ffffff",
      inputBorder: "#fdba74",
      inputFocus: "#ea580c",
      overlay: "rgba(0, 0, 0, 0.5)",
    },
  },
};

export const themeKeys = Object.keys(themes);
