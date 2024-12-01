import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getFilmsWithParameters, selectFilters, updateFilters } from '@/features/film/slice';

const TypePicker: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const types = ['movie', 'series', 'episode'];
  const filteredTypes = types.filter((type) =>
    type.toLowerCase().includes(searchValue.toLowerCase())
  );

  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const selectedType = filters.type ?? '';

  const handleTypeSelect = (type: string) => {
    dispatch(updateFilters({ type, page: 1 }));
    setIsOpen(false);
    void dispatch(getFilmsWithParameters());
  };

  const handleClear = () => {
    dispatch(updateFilters({ type: '', page: 1 }));
    setIsOpen(false);
    void dispatch(getFilmsWithParameters());
  };

  return (
    <div className='space-y-4'>
      <div className='flex items-center space-x-2'>
        <Popover open={isOpen} onOpenChange={(event) => setIsOpen(event)}>
          <PopoverTrigger asChild>
            <Button variant='outline'>
              {selectedType
                ? `Selected: ${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}`
                : 'Select Type'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-48 p-2'>
            <Input
              placeholder='Search types...'
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              className='mb-2'
            />
            <ScrollArea className='h-40'>
              <ul className='space-y-1'>
                {filteredTypes.map((type) => (
                  <li key={type}>
                    <Button
                      variant={selectedType === type ? 'default' : 'ghost'}
                      className='w-full justify-start'
                      onClick={() => handleTypeSelect(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Button>
                  </li>
                ))}
              </ul>
            </ScrollArea>
            <Button variant='outline' className='mt-2 w-full' onClick={handleClear}>
              Clear
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TypePicker;
