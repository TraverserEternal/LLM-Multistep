// Create a context object that holds the theme data
import { createContext, FunctionComponent } from "preact";
import { useContext, useEffect, useMemo, useState } from "preact/hooks";
import { defaultTheme, Theme } from "./themes";

// Define the type of the theme context value
type ThemeContextType = {
  theme: Theme;
  setTheme: (newTheme: Theme) => void;
};

// Create a context object with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: (newTheme: Theme) => {},
});

// Create a provider component that wraps your app and provides the theme context
export const ThemeProvider: FunctionComponent = ({ children }) => {
  // Use state to store the current theme (light or dark)
  const [theme, setTheme] = useState(defaultTheme);
  useEffect(() => {
    document.documentElement.setAttribute(
      "style",
      `--theme-primary-color: ${theme.primaryColor};
      --theme-secondary-color: ${theme.secondaryColor};
      --theme-text-color: ${theme.textColor};`
    );
  }, [theme]);
  // Return the provider component with the value prop set to the theme data and the toggle function
  return (
    <ThemeContext.Provider
      value={useMemo(() => ({ theme, setTheme }), [theme, setTheme])}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Create a custom hook that uses the useContext hook to access the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);

  // Check if the context is undefined, which means the hook is used outside of the provider
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  // Return the context value, which contains the theme data and the toggle function
  return context;
};
