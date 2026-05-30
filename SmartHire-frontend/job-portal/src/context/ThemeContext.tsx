import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type ThemeContextType = {

  darkMode: boolean;

  toggleTheme: () => void;
};

const ThemeContext =
  createContext<ThemeContextType | null>(
    null
  );

export function ThemeProvider({

  children,

}: {

  children: React.ReactNode;
}) {

  const [darkMode,
  setDarkMode] =
    useState(() => {

      const storedTheme =
        localStorage.getItem(
          'darkMode'
        );

      return storedTheme !== null

        ? JSON.parse(storedTheme)

        : true;
    });

  useEffect(() => {

    localStorage.setItem(

      'darkMode',

      JSON.stringify(darkMode)
    );

    document.body.className =

      darkMode

        ? 'dark-theme'

        : 'light-theme';

  }, [darkMode]);

  const toggleTheme = () => {

    setDarkMode(!darkMode);
  };

  return (

    <ThemeContext.Provider

      value={{
        darkMode,
        toggleTheme,
      }}
    >

      {children}

    </ThemeContext.Provider>
  );
}

export function useTheme() {

  const context =
    useContext(ThemeContext);

  if (!context) {

    throw new Error(
      'useTheme must be used inside ThemeProvider'
    );
  }

  return context;
}