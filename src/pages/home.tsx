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
} from '@/features/film/film-slice';
import { type IFilmData, type IFilmDataState } from '@/lib/types/film';

const Home = () => {
  const [data, setData] = useState<IFilmData[]>([]);

  const dispatch = useAppDispatch();
  const filmData = useAppSelector(selectFilmData);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  useEffect(() => {
    setData([
      {
        Title: 'Pokémon: Detective Pikachu',
        Year: '2019',
        imdbID: 'tt5884052',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BNDU4Mzc3NzE5NV5BMl5BanBnXkFtZTgwMzE1NzI1NzM@._V1_SX300.jpg'
      },
      {
        Title: 'Pokémon',
        Year: '1997–2023',
        imdbID: 'tt0168366',
        Type: 'series',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMzE0ZDU1MzQtNTNlYS00YjNlLWE2ODktZmFmNDYzMTBlZTBmXkEyXkFqcGc@._V1_SX300.jpg'
      },
      {
        Title: 'Pokémon: The First Movie - Mewtwo Strikes Back',
        Year: '1998',
        imdbID: 'tt0190641',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BNDg0ZDk2N2QtZDQzYi00ZTljLWExODgtZWQ2Y2YzZTA1NjVjXkEyXkFqcGc@._V1_SX300.jpg'
      },
      {
        Title: 'Pokémon the Movie 2000',
        Year: '1999',
        imdbID: 'tt0210234',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BOTE0NzY5MGUtZDdjMi00OTMyLThiYmEtOTc5NWY0NTE3NDA0XkEyXkFqcGc@._V1_SX300.jpg'
      },
      {
        Title: 'Pokémon 3 the Movie: Spell of the Unown',
        Year: '2000',
        imdbID: 'tt0235679',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMTk0NzM3MDY1OV5BMl5BanBnXkFtZTYwNTkwODc5._V1_SX300.jpg'
      },
      {
        Title: 'Pokemon 4Ever: Celebi - Voice of the Forest',
        Year: '2001',
        imdbID: 'tt0287635',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BNTFiNWM2ZTMtY2I1MS00Y2M1LWE5MTgtZTI5MTkxZGFiYzdhXkEyXkFqcGc@._V1_SX300.jpg'
      },
      {
        Title: 'Pokémon the Movie: I Choose You!',
        Year: '2017',
        imdbID: 'tt6595896',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BYTI5M2RmMWUtOGFlMC00M2YxLThiZjUtMjZkNjI3NWQ5NjkwXkEyXkFqcGc@._V1_SX300.jpg'
      },
      {
        Title: 'Pokémon Heroes',
        Year: '2002',
        imdbID: 'tt0347791',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BYWJlMGQxNDYtZTc5NC00MzlhLWI1MTItZmU1NjY1MTRlZjFjXkEyXkFqcGc@._V1_SX300.jpg'
      },
      {
        Title: 'Pokémon: Mewtwo Strikes Back - Evolution',
        Year: '2019',
        imdbID: 'tt8856470',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BZDY0NmYyNmYtZDdjYy00M2IyLThiNjctZGYwN2EzNmIzN2I1XkEyXkFqcGc@._V1_SX300.jpg'
      },
      {
        Title: 'Pokémon: Lucario and the Mystery of Mew',
        Year: '2005',
        imdbID: 'tt0875609',
        Type: 'movie',
        Poster:
          'https://m.media-amazon.com/images/M/MV5BMTUxOTcwNjAwMl5BMl5BanBnXkFtZTgwMjc2MzQ2NjE@._V1_SX300.jpg'
      }
    ]);
  }, []);

  // useEffect(() => {
  //   void dispatch(getFilmsWithParameters());
  // }, [dispatch]);

  // if (status === 'loading') return <p>Loading...</p>;
  // if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className='w-full p-4'>
      <GithubCorner title='Get started on GitHub' url='https://www.github.com/ogunakar9' />
      <Filters />
      {/* {filmData?.Search ? <Table dataProp={filmData.Search} /> : undefined} */}
      <Table dataProp={data} />
    </div>
  );
};

export default Home;
