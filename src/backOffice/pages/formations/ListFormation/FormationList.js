import React ,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllFormations, dispatchGetAllFormations} from '../../../../redux/actions/formationsAction'
import "../Formation.css"
import DayJS from 'react-dayjs';
import Table from '../../../components/table/Table';

function FormationList() { 
    const token = useSelector(state => state.token)
    const formationss = useSelector(state => state.formations)
    const [callback] = useState(false)
    const dispatch = useDispatch()
  
          useEffect(() => {
                fetchAllFormations(token).then(res =>{
                      dispatch(dispatchGetAllFormations(res))
                  })
          },[token, dispatch, callback])
          
          const columns = [
            {
              field: 'affiche',
              headerName: 'Formation',
              flex:1,
              renderCell: (params) =>{
                return(
                  <> 
                      <img src={params.row.affiche} alt="" className='miniature'/>  
                  </>
                )
              }
            },
            {
              field: 'instructeur',
              headerName: 'Instructeur',
              flex:2,
            },
            {
                field: 'categorie',
                headerName: 'Catégorie',
                flex:2,
              },
            {
              field: 'date',
              headerName: 'Date de création',
              flex:2,
              renderCell(params){
                return(
                  <DayJS format="DD-MM-YYYY / HH:mm:ss">{params.row.date}</DayJS>
                  
                );
              }
            },
            {
              field: 'offre',
              headerName: 'Offres',
              flex:1,
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
          const data= formationss?.map(formation => {
            return{
                id:formation?._id,
                title:formation?.title,
                affiche:formation?.affiche,
                categorie:formation?.categorie,
                instructeur:formation?.postedBy,
                date:formation?.createdAt,
                
            }
          })
    return (
      <div className='formation'>
        <div className='formTitleContainer'>
          <h1 className="title-event">Liste des formations</h1>
        </div>
            <div style={{ height: 550, width: '100%',background:"white",marginTop:"20px"}} >
            <Table row={data} columns={columns}/>
            </div>
      </div>
    )
}

export default FormationList