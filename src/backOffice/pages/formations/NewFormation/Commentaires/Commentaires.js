import React from 'react'
import {DataGrid} from '@mui/x-data-grid';

function Commentaires() { 
          
          const columns = [
            {
              field: 'commentaire',
              headerName: 'Commentaires',
              flex:2,
            },
            {
                field: 'envoyepar',
                headerName: 'Envoyé par',
                flex:2,
              },
              {
                field: 'formation',
                headerName: 'Formation',
                flex:1,
              },
              {
                field: 'session',
                headerName: 'Session',
                flex:2,
              },
            {
              field: 'date',
              headerName: 'Date de création',
              flex:2,
            },
            {
                field: 'action',
                headerName: 'Action',
                flex:1,
                renderCell: (params) =>{
                  return(
                    <>  
                    </>
                  )
                }
              },
          ];
          const data=[]
    return (   
            <div style={{ height: 550, width: '100%',background:"white",marginTop:"20px"}} >
              <DataGrid
                      rows={data}
                      columns={columns}
                      pageSize={8}
                      checkboxSelection
                      disableSelectionOnClick
                    />
            </div>
    )
}

export default Commentaires