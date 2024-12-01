import React from 'react';

import TypePicker from '@/components/views/type-picker';
import YearPicker from '@/components/views/year-picker';

const Filters = () => {
  return (
    <div className='relative left-[500px] top-[100px] h-[200px] w-full'>
      <YearPicker />
      <TypePicker />
    </div>
  );
};

export default Filters;
