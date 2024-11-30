import React from 'react';

import Counter from '@/components/counter';
import GithubCorner from '@/components/github-corner';

const Home = () => {
  return (
    <div>
      <GithubCorner title='Get started on GitHub' url='https://www.github.com/ogunakar9' />
      <Counter />
    </div>
  );
};

export default Home;
