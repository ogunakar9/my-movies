import React, { useEffect, useState } from 'react';

import type { ColumnDef } from '@tanstack/react-table';

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  getFilmsWithParameters,
  selectFilmData,
  selectFilters,
  updateFilters
} from '@/features/film/slice';
import { type IFilmData, type IFilmDataState } from '@/lib/types/film';

const DataTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filmData = useAppSelector(selectFilmData);
  const filters = useAppSelector(selectFilters);

  const columns: ColumnDef<IFilmData>[] = [
    {
      accessorKey: 'Poster',
      header: 'Poster',
      cell: ({ row }) => (
        <img src={row.original.Poster} alt={row.original.Title} className='h-16 w-auto' />
      )
    },
    { accessorKey: 'Title', header: 'Title' },
    { accessorKey: 'imdbID', header: 'IMDB ID' },
    { accessorKey: 'Year', header: 'Release Date' },
    { accessorKey: 'Type', header: 'Type' }
  ];
  const [data, setData] = useState<IFilmData[]>([]);
  // const table = useReactTable({
  //   data: filmData.Search || [],
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  //   manualPagination: true
  // });

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true
  });

  const handlePageChange = (increment: number) => {
    dispatch(updateFilters({ page: filters.page + increment }));
    void dispatch(getFilmsWithParameters());
  };

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

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter by title...'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(updateFilters({ s: event.target.value, page: 1 }))
          }
          className='max-w-sm'
        />
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {/* TODO: remove */}
            {data ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className='cursor-pointer'
                  onClick={() => navigate(`/film-detail/${row.original.imdbID}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}

            {filmData.Search?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className='cursor-pointer'
                  onClick={() => navigate(`/film-detail/${row.original.imdbID}`)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button variant='outline' onClick={() => handlePageChange(-1)} disabled={filters.page <= 1}>
          Previous
        </Button>
        <span>{filters.page}</span>
        <Button
          variant='outline'
          onClick={() => handlePageChange(1)}
          // disabled={!filters.hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
