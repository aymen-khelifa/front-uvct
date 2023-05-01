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
import { getmymessage } from '../../../../redux/features/getmymsgSlice';
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const { confirm } = Modal;

function BoiteReception() {
  const token = useSelector(state => state.token)
  const [reclamation, setReclamation] = useState([])
  const message2 = useSelector(state => state.mymessage.mymessage1)
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
console.log(user)
console.log(message2)

      useEffect(() => {
        
                dispatch(getmymessage(user.UUid))
            
      },[dispatch])
      const rowData= message2?.map(message => {
        return{
            id:message.uuid,
            objectif:message.objectif,
            message:message.message,
            response:message.response,
            date:message.createdAt,
            destinataire:message.destinataire,
        }
    })

     const handleDelete = async (id) => {
      try {
          
                  await axios.delete(`/deleteReclamation/${id}`, {
                    headers: {Authorization: token}
                })
                  
                  setCallback(!callback)
          
      } catch (err) {
          setReclamation({...reclamation, err: err.response.data.msg , success: ''})
      }
      }

  const columns = [
    {
      field: 'objectif',
      headerName: 'Objectif',
      flex:1,
    },
    {
      field: 'message',
      headerName: 'Messages',
      flex:2,
    },
    {
      field: 'response',
      headerName: 'Response',
      flex:2,
    },
    {
      field: 'destinataire',
      headerName: 'destinataire',
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
           <Link to={`/msgdet/${params.row.id}`}>
           <VisibilityIcon className='icon-action'/>
                </Link>
              
           <DeleteOutlineIcon  onClick={showDeleteConfirm} className="icon-delete"/>
          </>
        )
      }
      
    },
    
  ];


  return (
    <div style={{ height: 550, width: '100%' , backgroundColor:'white'}}>
     <Table row={rowData} columns={columns}/>
     </div>
  )
}

export default BoiteReception