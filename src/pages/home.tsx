import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import GithubCorner from '@/components/github-corner';
import Filters from '@/components/views/filters';
import Table from '@/components/views/table';
import { getFilmsWithParameters, selectError, selectStatus } from '@/features/film/slice';

const Home = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  useEffect(() => {
    void dispatch(getFilmsWithParameters());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className='w-full p-4'>
      <GithubCorner title='Get started on GitHub' url='https://www.github.com/ogunakar9' />
      <Filters />
      <Table />
    </div>
  );
};

export default Home;
