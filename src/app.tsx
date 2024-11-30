import React from 'react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Home from '@/pages/home';
import RootProvider from '@/providers/root';

function App() {
  return (
    <RootProvider>
      <Navbar />
      <main className='flex h-full flex-col items-center justify-center'>
        <Home />
      </main>
      <Footer />
    </RootProvider>
  );
}

export default App;
