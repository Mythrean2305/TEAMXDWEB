import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ThemeColors {
  bg: string;
  text: string;
  border: string;
  accent1: string;
  accent2: string;
  muted: string;
  secondaryBg: string;
  inputBorder: string;
  secondaryBtnBg: string;
  secondaryBtnText: string;
  secondaryBtnHover: string;
}

interface Theme {
  name: string;
  colors: ThemeColors;
}

const themes: Theme[] = [
  { 
    name: 'Matrix', 
    colors: { bg: '#0a0a0a', text: '#00ff7f', border: '#00ff7f', accent1: '#ff00c1', accent2: '#00fff9', muted: '#ccc', secondaryBg: '#111', inputBorder: '#6b7280', secondaryBtnBg: '#4b5563', secondaryBtnText: '#ffffff', secondaryBtnHover: '#6b7280' } 
  },
  { 
    name: 'Amber', 
    colors: { bg: '#1a1000', text: '#ffb800', border: '#ffb800', accent1: '#ff5733', accent2: '#33c1ff', muted: '#d1d1d1', secondaryBg: '#2a2010', inputBorder: '#8c7a61', secondaryBtnBg: '#6b5632', secondaryBtnText: '#ffffff', secondaryBtnHover: '#8c7a61' } 
  },
  { 
    name: 'Arctic', 
    colors: { bg: '#051a24', text: '#00e0ff', border: '#00e0ff', accent1: '#f038ff', accent2: '#33ff8a', muted: '#b0c4de', secondaryBg: '#0f2f3a', inputBorder: '#5a7f8e', secondaryBtnBg: '#1e495c', secondaryBtnText: '#ffffff', secondaryBtnHover: '#3b6978' } 
  },
  { 
    name: 'Hot Pink', 
    colors: { bg: '#1f001f', text: '#ff00c1', border: '#ff00c1', accent1: '#00fff9', accent2: '#f0ff00', muted: '#f5d6f5', secondaryBg: '#3a0f3a', inputBorder: '#8e5a8e', secondaryBtnBg: '#6d226d', secondaryBtnText: '#ffffff', secondaryBtnHover: '#8e5a8e' } 
  },
];

interface ThemeContextType {
  theme: Theme;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeIndex, setThemeIndex] = useState(0);

  const cycleTheme = () => {
    setThemeIndex(prevIndex => (prevIndex + 1) % themes.length);
  };
  
  const theme = themes[themeIndex];

  return (
    <ThemeContext.Provider value={{ theme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
