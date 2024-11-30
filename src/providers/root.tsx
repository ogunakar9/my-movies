import React from 'react';

import type { PropsWithChildren } from 'react';

import { Provider as ReduxProvider } from 'react-redux';

import { store } from '../app/store';
import ThemeProvider from './theme';

type TRootProvider = PropsWithChildren;

export default function RootProvider({ children }: TRootProvider) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </ReduxProvider>
  );
}
