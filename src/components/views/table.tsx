import React, { useEffect } from 'react';

import type { IFilmData } from '@/lib/types/film';
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

  const table = useReactTable({
    data: filmData.Search || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true
  });

  const handlePageChange = (increment: number) => {
    dispatch(updateFilters({ page: filters.page + increment }));
    void dispatch(getFilmsWithParameters());
  };

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
