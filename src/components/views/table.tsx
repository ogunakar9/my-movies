import React from 'react';

import type { ColumnDef } from '@tanstack/react-table';

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';

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

// Define the film data structure
export interface IFilmData {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const DataTable = ({ dataProp }: { dataProp: IFilmData[] }) => {
  // Define the columns dynamically based on the IFilmData structure
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
      accessorKey: 'Year',
      header: 'Year'
    },
    {
      accessorKey: 'Type',
      header: 'Type'
    }
  ];

  const [filterValue, setFilterValue] = React.useState('');
  const table = useReactTable({
    data: dataProp,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      globalFilter: filterValue
    }
  });

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
                <TableRow key={row.id}>
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
