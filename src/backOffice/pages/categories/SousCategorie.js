import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllSousCategorie, dispatchAllSousCategorie} from '../../../redux/actions/sousCategorieAction'
import { useParams } from 'react-router-dom'
import { Button, Modal } from 'antd';
import AddIcon from '@material-ui/icons/Add';
import DayJS from 'react-dayjs';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'
import Table from '../../components/table/Table';

const { confirm } = Modal;

function SousCategorie() {
    const [sousCategorie, setSousCategorie] = useState([])
    const sousCategories2 = useSelector(state => state.sousCategorie)
    const [callback2, setCallback2] = useState(false)
    const dispatch2 = useDispatch()
    const {id} = useParams()
    const rowData= sousCategories2?.map(sousCategorie => {
      return{
          id:sousCategorie?._id,
          title:sousCategorie?.title,
          date:sousCategorie?.createdAt,
      }
     })
       
        useEffect(() => {
            fetchAllSousCategorie(id).then(res =>{
                  dispatch2(dispatchAllSousCategorie(res))
              })
        },[id,dispatch2, callback2])

        const handleDelete = async (id) => {
            try {
                if(sousCategorie._id !== id){
                        await axios.delete(`/deleteSousCategorie/${id}`)
                        
                        setCallback2(!callback2)
                }
            } catch (err) {
                setSousCategorie({...sousCategorie, err: err.response.data.msg , success: ''})
            }
            }

        const columns = [
            {
              field: 'title',
              headerName: 'Sous catégorie',
              flex:1,
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
                          title: 'Êtes-vous sûr de vouloir supprimer cette sous catégorie?',
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
                    <a href={`/sousCategorie/${params.row.id}`}><EditIcon className='icon-visible'/></a>
                    <DeleteOutlineIcon className="icon-delete" onClick={showDeleteConfirm}/>
                    </>
                  )
                }
              },
          ];
        
      return (
          <div className='admin'>
            <div className="header-admin">
                <h1 className='title-admin'>Liste des sous catégories</h1>
                <Button className='btn-add-categorie' href={`/addSousCategorie/${id}`}>
                 <AddIcon /> Sous Catégorie
                </Button>
            </div>
            <div style={{ height: 550 }} className="tableau">
            <Table row={rowData} columns={columns}/>
           </div> 
          </div>
      )
}



export default SousCategorie