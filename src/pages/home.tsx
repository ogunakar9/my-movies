import React, { useEffect, useState } from 'react';

import Counter from '@/components/counter';
import GithubCorner from '@/components/github-corner';
import Table from '@/components/views/table';
import api from '@/features/film/api';
import { type IFilmData, type IFilmDataState } from '@/lib/types/film';

const Home = () => {
  const [data, setData] = useState<IFilmData[]>([] as IFilmData[]);

  useEffect(() => {
    api
      .get('/', {
        params: {
          s: 'Pokemon',
          y: '',
          type: '',
          page: 1
        }
      })
      .then((response) => {
        const data = response.data as IFilmDataState;
        setData(data.Search);
        return true;
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <GithubCorner title='Get started on GitHub' url='https://www.github.com/ogunakar9' />
      {/* <Counter /> */}
      <Table dataProp={data} />
    </div>
  );
};

export default Home;
