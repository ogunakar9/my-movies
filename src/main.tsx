import '@/styles/global.scss';
import '@/styles/global.css';

import React from 'react';

import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from '@/app';
import Detail from '@/pages/detail';
import NotFoundPage from '@/pages/not-found';

import RootProvider from './providers/root';

const container = document.querySelector('#root');
const root = createRoot(container as HTMLElement);

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/film-detail/:imdbID',
    element: <Detail />,
    errorElement: <NotFoundPage />
  }
]);

root.render(
  <React.StrictMode>
    <RootProvider>
      <RouterProvider router={router} />
    </RootProvider>
  </React.StrictMode>
);
