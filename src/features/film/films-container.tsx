import React from 'react';

// import Button from '@mui/material/Button';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
// import { SearchInput, Table, TypePicker, YearPicker } from '../../components';
import {
  // getFilmsWithParams as getFilmsWithParameters,
  selectFilters,
  updatePage
} from './film-slice';

const Films = () => {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const handleFormSubmit = () => {
    dispatch(updatePage(1));
    // dispatch(getFilmsWithParameters({ ...filters, page: 1 }));
  };

  return (
    <div className='App'>
      <div className='filters'>
        {/* <SearchInput />
        <YearPicker />
        <TypePicker /> */}
        <button onClick={handleFormSubmit}>Apply Filters</button>
      </div>
      {/* <Table /> */}
    </div>
  );
};

export default Films;
