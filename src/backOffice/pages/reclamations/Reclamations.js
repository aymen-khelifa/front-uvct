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

const { confirm } = Modal;

function Reclamations() {
  const token = useSelector(state => state.token)
  const [reclamation, setReclamation] = useState([])
  const reclamations1 = useSelector(state => state.reclamations)
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()
      
      useEffect(() => {
        fetchMyReclamations(token).then(res =>{
                dispatch(dispatchGetMyReclamations(res))
            })
      },[token,dispatch, callback])
      

     const handleDelete = async (id) => {
      try {
          if(reclamation._id !== id){
                  await axios.delete(`/deleteReclamation/${id}`, {
                    headers: {Authorization: token}
                })
                  
                  setCallback(!callback)
          }
      } catch (err) {
          setReclamation({...reclamation, err: err.response.data.msg , success: ''})
      }
      }

  const columns = [
    {
      field: 'cause',
      headerName: 'Sujet',
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
           <a href={`/reclamation/${params.row.id}`}>
           <VisibilityIcon className='icon-action'/>
                </a>
           <DeleteOutlineIcon  onClick={showDeleteConfirm} className="icon-delete"/>
          </>
        )
      }
      
    },
    
  ];
  const rowData= reclamations1?.map(reclamation => {
    return{
        id:reclamation?._id,
        cause:reclamation?.cause,
        message:reclamation?.message,
        date:reclamation?.createdAt,
    }
})

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