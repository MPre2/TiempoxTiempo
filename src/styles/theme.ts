export type ThemeType = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  shadows: {
    main: string;
  };
  borderRadius: string;
};

export const lightTheme: ThemeType = {
  colors: {
    primary: '#1E90FF',
    secondary: '#f50057',
    background: 'linear-gradient(to bottom, #87CEEB, #1E90FF)',
    surface: 'rgba(255, 255, 255, 0.9)',
    text: '#333333',
    textSecondary: '#666666',
    border: '#dddddd'
  },
  shadows: {
    main: '0 0 20px rgba(0, 0, 0, 0.1)'
  },
  borderRadius: '10px'
};

export const darkTheme: ThemeType = {
  colors: {
    primary: '#1976D2',
    secondary: '#d32f2f',
    background: 'linear-gradient(to bottom, #1a1a1a, #2c3e50)',
    surface: 'rgba(33, 33, 33, 0.95)',
    text: '#ffffff',
    textSecondary: '#cccccc',
    border: '#444444'
  },
  shadows: {
    main: '0 0 20px rgba(0, 0, 0, 0.3)'
  },
  borderRadius: '10px'
};