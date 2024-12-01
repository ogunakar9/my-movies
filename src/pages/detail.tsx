import React from 'react';

import { useParams } from 'react-router-dom';

const Detail = () => {
  const { imdbID } = useParams();
  console.log('imdbID', imdbID);

  return <div>{imdbID}</div>;
};

export default Detail;
