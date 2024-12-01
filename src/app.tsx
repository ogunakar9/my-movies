import React from 'react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import Home from '@/pages/home';

function App() {
  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      <Navbar />
      <main className='flex h-full flex-col items-center'>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;
