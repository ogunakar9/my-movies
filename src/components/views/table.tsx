import React, { useState } from 'react';

import type { IFilmData } from '@/lib/types/film';
import type { ColumnDef } from '@tanstack/react-table';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';

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
import { type DataTableProperties } from '@/lib/types/film';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

const DataTable: React.FC<DataTableProperties> = ({ dataProp }) => {
  const [filterValue, setFilterValue] = useState('Pokemon');
  const [paginationState, setPaginationState] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  // Updated handlePaginationChange function to handle both value and updater function
  const handlePaginationChange: (
    updaterOrValue: PaginationState | ((old: PaginationState) => PaginationState)
  ) => void = (updaterOrValue) => {
    setPaginationState((previous) => {
      if (typeof updaterOrValue === 'function') {
        return updaterOrValue(previous);
      }
      return updaterOrValue;
    });
  };

  const columns: ColumnDef<IFilmData>[] = [
    {
      accessorKey: 'Poster',
      header: 'Poster',
      cell: ({ row }) => (
        <img src={row.original.Poster} alt={row.original.Title} className='h-16 w-auto' />
      )
    },
    {
      accessorKey: 'Title',
      header: 'Title'
    },
    {
      accessorKey: 'imdbID',
      header: 'IMDB ID'
    },
    {
      accessorKey: 'Year',
      header: 'Release Date'
    },
    {
      accessorKey: 'Type',
      header: 'Type'
    }
  ];

  const table = useReactTable({
    data: dataProp,
    columns,
    state: {
      globalFilter: filterValue,
      pagination: paginationState
    },
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true
  });

  const navigate = useNavigate();

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter by title...'
          value={filterValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFilterValue(event.target.value)
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className='cursor-pointer'
                  onClick={() => {
                    navigate(`/film-detail/${row.original.imdbID}`);
                  }}
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
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataTable;
