import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Checkbox } from '@/components/ui/checkbox';
import { getFilmsWithParameters, selectFilters, updateFilters } from '@/features/film/slice';

const TypeCheckboxes: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['movie', 'series', 'episode']);

  const handleCheckboxChange = (value: string) => {
    setSelectedTypes((previous) => {
      const newSelections = previous.includes(value)
        ? previous.filter((type) => type !== value)
        : [...previous, value];

      dispatch(
        updateFilters({
          type: newSelections.join(','),
          page: 1
        })
      );

      return newSelections;
    });

    void dispatch(getFilmsWithParameters());
  };

  console.log(filters);

  const isChecked = (value: string) => selectedTypes.includes(value);

  return (
    <div className='space-y-2'>
      <div className='flex items-center space-x-2'>
        <Checkbox
          id='movie'
          checked={isChecked('movie')}
          onCheckedChange={() => handleCheckboxChange('movie')}
        />
        <label htmlFor='movie' className='text-sm font-medium'>
          Movie
        </label>
      </div>
      <div className='flex items-center space-x-2'>
        <Checkbox
          id='series'
          checked={isChecked('series')}
          onCheckedChange={() => handleCheckboxChange('series')}
        />
        <label htmlFor='series' className='text-sm font-medium'>
          Series
        </label>
      </div>
      <div className='flex items-center space-x-2'>
        <Checkbox
          id='episode'
          checked={isChecked('episode')}
          onCheckedChange={() => handleCheckboxChange('episode')}
        />
        <label htmlFor='episode' className='text-sm font-medium'>
          Episode
        </label>
      </div>

      <p className='mt-4 text-sm text-gray-600 dark:text-gray-400'>
        Selected Types: {selectedTypes.join(', ')}
      </p>
    </div>
  );
};

export default TypeCheckboxes;
