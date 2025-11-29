import React, { createContext, useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

// Create a Context for the theme
const ThemeContext = createContext();

// Define the colors for light and dark modes
const themes = {
  light: {
    primary: "rgb(0, 100, 0)",
    default: "rgb(0, 100, 0)",
    secondary: "#d32f2f",
    background: "#f5f5f5", // Light gray background for the main page
    cardBackground: "#ffffff", // White background for cards
    text: "#24264a",
    textsecondary: "#fff",
    light: "rgba(20, 252, 155, 0.2)",
  },
  dark: {
    primary: "#e0f4ff",
    default: "rgb(0, 100, 0)",
    secondary: "rgb(0, 100, 0",
    background: "#071932", // Darker background for main body
    cardBackground: "linear-gradient( #001027 32%, #000000 73%)", // Slightly lighter background for cards
    text: "#ababab",
    textsecondary: "#fff",
    light: "rgba(20, 252, 155, 0.2)",
  },
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light"); // Default to dark mode

  // Update body background color when theme changes
  useEffect(() => {
    document.body.style.backgroundColor = themes[mode].background;
    document.body.style.color = themes[mode].text;
  }, [mode]);

  // Define MUI theme
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: themes[mode].primary,
        default: themes[mode].default,
        light: themes[mode].light,
      },
      secondary: { main: themes[mode].secondary },

      background: {
        default: themes[mode].background, // Main background
        paper: themes[mode].cardBackground, // Card background
      },
      text: { primary: themes[mode].text, paper: themes[mode].textsecondary },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: themes[mode].cardBackground,
            color: themes[mode].text,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
            borderRadius: "8px",
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            color: themes[mode].text, // Text color for pagination
          },
          select: {
            color: themes[mode].text,
            backgroundColor: themes[mode].cardBackground, // Background for dropdown
          },
          selectIcon: {
            color: themes[mode].text, // Dropdown arrow color
          },
          menuItem: {
            color: themes[mode].text,
            backgroundColor: themes[mode].cardBackground,
            "&:hover": {
              backgroundColor: themes[mode].primary, // Hover effect
              color: themes[mode].textsecondary,
            },
          },
          actions: {
            color: themes[mode].text, // Pagination buttons
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            color: themes[mode].text,
            backgroundColor: themes[mode].cardBackground,
            "&:hover": {
              backgroundColor: themes[mode].primary,
              color: themes[mode].textsecondary,
            },
          },
          icon: {
            color: themes[mode].text,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: themes[mode].background,
            color: themes[mode].text,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            outline: "none",
            "&:focus": { outline: "none" },
            "&:focus-visible": { outline: "none", boxShadow: "none" },
            "&.Mui-focusVisible": { boxShadow: "none" },
          },
        },
      },
    },
  });

  // Function to toggle between light and dark modes
  const toggleTheme = () =>
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
