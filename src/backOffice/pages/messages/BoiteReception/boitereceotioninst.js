import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchMyReclamations, dispatchGetMyReclamations} from '../../../../redux/actions/reclamationAction'
import DayJS from 'react-dayjs';
import { Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from 'axios'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Table from '../../../components/table/Table';
import { getmymessageinst } from '../../../../redux/features/mymsginstSlice';
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Snackbar, Alert} from "@mui/material";

const { confirm } = Modal;

function BoiteReception() {
  const token = useSelector(state => state.token)
  const [reclamation, setReclamation] = useState([])
  const message1 = useSelector(state => state.mymessageinst.mymessageinstr1)
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const [err , setErr] = useState("");
  const [success , setSuccess] = useState("");

  const rowData= message1?.map(message => {
    return{
        id:message?.uuid,
        objectif:message?.objectif,
        message:message?.message,
        date:message?.createdAt,
        response:message?.response,
        envyepar:message?.user.name,
        
    }
})
      
      useEffect(() => {
       
                dispatch(getmymessageinst(user.email))
            
      },[dispatch])
      

      const handleDelete = async (id) => {
        try {
            
                    await axios.delete(`http://localhost:5000/messages/deletemessage/${id}`, {
                      //headers: {Authorization: token}
                      headers: {'X-Requested-With': 'XMLHttpRequest', 
                      "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                      "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                     "withCredentials": true  
                    }).then((response) => {
                      const message = response.data.message;console.log(message)
          
                     if (message==='message supprimé !')
                        {setSuccess('message supprimé !');window.location.reload()}
                        if (message==='suppression echouée')
                        {setErr('suppression echouée');}
                        else{setErr("suppression echouée");}})
                    
                 
            
        } catch (err) {
          setErr("suppression echouée");
        }
        }

  const columns = [
    {
      field: 'envyepar',
      headerName: 'Envoyé par',
      flex:1,
    },
    {
      field: 'message',
      headerName: 'Messages',
      flex:2,
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
            title: 'Êtes-vous sûr de vouloir supprimer ce message?',
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
           <Link to={`/messagedet/${params.row.id}`}>
           <VisibilityIcon className='icon-action'/>
                </Link>
                <DeleteOutlineIcon  onClick={showDeleteConfirm} className="icon-delete"/>
          
          </>
        )
      }
      
    },
    
  ];
 

  return (
    <div>
    <div style={{ height: 550, width: '100%' , backgroundColor:'white'}}>
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

export default BoiteReception