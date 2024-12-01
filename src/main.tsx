import '@/styles/global.scss';
import '@/styles/global.css';

import React from 'react';

import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '@/app';

const container = document.querySelector('#root');
const root = createRoot(container as HTMLElement);

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    errorElement: <App />
  },
  {
    path: '/',
    element: <App />,
    errorElement: <App />
  },
  {
    path: '/film-detail/:id',
    element: <App />,
    errorElement: <App />
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
