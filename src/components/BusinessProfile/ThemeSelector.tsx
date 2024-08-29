import React from 'react';
import { Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from '@mui/material';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    onThemeChange(event.target.value as string);
  };

  return (
    <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="theme-selector-label">Select Your Theme</InputLabel>
        <Select labelId="theme-selector-label"value={currentTheme}onChange={handleThemeChange}label="Select Your Theme">
            <MenuItem value="light">Light Theme</MenuItem>
            <MenuItem value="dark">Dark Theme</MenuItem>
            <MenuItem value="nature">Nature Theme</MenuItem>
            <MenuItem value="cyberpunk">Cyberpunk Theme</MenuItem>
            <MenuItem value="pastel">Pastel Theme</MenuItem>
            <MenuItem value="goldBlack">Gold and Black Theme</MenuItem>
            <MenuItem value="minimalisticGray">Minimalistic Gray Theme</MenuItem>
        </Select>
    </FormControl>
    );
    };

export default ThemeSelector;
