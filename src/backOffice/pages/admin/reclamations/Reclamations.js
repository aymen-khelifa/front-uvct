import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllReclamations, dispatchGetAllReclamations} from '../../../../redux/actions/reclamationAction';
import { Snackbar, Alert} from "@mui/material";

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
  const [err , setErr] = useState("");
  const [success , setSuccess] = useState("");
  useEffect(() => {
        
    dispatch(getreclamations())

  },[dispatch])
  
  const rowData= reclamations?.map(reclamation => {
    return{
        id:reclamation?.uuid,
        sujet:reclamation?.sujet,
        message:reclamation?.message,
        
        envoyerpar:reclamation.user.name,
        date:reclamation?.createdAt,
        
    }
})
      
      

     const handleDelete = async (id) => {
      
          
                  await axios.delete(`http://localhost:5000/reclamations/deleteReclamation/${id}`, {
                    //headers: {Authorization: token}
                    headers: {'X-Requested-With': 'XMLHttpRequest', 
              "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
              "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
             "withCredentials": true  
                  }
                    ).then((response) => {
                      const message = response.data.message;console.log(message)
          
                     if (message==='reclamation supprimée !')
                        {setSuccess('reclamation supprimée !');window.location.reload()}
                        if (message==='suppression echouée')
                        {setErr('suppression echouée');}
                        else{setErr("suppression echouée");}})
          
               
                
          
      .catch( (err)=> {
        console.log('erreur')
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
     <Snackbar autoHideDuration={1500} open={ err === "" ? false : true } onClose={()=>{ setErr("") }}  >
        <Alert variant="filled" severity="error" onClose={()=>{ setErr("") }} >
          {
            err
          }
        </Alert>
      </Snackbar>
      <Snackbar autoHideDuration={1500} open={ success === "" ? false : true } onClose={()=>{ setSuccess("") }}  >
        <Alert variant="filled" severity="success" onClose={()=>{ setSuccess("") }} >
          {
            success
          }
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Reclamations1