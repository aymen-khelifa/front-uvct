import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllReclamations, dispatchGetAllReclamations} from '../../../../redux/actions/reclamationAction';

import DayJS from 'react-dayjs';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Table from '../../../components/table/Table';
import { getreclamations } from '../../../../redux/features/reclamationsSlice';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
const { confirm } = Modal;

function Reclamations1() {
  const token = useSelector(state => state.token)
  //const [reclamation, setReclamation] = useState([])
  const reclamations = useSelector(state => state.reclamation.reclamation)
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
        
    dispatch(getreclamations())

  },[dispatch])
  
  const rowData= reclamations?.map(reclamation => {
    return{
        id:reclamation.uuid,
        sujet:reclamation.sujet,
        message:reclamation.message,
        
        envoyerpar:reclamation.user.name,
        date:reclamation.createdAt,
        
    }
})
      
      

     const handleDelete = async (id) => {
      
          
                  await axios.delete(`/deleteReclamation/${id}`, {
                    headers: {Authorization: token}
                  }
                    )
               
                
          
      .catch( (err)=> {
        console.log('eee')
      })
      }

      const columns = [
        {
          field: 'sujet',
          headerName: 'Sujet',
          flex:1,
        },
        {
          field: 'message',
          headerName: 'Messages',
          flex:2,
        },
        {
          field: 'envoyerpar',
          headerName: 'envoyerpar',
          flex:1,
        },
        
        {
          field: 'date',
          headerName: 'Date',
          flex:1,
          renderCell(params){
            return(
              <DayJS format="dddd, MMMM D, YYYY h:mm A">{params.row.date}</DayJS>
            );
          }
        },
        {
          field: 'action',
          headerName: 'Action',
          flex:1,
          renderCell: (params) =>{
            function showDeleteConfirm() {
              confirm({
                title: 'Êtes-vous sûr de vouloir supprimer cette réclamation?',
                icon: <ExclamationCircleOutlined />,
                okText: 'Supprimer',
                okType: 'danger',
                cancelText: 'Annuler',
                onOk() {
                  handleDelete(params.row.id)
                },
                onCancel() {
                  console.log('Cancel');
                },
              });
            }
            return(
              <>
               <Link to={`/reclamationdt/${params.row.id}`}>
               <VisibilityIcon className='icon-action'/>
                    </Link>
               <DeleteOutlineIcon  onClick={showDeleteConfirm} className="icon-delete"/>
              </>
            )
          }
          
        },
        
      ];
      
    
  return (
    <div className="favoris">
    <h1 className="title-favoris1">Réclamations</h1>
    <div style={{ height: 550}} className="tableau">
    <Table row={rowData} columns={columns}/>
     </div> 
    </div>
  )
}

export default Reclamations1