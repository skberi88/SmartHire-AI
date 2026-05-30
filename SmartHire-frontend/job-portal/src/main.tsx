import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import './index.css';

import {
  BrowserRouter,
} from 'react-router-dom';

import '@mantine/core/styles.css';

import {
  MantineProvider,
} from '@mantine/core';

import {
  AuthProvider,
} from './context/AuthContext.tsx';

import {
  ThemeProvider,
} from './context/ThemeContext.tsx';

ReactDOM.createRoot(

  document.getElementById('root')!

).render(

  <React.StrictMode>

    <ThemeProvider>

      <AuthProvider>

        <BrowserRouter>

          <MantineProvider>

            <App />

          </MantineProvider>

        </BrowserRouter>

      </AuthProvider>

    </ThemeProvider>

  </React.StrictMode>
);