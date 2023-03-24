import React from 'react'
import {DataGrid} from '@mui/x-data-grid';

function Table(props) {
  return (
    <DataGrid
    rows={props.row}
    columns={props.columns}
    pageSize={8}
    checkboxSelection
    disableSelectionOnClick
  />
  )
}

export default Table