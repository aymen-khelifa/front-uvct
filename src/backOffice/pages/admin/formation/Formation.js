import React ,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {fetchFormations, dispatchGetFormations} from '../../../../redux/actions/formationsAction'
import {fetchUserById, dispatchGetAllUserById} from '../../../../redux/actions/usersAction'
import Avatar1 from '../../../../components/Avatar/Avatar';
import { Modal} from 'antd';
import "./Formation.css"
import DayJS from 'react-dayjs';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArchiveIcon from '@material-ui/icons/Archive';
import axios from 'axios'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import QueueIcon from '@material-ui/icons/Queue';
import SnackbarSuccess from '../../../components/Snackbar/SnackbarSuccess';
import SnackbarErr from '../../../components/Snackbar/SnackbarErr';
import Table from '../../../components/table/Table';

const { confirm } = Modal;
const initialState = {
  err: '',
  success: ''
}

function Formation() {
  const token = useSelector(state => state.token)
  const [formation, setFormation] = useState(initialState)
  const [archiver, setArchiver] = useState(false)
  const formations = useSelector(state => state.formations)
  const { err, success} = formation
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const data= formations?.map(formation => {
    return{
        id:formation?._id,
        title:formation?.title,
        affiche:formation?.affiche,
        date:formation?.createdAt,
        categorie:formation?.categorie,
        instructeur:formation?.postedBy,  
    }
  })
      
        useEffect(() => {
                  fetchFormations().then(res =>{
                        dispatch(dispatchGetFormations(res))
                    })
        },[dispatch, callback]) ; 

        useEffect(()=>{
          axios.get('/all-formations' ).then(res=>{
            console.log(res.data);
          })

        })

        const handleDelete = async (id) => {
          try {
              if(formation._id !== id){
                      await axios.delete(`/deleteFormation/${id}`, {
                          headers: {Authorization: token}
                      })
                    
                      setCallback(!callback)
              }
              
          } catch (err) {
              setFormation({...formation, err: err.response.data.msg , success: ''})
              setOpen2(true);
          }
        }

        const archiverFormation = async(id) => {
          try {
              axios.patch(`/archiveFormation/${id}`,{archiver},{
                headers: {Authorization: token}
            })
              setArchiver(true)
              setFormation({...formation, err: '' , success: "Formation archivé !"})
              setOpen(true);
            
        }catch (err) {
              setFormation({...formation, err: err.response.data.msg , success: ''})
              setOpen2(true);
            
          }
        }

        const columns = [
          {
            field: 'affiche',
            headerName: 'Miniature',
            flex:1,
            renderCell: (params) =>{
              return(
                <> 
                    <img src={params.row.affiche} alt="" className='miniature'/>    
                </>
              )
            }
          },
          {
            field: 'title',
            headerName: 'Titre',
            flex:1,
          },
          {
            headerName: 'Instructeur',
            flex:2,
            renderCell: (params) =>{
                function Instructeur(instructeur){
                    const users = useSelector(state => state.users)
                    const [callback1] = useState(false)
                    const dispatch1 = useDispatch()
                    useEffect(() => {
                        fetchUserById(instructeur).then(res =>{
                              dispatch1(dispatchGetAllUserById(res))
                          })
                    },[dispatch1,instructeur, callback1])
                    return users
                }
                return(
                  <> 
                  <div className='userList'>
                    <Avatar1 src={Instructeur(params.row.instructeur).avatar}/>
                    {Instructeur(params.row.instructeur).name}
                  </div>
                  </>
                )
              }
          },
          {
            field: 'categorie',
            headerName: 'Catégorie',
            flex:2,
          },
          {
            field: 'date',
            headerName: 'Date de création',
            flex:2,
            renderCell(params){
              return(
                <DayJS format="DD-MM-YYYY / HH:mm:ss">{params.row.date}</DayJS>
              );
            }
          },
          {
            field: 'offre',
            headerName: 'Offres',
            flex:1,
            renderCell: (params) =>{
              return(
                <>  
                <QueueIcon className='icon-action'/>
                </>
              )
            }
          },
          {
              field: 'action',
              headerName: 'Action',
              flex:2,
              renderCell: (params) =>{
                function showDeleteConfirm() {
                  confirm({
                    title: 'Êtes-vous sûr de vouloir supprimer cette formation ?',
                    icon: <ExclamationCircleOutlined />,
                    okText: 'Supprimer',
                    okType: 'danger',
                    cancelText: 'Annuler',
                    closable:true,
                    onOk() {
                      handleDelete(params.row.id)
                    },
                    onCancel() {
                      console.log('Cancel');
                    },
                  });
                }
                function showArchiveConfirm() {
                  confirm({
                    title: 'Êtes-vous sûr de vouloir archiver cette formation ?',
                    icon: <ExclamationCircleOutlined />,
                    okText: 'Archiver',
                    okType: 'danger',
                    cancelText: 'Annuler',
                    closable:true,
                    onOk() {
                      archiverFormation(params.row.id)
                    },
                    onCancel() {
                      console.log('Cancel');
                    },
                  });
                }
                return(
                  <>  
                  <VisibilityIcon className='icon-action'/>  
                  <ArchiveIcon className='icon-action' onClick={showArchiveConfirm}/>
                  <DeleteOutlineIcon className='icon-action' onClick={showDeleteConfirm}/> 
                  </>
                )
              }
            },
        ];
        
  return (
    <div >
          <div style={{ height: 550, width: '100%'}} >
          <Table row={data} columns={columns}/>
          </div>
            <SnackbarSuccess success={success} open={open}/>
            <SnackbarErr err={err} open2={open2}/>
    </div>
  )
}

export default Formation