import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';
import {
  getFilmDetail,
  selectError,
  selectSelectedFilm,
  selectStatus
} from '@/features/film/slice';
import { type IFilmDetailData } from '@/lib/types/film';

const Detail: React.FC = () => {
  const { imdbID } = useParams();
  const [data, setData] = React.useState<IFilmDetailData[]>([]);

  const dispatch = useAppDispatch();
  // const selectedFilm = useAppSelector(selectSelectedFilm);
  const status = useAppSelector(selectStatus);
  const error = useAppSelector(selectError);

  const selectedFilm = {
    Title: 'Pokémon 3 the Movie: Spell of the Unown',
    Year: '2000',
    Rated: 'G',
    Released: '06 Apr 2001',
    Runtime: '93 min',
    Genre: 'Animation, Action, Adventure',
    Director: 'Kunihiko Yuyama',
    Writer: 'Takeshi Shudô, Hideki Sonoda, Satoshi Tajiri',
    Actors: 'Veronica Taylor, Eric Stuart, Rica Matsumoto',
    Plot: 'In the town of Greenfield, a young, lonely girls dreams and wishes are brought into reality by a collective of reality-warping Pokémon.',
    Language: 'Japanese',
    Country: 'Japan',
    Awards: 'N/A',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTk0NzM3MDY1OV5BMl5BanBnXkFtZTYwNTkwODc5._V1_SX300.jpg',
    Ratings: [
      {
        Source: 'Internet Movie Database',
        Value: '5.8/10'
      }
    ],
    Metascore: 'N/A',
    imdbRating: '5.8',
    imdbVotes: '15,597',
    imdbID: 'tt0235679',
    Type: 'movie',
    DVD: 'N/A',
    BoxOffice: '$17,052,128',
    Production: 'N/A',
    Website: 'N/A',
    Response: 'True'
  };

  // useEffect(() => {
  //   if (imdbID) {
  //     void dispatch(getFilmDetail({ i: imdbID }));
  //   }
  // }, [dispatch, imdbID]);

  // if (status === 'loading') return <p>Loading...</p>;
  // if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div className='flex flex-col items-center p-6'>
      <Card className='w-full max-w-4xl'>
        <CardHeader>
          <h1 className='text-center text-2xl font-bold'>{selectedFilm.Title}</h1>
          <p className='text-center text-sm text-muted-foreground'>{selectedFilm.Year}</p>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-6 lg:flex-row'>
            {/* Poster */}
            <div className='flex-shrink-0'>
              <img
                src={selectedFilm.Poster}
                alt={selectedFilm.Title}
                className='w-full max-w-sm rounded-lg shadow-md'
              />
            </div>

            {/* selectedFilm Details */}
            <div className='flex-1 space-y-4'>
              {/* Plot */}
              <div>
                <h2 className='text-xl font-semibold'>Plot</h2>
                <p className='text-muted-foreground'>{selectedFilm.Plot}</p>
              </div>
              <Separator />
              {/* Details */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='font-semibold'>Director:</p>
                  <p className='text-muted-foreground'>{selectedFilm.Director}</p>
                </div>
                <div>
                  <p className='font-semibold'>Writer:</p>
                  <p className='text-muted-foreground'>{selectedFilm.Writer}</p>
                </div>
                <div>
                  <p className='font-semibold'>Cast:</p>
                  <p className='text-muted-foreground'>{selectedFilm.Actors}</p>
                </div>
                <div>
                  <p className='font-semibold'>Genre:</p>
                  <p className='text-muted-foreground'>{selectedFilm.Genre}</p>
                </div>
                <div>
                  <p className='font-semibold'>Language:</p>
                  <p className='text-muted-foreground'>{selectedFilm.Language}</p>
                </div>
                <div>
                  <p className='font-semibold'>Country:</p>
                  <p className='text-muted-foreground'>{selectedFilm.Country}</p>
                </div>
                <div>
                  <p className='font-semibold'>Runtime:</p>
                  <p className='text-muted-foreground'>{selectedFilm.Runtime}</p>
                </div>
                <div>
                  <p className='font-semibold'>Box Office:</p>
                  <p className='text-muted-foreground'>{selectedFilm.BoxOffice}</p>
                </div>
                <div>
                  <p className='font-semibold'>IMDb Rating:</p>
                  <Rating
                    rating={(Number.parseInt(selectedFilm.imdbRating) / 10) * 5}
                    totalStars={5}
                    size={24}
                    variant='yellow'
                    disabled={true}
                  />
                  <p className='text-muted-foreground'>{selectedFilm.imdbRating}</p>
                </div>
                <div>
                  <p className='font-semibold'>IMDb Votes:</p>
                  <p className='text-muted-foreground'>{selectedFilm.imdbVotes}</p>
                </div>
              </div>
            </div>
          </div>
          <Separator className='my-6' />
          {/* Back Button */}
          <div className='text-center'>
            <Button variant='outline' onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Detail;
