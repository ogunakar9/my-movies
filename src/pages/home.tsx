import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import GithubCorner from '@/components/github-corner';
import Filters from '@/components/views/filters';
import Table from '@/components/views/table';
import api from '@/features/film/api';
import {
  getFilmsWithParameters,
  selectError,
  selectFilmData,
  selectStatus
} from '@/features/film/slice';
import { type IFilmData, type IFilmDataState } from '@/lib/types/film';

const Home = () => {
  const dispatch = useAppDispatch();
  const filmData = useAppSelector(selectFilmData);
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
      {filmData?.Search ? <Table /> : undefined}
      {/* <Table /> */}
    </div>
  );
};

export default Home;
