import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/');
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center bg-gray-100 text-center dark:bg-gray-900'>
      <div className='max-w-lg'>
        <h1 className='text-6xl font-extrabold text-gray-800 dark:text-neutral-300'>404</h1>
        <p className='mt-4 text-lg text-gray-600'>
          Oops! The page you are looking for does not exist.
        </p>
        <p className='mt-2 text-gray-500'>It might have been removed, or the URL is incorrect.</p>
        <Button variant='outline' className='mt-6' onClick={returnHome}>
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
