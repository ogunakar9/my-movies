import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

interface YearPickerProperties {
  onYearSelect: (year: number | undefined) => void;
}

const YearPicker: React.FC<YearPickerProperties> = ({ onYearSelect }) => {
  const currentYear = new Date().getFullYear();
  const [searchValue, setSearchValue] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
  const filteredYears = years.filter((year) => year.toString().includes(searchValue));

  const handleSelect = (year: number) => {
    setSelectedYear(year);
    onYearSelect(year);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={(event) => setIsOpen(event)}>
      <PopoverTrigger asChild>
        <Button variant='outline'>{selectedYear ? `Year: ${selectedYear}` : 'Select Year'}</Button>
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
                  onClick={() => handleSelect(year)}
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
            setSelectedYear(undefined);

            // eslint-disable-next-line unicorn/no-useless-undefined
            onYearSelect(undefined);
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
