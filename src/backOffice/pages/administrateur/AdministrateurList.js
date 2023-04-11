import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllAdmin, dispatchGetAllAdmin} from '../../../redux/actions/usersAction'
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
    const users = useSelector(state => state.users)
    const [callback, setCallback] = useState(false)
    const [data, setData] =useState(initialState);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    //const {err} =data
    //const [administrateur, setAdministrateurs] = useState([]);
    const dispatch = useDispatch()
    const [open2, setOpen2] = React.useState(false);
    const rowData= users?.map(user => {
      return{
        id:user.uuid,
        name:user.name,
        email:user.email,
        tele  :user.tel,
        message:user.message,
        date:user.createdAt,  
        status:user.status,       
          //avatar:user.avatar,
         
          
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
                          {setSuccess('administrateur activé !');}
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
                          {setSuccess('administrateur bloqué !');}
                          if (message==='bloquation echouée')
                          {setErr('opération echouée');}
                          else{setErr("erreur");}})
                } catch (err) {
                  setErr("opération echouée");
                 // setData({...data, err: err.response.data.msg , success: ''})
           // setOpen2(true)
          }
        }

      useEffect(() => {
        
            fetchAllAdmin(token).then(res =>{
                dispatch(dispatchGetAllAdmin(res))
            })
        
      },[token, dispatch, callback])//isSuperAdmin
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
                            {setSuccess('administrateur supprimé !');}
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
          flex:2,
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
          flex:2,
        },
        {
            field: 'tele',
            headerName: 'Téléphone',
            flex:1,
          },
        {
          field: 'date',
          headerName: 'Date création',
          flex:2,
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
                <Button aria-describedby={id} className="btn-action" onClick={handleClick}>⋮</Button>
                    <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose1}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                        <Nav.Link className="actionNav" onClick={showbloquerConfirm}>Bloqué administrateur</Nav.Link>
                        <Divider />
                        <Nav.Link className="actionNav" onClick={showactiverConfirm}>Activer administrateur</Nav.Link>
                        <Divider />
                        <Nav.Link className="actionNav" onClick={showDeleteConfirm}>Supprimer administrateur</Nav.Link>
                    </Popover> 
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
