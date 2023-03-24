import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import {fetchMyEvents, dispatchGetMyEvents} from '../../../../redux/actions/eventsAction'
import {DataGrid} from '@mui/x-data-grid';
import DayJS from 'react-dayjs';


function Transactions() {
    const columns = [
        {
          field: 'achats',
          headerName: 'Achats',
          flex:1,
        },
        {
          field: 'date',
          headerName: 'Date d achat',
          flex:1,
        },
        {
          field: 'type',
          headerName: 'Type',
          flex:1,
        },
        {
          field: 'prix',
          headerName: 'Prix',
          flex:1,
        },
        
      ];
  const rowData= [];
  return (

    <div style={{ height: 550, width: '100%'}}>
      <DataGrid
              rows={rowData}
              columns={columns}
              pageSize={8}
              checkboxSelection
              disableSelectionOnClick       
      />
     </div> 
     
  )
}

export default Transactions