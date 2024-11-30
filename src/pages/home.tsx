import React, { useEffect } from 'react';

import Counter from '@/components/counter';
import GithubCorner from '@/components/github-corner';
import api from '@/features/film/api';

const Home = () => {
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
        console.log(response.data);
        return response.data as unknown;
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <GithubCorner title='Get started on GitHub' url='https://www.github.com/ogunakar9' />
      <Counter />
    </div>
  );
};

export default Home;
