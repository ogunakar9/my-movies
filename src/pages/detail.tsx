import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Rating } from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';
import api from '@/features/film/api';
import { type IFilmDetailData } from '@/lib/types/film';

const Detail: React.FC<IFilmDetailData> = () => {
  const { imdbID } = useParams();
  const [data, setData] = React.useState<IFilmDetailData[]>([]);
  console.log('imdbID', imdbID);

  const movie = {
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
  //   api
  //     .get('/', {
  //       params: {
  //         s: '',
  //         y: '',
  //         type: '',
  //         page: 1,
  //         i: imdbID
  //       }
  //     })
  //     .then((response) => {
  //       const data = response.data as IFilmDetailData;
  //       console.log('data', data);
  //       // setData(data.Search);
  //       return true;
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <div className='flex flex-col items-center p-6'>
      <Card className='w-full max-w-4xl'>
        <CardHeader>
          <h1 className='text-center text-2xl font-bold'>{movie.Title}</h1>
          <p className='text-center text-sm text-muted-foreground'>{movie.Year}</p>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-6 lg:flex-row'>
            {/* Poster */}
            <div className='flex-shrink-0'>
              <img
                src={movie.Poster}
                alt={movie.Title}
                className='w-full max-w-sm rounded-lg shadow-md'
              />
            </div>

            {/* Movie Details */}
            <div className='flex-1 space-y-4'>
              {/* Plot */}
              <div>
                <h2 className='text-xl font-semibold'>Plot</h2>
                <p className='text-muted-foreground'>{movie.Plot}</p>
              </div>
              <Separator />
              {/* Details */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='font-semibold'>Director:</p>
                  <p className='text-muted-foreground'>{movie.Director}</p>
                </div>
                <div>
                  <p className='font-semibold'>Writer:</p>
                  <p className='text-muted-foreground'>{movie.Writer}</p>
                </div>
                <div>
                  <p className='font-semibold'>Cast:</p>
                  <p className='text-muted-foreground'>{movie.Actors}</p>
                </div>
                <div>
                  <p className='font-semibold'>Genre:</p>
                  <p className='text-muted-foreground'>{movie.Genre}</p>
                </div>
                <div>
                  <p className='font-semibold'>Language:</p>
                  <p className='text-muted-foreground'>{movie.Language}</p>
                </div>
                <div>
                  <p className='font-semibold'>Country:</p>
                  <p className='text-muted-foreground'>{movie.Country}</p>
                </div>
                <div>
                  <p className='font-semibold'>Runtime:</p>
                  <p className='text-muted-foreground'>{movie.Runtime}</p>
                </div>
                <div>
                  <p className='font-semibold'>Box Office:</p>
                  <p className='text-muted-foreground'>{movie.BoxOffice}</p>
                </div>
                <div>
                  <p className='font-semibold'>IMDb Rating:</p>
                  <Rating
                    rating={(Number.parseInt(movie.imdbRating) / 10) * 5}
                    totalStars={5}
                    size={24}
                    variant='yellow'
                    disabled={true}
                  />
                  <p className='text-muted-foreground'>{movie.imdbRating}</p>
                </div>
                <div>
                  <p className='font-semibold'>IMDb Votes:</p>
                  <p className='text-muted-foreground'>{movie.imdbVotes}</p>
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
