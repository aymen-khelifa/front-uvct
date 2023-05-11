import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getInstructeur, userSelectors} from '../../../../redux/features/usersSlice'
import axios from 'axios'
import Avatar1 from '../../../../components/Avatar/Avatar';
import DayJS from 'react-dayjs';
import {Nav } from 'react-bootstrap';
import Popover from '@material-ui/core/Popover';
import { Divider } from '@material-ui/core'
import { Modal, Button} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Table from '../../../components/table/Table';
import { Link } from 'react-router-dom';
import {Snackbar,Alert} from "@mui/material";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Tooltip from "@mui/material/Tooltip";
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';



const { confirm } = Modal;

function InstructeurList() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id= open ? 'simple-popover' : undefined;
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const users = useSelector(state => state.user.instructeurs)
    //const {user, isAdmin, isSuperAdmin } = auth ; 
    //const users = useSelector(userSelectors.selectAll)
   // const [users,setUsers] = useState([]) ; 
    const [callback, setCallback] = useState(false)
    const [data, setData] =useState([]);
    //const {err} = data
    const dispatch = useDispatch()
    const [open2, setOpen2] = React.useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    console.log(users)

  /*  useEffect(()=>{
    

        axios.get('http://localhost:5000/instructeur/getinstr', {
        },{
            headers: {'X-Requested-With': 'XMLHttpRequest', 
            "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
            "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
           "withCredentials": true 
         }).then(res=> {console.log(res.data)  ; 
           setUsers(res.data) ; }
      
      
      ) ; 

        console.log(users);
    },[])

*/


 
 useEffect(() => {
        //if(isAdmin|| isSuperAdmin ){
              
                  dispatch(getInstructeur())
              
        // }
        },[dispatch])
    const rowData=users?.map(user => {
      return{
          id:user.uuid,
          avatar:user.url1,
          name:user.name,
          email:user.email,
          specialite:user.speciality,
          date:user.createdAt,
          tele:user.tel,
          status:user.status,
      }
     })
   
      const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        
      const handleClose1 = () => {
          setAnchorEl(null);
        };

     
       // ,isAdmin, isSuperAdmin
      const handleDelete = async (id) => {
          try {
              
                      await axios.get(`http://localhost:5000/users/supprimerinstr/${id}`, {
                        headers: {'X-Requested-With': 'XMLHttpRequest', 
                        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                       "withCredentials": true 
                      
                    }).then((response) => {
                      const message = response.data.message;console.log(message)
                      if (message==='instructeur supprimé !')
                            {setSuccess('instructeur supprimé !');window.location.reload()}
                            if (message==='suppression echouée')
                            {setErr('suppression echouée');}
                            else{setErr("erreur");}})
                            
                  } catch (err) {
                    setErr("suppression echouée");
                   // setData({...data, err: err.response.data.msg , success: ''})
             // setOpen2(true)
            }
          }
          
          const handleactive = async (id) => {
            try {
                
                        await axios.patch(`http://localhost:5000/users/activerinstr/${id}`, {
                          headers: {'X-Requested-With': 'XMLHttpRequest', 
                          "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                          "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                         "withCredentials": true 
                        
                      }).then((response) => {
                        const message = response.data.message;console.log(message)
                        if (message==='instructeur activé !')
                              {setSuccess('instructeur activé !');window.location.reload()}
                              if (message==='activation echouée')
                              {setErr('activation echouée');}
                              if (message==='instructeur deja activé !')
                              {setErr('instructeur deja activé !');}
                              else{setErr("erreur");}})
                              

                    } catch (err) {
                      setErr("activation echouée");
                     // setData({...data, err: err.response.data.msg , success: ''})
               // setOpen2(true)
              }
            }
          const handlebloque = async (id) => {
            try {
                
                        await axios.patch(`http://localhost:5000/users/bloquerinstr/${id}`, {
                          headers: {'X-Requested-With': 'XMLHttpRequest', 
                          "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                          "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                         "withCredentials": true 
                        
                      }).then((response) => {
                        const message = response.data.message;console.log(message)
                        if (message==='instructeur bloqué !')
                              {setSuccess('instructeur bloqué !');window.location.reload()}
                              if (message==='bloquation echouée')
                              {setErr('opération echouée');}
                              if (message==='instructeur deja bloqué !')
                              {setErr('instructeur deja bloqué !');}
                              else{setErr("erreur");}})
                              

                    } catch (err) {
                      setErr("opération echouée");
                     // setData({...data, err: err.response.data.msg , success: ''})
               // setOpen2(true)
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
          flex:1.7,
        },
        {
          field: 'specialite',
          headerName: 'Spécialité',
          flex:1.5,
        },
        {
            field: 'tele',
            headerName: 'Téléphone',
            flex:1,
          },
        {
          field: 'date',
          headerName: 'Date création',
          flex:1.6,
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
            flex:1.5,
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
                  title: 'Êtes-vous sûr de vouloir bloquer ce compte instructeur?',
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
                  title:'Êtes-vous sûr de vouloir activer ce compte instructeur?',
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
                 <Link to={`/instructeur/${params.row.id}`}><Tooltip title="voir détails">
                 <VisibilityIcon className='icon-action'/></Tooltip>
                 </Link>
                 <Tooltip title="bloquer">
                 <BlockIcon className='icon-action' onClick={showbloquerConfirm} />
                 </Tooltip>
                 <Tooltip title="activer">
                 <LockOpenIcon className='icon-action' onClick={showactiverConfirm} />
                 </Tooltip>
                 <Tooltip title="supprimer">
                 <DeleteOutlineIcon className='icon-action' onClick={showDeleteConfirm} />
                 </Tooltip>
                    
                </>
              )
            }
          },
      ];
        

  return (
    <div style={{ height: 550, width: '100%' }} >
      <Table row={rowData} columns={columns}/>
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

export default InstructeurList