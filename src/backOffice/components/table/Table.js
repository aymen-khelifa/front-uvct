import React from 'react'
import {DataGrid} from '@mui/x-data-grid';

function Table(props) {
  return (
    <DataGrid
    rows={props.row}
    columns={props.columns}
    pageSize={8}
   
  />
  )
}

export default Table