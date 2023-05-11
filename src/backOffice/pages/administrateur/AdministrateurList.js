import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getAdmin} from '../../../redux/features/usersSlice'
import Avatar1 from '../../../components/Avatar/Avatar';
import DayJS from 'react-dayjs';
import { Nav} from 'react-bootstrap';
import Popover from '@material-ui/core/Popover';
import { Divider } from '@material-ui/core'
import axios from 'axios'
import './Adminstrateur.css'
import { Button, Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddIcon from '@material-ui/icons/Add';
import Table from '../../components/table/Table';
import SnackbarErr from '../../components/Snackbar/SnackbarErr';
import {Snackbar,Alert} from "@mui/material";
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BlockIcon from '@mui/icons-material/Block';
import Tooltip from "@mui/material/Tooltip";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


const { confirm } = Modal;
const initialState = {
  name: '',
  email:'',
  tele:'',
  password:'',
  err: '',
  success: ''
}

function AdministrateurList() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id= open ? 'simple-popover' : undefined;
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user,isSuperAdmin} = auth
    const users = useSelector((state) => state.user.admins)

    //const users = useSelector(state => state.users)
    const [callback, setCallback] = useState(false)
    const [data, setData] =useState(initialState);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    //const users = useSelector(userSelectors.selectAll)
    //const {err} =data
    //const [administrateur, setAdministrateurs] = useState([]);
    const dispatch = useDispatch()
    const [open2, setOpen2] = React.useState(false);


    useEffect(() => {
        
           
      dispatch(getAdmin())


      },[ dispatch])

    const rowData= users?.map(user => {
      return{
        id:user?.uuid,
        name:user?.name,
        email:user?.email,
        tele  :user?.tel,
        message:user?.message,
        date:user?.createdAt,  
        status:user?.status,       
          avatar:user?.url1,
         
          
      }
  })
      const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

      const handleClose1 = () => {
        setAnchorEl(null);
      };
      const handleactive = async (id) => {
        try {
            
                    await axios.patch(`http://localhost:5000/users/activeradmin/${id}`, {
                      headers: {'X-Requested-With': 'XMLHttpRequest', 
                      "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                      "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                     "withCredentials": true 
                    
                  }).then((response) => {
                    const message = response.data.message;console.log(message)
                    if (message==='administrateur activé !')
                          {setSuccess('administrateur activé !');window.location.reload()}
                          if (message==='activation echouée')
                          {setErr('activation echouée');}
                          else{setErr("erreur");}})
                } catch (err) {
                  setErr("activation echouée");
                 // setData({...data, err: err.response.data.msg , success: ''})
           // setOpen2(true)
          }
        }
      const handlebloque = async (id) => {
        try {
            
                    await axios.patch(`http://localhost:5000/users/bloqueradmin/${id}`, {
                      headers: {'X-Requested-With': 'XMLHttpRequest', 
                      "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                      "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                     "withCredentials": true 
                    
                  }).then((response) => {
                    const message = response.data.message;console.log(message)
                    if (message==='administrateur bloqué !')
                          {setSuccess('administrateur bloqué !');window.location.reload();}
                          if (message==='bloquation echouée')
                          {setErr('opération echouée');}
                          else{setErr("erreur");}})
                } catch (err) {
                  setErr("opération echouée");
                 // setData({...data, err: err.response.data.msg , success: ''})
           // setOpen2(true)
          }
        }

   //isSuperAdmin
     /* useEffect(() => {
        getAdministrateurs();
      }, []);
     const getAdministrateurs= async()=>{
      let  response = await axios.get("http://localhost:5000/users/getAdmin")
      console.log(response);
      setAdministrateurs(response.data);
     }*/

    const handleDelete = async (id) => {
      try {
          
                  await axios.get(`http://localhost:5000/users/supprimerAdmin/${id}`, {
                   
                    
                  },{
                       headers: {'X-Requested-With': 'XMLHttpRequest', 
                       "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                       "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                      "withCredentials": true 
                    }).then((response) => {
                      const message = response.data.message;console.log(message)
                      if (message==='administrateur supprimé !')
                            {setSuccess('administrateur supprimé !');window.location.reload()}
                            if (message==='suppression echouée')
                            {setErr('suppression echouée');}
                            else{setErr("erreur");}})
                    //setSuccess('administrateur supprimé !');
                  setCallback(!callback)
          
          
      } catch (err) {
        setErr('suppression echouée');
         // setData({...data, err: err.response.data.msg , success: ''})
          //setOpen2(true);
      }
    }

    const columns = [
        {
          field: 'avatar',
          headerName: 'Nom',
          flex:1.7,
          renderCell(params){
            return(
              <div className='userList'>
              <Avatar1 src={params.row.avatar}/>
              {params.row.name}
              </div>
            );
          }
        },
        {
          field: 'email',
          headerName: 'Email',
          type: 'email',
          flex:1.7,
        },
        {
            field: 'tele',
            headerName: 'Téléphone',
            flex:1,
          },
        {
          field: 'date',
          headerName: 'Date création',
          flex:1.4,
          renderCell(params){
            return(
              <DayJS format="DD-MM-YYYY / HH:mm:ss">{params.row.date}</DayJS>
            );
          }
        },
        {
            field: 'status',
            headerName: 'Status',
            flex:1,
            
          },
        {
            field: 'action',
            headerName: 'Action',
            flex:1,
            renderCell: (params) =>{
              function showDeleteConfirm() {
                confirm({
                  title: 'Êtes-vous sûr de vouloir supprimer ce compte instructeur?',
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
              function showbloquerConfirm() {
                confirm({
                  title: 'Êtes-vous sûr de vouloir bloquer ce compte administrateur?',
                  icon: <ExclamationCircleOutlined />,
                  okText: 'Bloquer',
                  okType: 'danger',
                  cancelText: 'Annuler',
                  onOk() {
                    handlebloque(params.row.id)
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              }function showactiverConfirm() {
                confirm({
                  title:'Êtes-vous sûr de vouloir activer ce administrateur?',
                  icon: <CheckCircleOutlineIcon className="iconCheck"/>,
                  okText: 'Bloquer',
                  okType: 'primary',
                  cancelText: 'Annuler',
                  onOk() {
                    handleactive(params.row.id) 
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              }
              return(
                <>
                <Link to={`/admin/${params.row.id}`}>
                <VisibilityIcon className='icon-action'/>
                </Link>
                <Tooltip title="bloquer">
                <BlockIcon className='icon-action' onClick={showbloquerConfirm} /></Tooltip>
                 <Tooltip title="activer">
                 <LockOpenIcon className='icon-action' onClick={showactiverConfirm} /></Tooltip>
                 <Tooltip title="supprimer">
                 <DeleteOutlineIcon className='icon-action' onClick={showDeleteConfirm} /></Tooltip>
            
                </>
              )
            }
          },
      ];
      

  return (
      <div className='admin'>
        <div className="header-admin">
        
          <h1 className='title-admin'>Liste administrateurs</h1>
          <Button className='btn-add-admin' href="/addAdmin">
            <AddIcon />Administrateur
          </Button>
       </div>
        <div style={{ height: 550}}  className="tableau">
        <Table row={rowData} columns={columns}/>
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

export default AdministrateurList
