import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchCategories, dispatchCategories} from '../../../redux/actions/categorieAction'
import DayJS from 'react-dayjs';
import { Modal, Button} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios'
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import './Categories.css'
import Table from '../../components/table/Table';

const { confirm } = Modal;
const initialState = {
    title:'',
    err: '',
    success: ''
  }

function Categories() {
    const [categorie, setCategorie] = useState(initialState)
    const categories1 = useSelector(state => state.categorie)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const rowData= categories1?.map(categorie => {
      return{
          id:categorie?._id,
          titre:categorie?.title,
          date:categorie?.createdAt,
      }
  })
        
        useEffect(() => {
            fetchCategories().then(res =>{
                  dispatch(dispatchCategories(res))
              })
        },[dispatch, callback])

       const handleDelete = async (id) => {
        try {
            if(categorie._id !== id){
                    await axios.delete(`/deleteCategorie/${id}`)
                    
                    setCallback(!callback)
            }
        } catch (err) {
            setCategorie({...categorie, err: err.response.data.msg , success: ''})
        }
        }

    const columns = [
        {
          field: 'titre',
          headerName: 'Catégorie',
          flex:1,
        },
        {
            headerName: 'Sous-catégories',
            flex:1,
            renderCell(params){
              return(
                <a href={`/categorie/sousCategories/${params.row.id}`}><ListIcon className='icon-visible'/></a>
              );
            }
        },
        {
          field: 'date',
          headerName: 'Date création',
          flex:1,
          renderCell(params){
            return(
              <DayJS format="DD-MM-YYYY / HH:mm:ss">{params.row.date}</DayJS>
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
                  title: 'Êtes-vous sûr de vouloir supprimer cette catégorie?',
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
                <a href={`/categorie/${params.row.id}`}>
                   <EditIcon className='icon-action' />
                </a>
                 <DeleteOutlineIcon onClick={showDeleteConfirm} className="icon-delete"/>
                </>
              )
            }
          },
      ];
     
    
  return (
      <div className='admin'>
        <div className="header-admin">
            <h1 className='title-admin'>Liste des catégories</h1>
            <Button className='btn-add-categorie' href='/addcategorie'>
             <AddIcon /> Catégorie
            </Button>
        </div>
        <div  style={{ height: 550 }} className="tableau" >
        <Table row={rowData} columns={columns}/>
       </div> 
      </div>
  )
}

export default Categories