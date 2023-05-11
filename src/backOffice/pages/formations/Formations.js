

import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {fetchMyFormations, dispatchGetMyFormations} from '../../../redux/actions/formationsAction'
import { Button,Form ,
  //Modal,
  Nav} from 'react-bootstrap'
  import Tooltip from "@mui/material/Tooltip";
  import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {Input} from 'antd';
import {DataGrid} from '@mui/x-data-grid';
import "./Formation.css"
import { Link,useNavigate, useParams } from 'react-router-dom';
import DayJS from 'react-dayjs';
import Popover from '@material-ui/core/Popover';
import { Divider } from '@material-ui/core'
import { Snackbar, Alert } from "@mui/material";

import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {getformationbyinstr} from '../../../redux/features/formationbyinstr';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal} from 'antd';
import Table from '../../../backOffice/components/table/Table';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';

import {getformationbyins} from '../../../redux/features/formationbyins';



const { Search } = Input;
const onSearch = value => console.log(value);
const initialState = {
  title:'',
  err: '',
  success: ''
}
function Formations() {
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const open4 = Boolean(anchorEl1);
  //const id= open4 ? 'simple-popover' : undefined;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)
  const { loginUser } = auth ;
  const {id}=useParams();
 // const [formation, setFormation] = useState(initialState)
  const [archiver, setArchiver] = useState(false)
  const [statut, setStatut] = useState(false)
  //const formations = useSelector(state => state.formations)
  //const {title} = formation
  const navigate = useNavigate();
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()
  const [currentRow, setCurrentRow] = useState(null);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const user = useSelector(state => state.auth.user);
  
  const formations = useSelector(state => state.formationbyins.formationn);
  
  useEffect(() => {
                  
    dispatch(getformationbyins(user.UUid))

},[user.UUid,dispatch])

console.log(formations)
console.log(user.UUid)
  const data= formations?.map(formation => {
    return{
        id:formation?.uuid,
        title:formation?.title,
        price:formation?.price,
        affiche:formation?.url,
        status:formation?.status,
        date:formation?.createdAt,
        inscription:0,
    }
  })

        const handleClose2 = (event, reason) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen2(false);
        };

        const handleClose3 = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
            setOpen3(false);
          };

        const handleClick = (event) => {
                setAnchorEl1(event.currentTarget);
        };

        const handleClose4 = () => {
                setAnchorEl1(null);
        };
        const { confirm } = Modal;

     

        
       

        const handleDelete = async (id) => {
          try {console.log('aa')
             
                      await axios.delete(`http://localhost:5000/formations/supprimerformation/${id}`, {
                          //headers: {Authorization: token}
                          headers: {'X-Requested-With': 'XMLHttpRequest', 
                          "content-type":"application/json", "Access-Control-Allow-Origin": "*", 
                          "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                         "withCredentials": true 
                      })
                      .then((response) => {console.log(response)
                        const message = response.data.message;console.log(message)
                        if (message==='formation supprimé !')
                              {setSuccess('formation supprimé !');window.location.reload()}
                              if (message==='suppression echouée')
                              {setErr('suppression echouée');}
                              else{setErr("erreur");}})
                              

              
            }   catch (err) {setErr('suppression echouée');console.log('bbb')
             
          }
          } 
          const handledepublier = async (id) => {console.log(id)
            try {
                
                        await axios.patch(`http://localhost:5000/formations/depublierformation/${id}`, {
                          headers: {'X-Requested-With': 'XMLHttpRequest', 
                          "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                          "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                         "withCredentials": true 
                        
                      }).then((response) => {
                        const message = response.data.message;console.log(message)
                        if (message==='formation depublié !')
                              {setSuccess('formation depublié !');window.location.reload()}
                              if (message==='depublication echouée')
                              {setErr('depublication echouée');}
                              if (message==='formation deja depublié')
                              {setErr('formation deja depublié');}
                              else{setErr("erreur");}})
                              

                    } catch (err) {
                      setErr("erreur");
                     
              }
            }
          const handlepublier = async (id) => {console.log(id)
            try {
                
                        await axios.patch(`http://localhost:5000/formations/publierformation/${id}`, {
                          headers: {'X-Requested-With': 'XMLHttpRequest', 
                          "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                          "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                         "withCredentials": true 
                        
                      }).then((response) => {
                        const message = response.data.message;console.log(message)
                        if (message==='formation publié !')
                              {setSuccess('formation publié !');window.location.reload()}
                              if (message==='publication echouée')
                              {setErr('publication echouée');}
                              if (message==='formation deja publié')
                              {setErr('formation deja publié');}
                              
                              else{setErr("erreur");}})

                    } catch (err) {
                      setErr("erruueur");
                     
              }
            }

     

          

        const columns = [
          {
            field: 'affiche',
            headerName: 'Miniature',
            flex:1.6,
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
            field: 'price',
            headerName: 'Prix',
            flex:1,
          },
          {
            field: 'inscription',
            headerName: 'Inscriptions',
            flex:1,
          }, {
            field: 'status',
            headerName: 'Status',
           
            flex:0.7,
           
              
            
          },
        
          {
              field: 'action',
              headerName: 'Action',
              flex:1.5,
              renderCell: (params) =>{
                function showDeleteConfirm() {
                  confirm({
                    title: 'Êtes-vous sûr de vouloir supprimer cette formation?',
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
                function showdepublierConfirm() {
                  confirm({
                    title: 'Êtes-vous sûr de vouloir depublier cette formation?',
                    icon: <ExclamationCircleOutlined />,
                    okText: 'depublier',
                    okType: 'danger',
                    cancelText: 'Annuler',
                    onOk() {
                      handledepublier(params.row.id)
                    },
                    onCancel() {
                      console.log('Cancel');
                    },
                  });
                }
                function showpublierConfirm() {
                  confirm({
                    title:'Êtes-vous sûr de vouloir publier cette formation ?',
                    icon: <CheckCircleOutlineIcon className="iconCheck"/>,
                    okText: 'publier',
                    okType: 'primary',
                    cancelText: 'Annuler',
                    onOk() {
                      handlepublier(params.row.id) 
                    },
                    onCancel() {
                      console.log('Cancel');
                    },
                  });
                }
                return(
                  <> 
                  <Link to={`/formation/${params.row.id}`}><Tooltip title="voir details"><VisibilityIcon className='icon-action'/>
                  </Tooltip></Link>
                  <Tooltip title="publier">
                 <BlockIcon className='icon-action' onClick={showpublierConfirm} /></Tooltip>
                 <Tooltip title="depublier">
                 <LockOpenIcon className='icon-action' onClick={showdepublierConfirm} /></Tooltip>
                 <Tooltip title="supprimer">
                 <DeleteOutlineIcon className='icon-action' onClick={showDeleteConfirm} /></Tooltip>
                 
                  </>
                )
              }
            },
        ];

  return (
    <div className='formation'>
      <div className='formTitleContainer'>
        <h1 className="title-event">Mes formations</h1>
        <Button className='btn-event' href={`/ajouterformation/${user.UUid}`}>
       
         <AddIcon />Formation</Button>
      </div>
      <div className="search">
      <Search placeholder="Rechercher des formations" allowClear onSearch={onSearch}  />
      </div>
          <div style={{ height: 550 }} className='tableau' >
         
          <Table row={data} columns={columns}/>
          </div>
       
          <Snackbar autoHideDuration={2500} open={ err === "" ? false : true } onClose={()=>{ setErr("") }}  >
        <Alert variant="filled" severity="error" onClose={()=>{ setErr("") }} >
          {
            err
          }
        </Alert>
      </Snackbar>
      <Snackbar autoHideDuration={2500} open={ success === "" ? false : true } onClose={()=>{ setSuccess("") }}  >
        <Alert variant="filled" severity="success" onClose={()=>{ setSuccess("") }} >
          {
            success
          }
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Formations
