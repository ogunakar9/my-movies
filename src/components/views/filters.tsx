import React from 'react';

import TypePicker from '@/components/views/type-picker';
import YearPicker from '@/components/views/year-picker';

const Filters = () => {
  return (
    <div className='flex w-full gap-4'>
      <YearPicker />
      <TypePicker />
    </div>
  );
};

export default Filters;
