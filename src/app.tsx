import React from 'react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Home from '@/pages/home';

function App() {
  return (
    <>
      <Navbar />
      <main className='flex h-full flex-col items-center justify-center'>
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
