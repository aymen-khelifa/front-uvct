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

const { confirm } = Modal;

function BoiteReception() {
  const token = useSelector(state => state.token)
  const [reclamation, setReclamation] = useState([])
  const message1 = useSelector(state => state.mymessageinst.mymessageinst1)
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  const rowData= message1?.map(message => {
    return{
        id:message.uuid,
        objectif:message.objectif,
        message:message.message,
        date:message.createdAt,
        response:message.response,
        envyepar:message.user.name,
        
    }
})
      
      useEffect(() => {
       
                dispatch(getmymessageinst(user.email))
            
      },[dispatch])
      

   

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
       
        return(
          <>
           <Link to={`/messagedet/${params.row.id}`}>
           <VisibilityIcon className='icon-action'/>
                </Link>
          
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