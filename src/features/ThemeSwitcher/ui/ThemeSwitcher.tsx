import React from 'react';
import { useTheme } from '../../../shared/lib/theme/useTheme';
import { Button } from '../../../shared/ui/Button/Button';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
};

