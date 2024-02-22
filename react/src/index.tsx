import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeContext } from './context';
import { RouterProvider } from 'react-router-dom'
import router from './Router';
import Concurrent from './components/Concurrent';

const root = createRoot(document.getElementById('root')!);

root.render(
    <App />
);

// Keep alive demo
// root.render(
//     < RouterProvider router={router} />
// );

// root.render(
//     <Concurrent />
// );