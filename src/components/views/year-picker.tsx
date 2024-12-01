import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getFilmsWithParameters, selectFilters, updateFilters } from '@/features/film/slice';

const YearPicker: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
  const filteredYears = years.filter((year) => year.toString().includes(searchValue));
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const handleYearChange = (year: number | undefined) => {
    setIsOpen(false);
    dispatch(updateFilters({ y: year?.toString(), page: 1 }));
    void dispatch(getFilmsWithParameters());
  };

  return (
    <Popover open={isOpen} onOpenChange={(event) => setIsOpen(event)}>
      <PopoverTrigger asChild>
        <Button variant='outline'>{filters.y ? `Year: ${filters.y}` : 'Select Year'}</Button>
      </PopoverTrigger>
      <PopoverContent className='w-48 p-2'>
        <Input
          placeholder='Search year...'
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className='mb-2'
        />
        <ScrollArea className='h-40'>
          <ul className='space-y-1'>
            {filteredYears.map((year) => (
              <li key={year}>
                <Button
                  variant='ghost'
                  className='w-full justify-start'
                  onClick={() => handleYearChange(year)}
                >
                  {year}
                </Button>
              </li>
            ))}
          </ul>
        </ScrollArea>
        <Button
          variant='outline'
          className='mt-2 w-full'
          onClick={() => {
            // eslint-disable-next-line unicorn/no-useless-undefined
            handleYearChange(undefined);
            setIsOpen(false);
          }}
        >
          Clear
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default YearPicker;
