import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root')!);
Promise.resolve().then(() => console.log('try2'))

root.render(<App />);
Promise.resolve().then(() => console.log('try'))
// console.log('index')