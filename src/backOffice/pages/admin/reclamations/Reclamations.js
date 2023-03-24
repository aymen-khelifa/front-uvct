import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllReclamations, dispatchGetAllReclamations} from '../../../../redux/actions/reclamationAction'
import DayJS from 'react-dayjs';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import axios from 'axios'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Table from '../../../components/table/Table';

const { confirm } = Modal;

function Reclamations1() {
  const token = useSelector(state => state.token)
  const [reclamation, setReclamation] = useState([])
  const reclamations1 = useSelector(state => state.reclamations)
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()
      
      useEffect(() => {
        fetchAllReclamations().then(res =>{
                dispatch(dispatchGetAllReclamations(res))
            })
      },[dispatch, callback])

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
               <a href={`/reclamationdt/${params.row.id}`}>
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
    <h1 className="title-favoris1">Réclamations</h1>
    <div style={{ height: 550}} className="tableau">
    <Table row={rowData} columns={columns}/>
     </div> 
    </div>
  )
}

export default Reclamations1