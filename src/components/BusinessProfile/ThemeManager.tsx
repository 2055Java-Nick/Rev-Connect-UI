import React, { createContext, useState, useContext } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Select, MenuItem } from '@mui/material';

interface ThemeManagerProps {
  children: React.ReactNode;
}
interface ThemeContextProps {
    themeName: string;
    setThemeName: (theme: string) => void;
  }
  
  const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
  
  export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };
const ThemeManager: React.FC<ThemeManagerProps> = ({ children }) => {
    const [themeName, setThemeName] = useState('light');

    const handleThemeChange = (event: any) => {
        setThemeName(event.target.value);
    };

    const lightTheme = createTheme({
        palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#ffffff',
            paper: '#f5f5f5',
        },
        text: {
            primary: '#000000',
        },
        },
    });

    const darkTheme = createTheme({
        palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#303030',
            paper: '#424242',
        },
        text: {
            primary: '#ffffff',
        },
        },
    });

    const natureTheme = createTheme({
        palette: {
        mode: 'light',
        primary: {
            main: '#388e3c',
        },
        secondary: {
            main: '#8d6e63',
        },
        background: {
            default: '#e8f5e9',
            paper: '#f1f8e9',
        },
        text: {
            primary: '#2e7d32',
            secondary: '#5d4037',
        },
        },
    });

    const cyberpunkTheme = createTheme({
        palette: {
        mode: 'dark',
        primary: {
            main: '#ff3d00',
        },
        secondary: {
            main: '#00e5ff',
        },
        background: {
            default: '#1c1c1c',
            paper: '#212121',
        },
        text: {
            primary: '#ffffff',
            secondary: '#ff3d00',
        },
        },
    });

    const pastelTheme = createTheme({
        palette: {
        mode: 'light',
        primary: {
            main: '#ffb3ba',
        },
        secondary: {
            main: '#bae1ff',
        },
        background: {
            default: '#fef4f4',
            paper: '#fff7e6',
        },
        text: {
            primary: '#ff80ab',
            secondary: '#ba68c8',
        },
        },
    });

    const goldBlackTheme = createTheme({
        palette: {
        mode: 'dark',
        primary: {
            main: '#ffd700',
        },
        secondary: {
            main: '#b8860b',
        },
        background: {
            default: '#000000',
            paper: '#1a1a1a',
        },
        text: {
            primary: '#ffd700',
            secondary: '#ffffff',
        },
        },
    });

    const minimalisticGrayTheme = createTheme({
        palette: {
        mode: 'light',
        primary: {
            main: '#9e9e9e',
        },
        secondary: {
            main: '#616161',
        },
        background: {
            default: '#f5f5f5',
            paper: '#e0e0e0',
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
        },
        },
    });

    const getTheme = (themeName: string) => {
        switch (themeName) {
        case 'dark':
            return darkTheme;
        case 'nature':
            return natureTheme;
        case 'cyberpunk':
            return cyberpunkTheme;
        case 'pastel':
            return pastelTheme;
        case 'goldBlack':
            return goldBlackTheme;
        case 'minimalisticGray':
            return minimalisticGrayTheme;
        default:
            return lightTheme;
        }
    };

    const currentTheme = getTheme(themeName);

    return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
    );
    };

    export default ThemeManager;
