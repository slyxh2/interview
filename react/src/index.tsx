import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeContext } from './context';

const root = createRoot(document.getElementById('root')!);

root.render(
    <ThemeContext.Provider value='dark'>
        <App />
    </ThemeContext.Provider>
);
