import React from 'react';

import TypePicker from '@/components/views/type-picker';
import YearPicker from '@/components/views/year-picker';

const Filters = () => {
  return (
    <div className='w-full'>
      <YearPicker onYearSelect={(year) => console.log(year)} />
      <TypePicker />
    </div>
  );
};

export default Filters;
