import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchMyReclamations, dispatchGetMyReclamations} from '../../../redux/actions/reclamationAction'
import DayJS from 'react-dayjs';
import { Modal, Button} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from 'axios'
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Table from '../../components/table/Table';
import  { getmyreclamation } from '../../../redux/features/myrecSlice';
import { Link } from "react-router-dom";

const { confirm } = Modal;

function Reclamations() {
  const user= useSelector(state => state.auth.user)
 
  const [callback, setCallback] = useState(false)
  const reclamations1 = useSelector(state => state.myreclamation.myreclamationn)
      console.log(reclamations1)
  const dispatch = useDispatch()
console.log(user)

  
      console.log(user.UUid)
      useEffect(() => {
        
                dispatch(getmyreclamation(user.UUid))
           
      },[dispatch])
    
      const rowData= reclamations1?.map(reclamation => {
        return{
            id:reclamation?.uuid,
            sujet:reclamation?.sujet,
            message:reclamation?.message,
            reponse:reclamation?.reponse,
            date:reclamation?.createdAt,
            
        }
    })
     const handleDelete = async (id) => {
      try {
         
                  await axios.delete(`/deleteReclamation/${id}`, {
                    //headers: {Authorization: token}
                })
                  
                  setCallback(!callback)
          
      } catch (err) {
         // setReclamation({...reclamation, err: err.response.data.msg , success: ''})
      }
      }

  const columns = [
    
   
    {
      field: 'sujet',
      headerName: 'sujet',
      flex:2,
    },
    {
      field: 'reponse',
      headerName: 'Reponse',
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
           <Link to={`/reclamation/${params.row.id}`}>
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
    <div className='formTitleContainer'>
        <h1 className="title-event">Mes Réclamations</h1>
        <Button  href="/add-reclamation">
         <AddIcon />Ajouter Réclamation</Button>
      </div>
    <div style={{ height: 550, width: '100%' , backgroundColor:'white'}}>
    <Table row={rowData} columns={columns}/>
     </div> 
    </div>
  )
}

export default Reclamations