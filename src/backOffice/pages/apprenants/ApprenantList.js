import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { getApprenant} from '../../../redux/features/usersSlice'
import axios from 'axios'
import VisibilityIcon from '@material-ui/icons/Visibility';
import Avatar1 from '../../../components/Avatar/Avatar';
import DayJS from 'react-dayjs';
import {OverlayTrigger,Tooltip} from 'react-bootstrap';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import './Apprenants.css'
import Table from '../../components/table/Table';
import {Snackbar,Alert} from "@mui/material";
import { Link } from 'react-router-dom';


const { confirm } = Modal;

function ApprenantList() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin, isSuperAdmin} = auth
    const users = useSelector(state => state.user.apprenants)
    const [callback, setCallback] = useState(false)
    const [data, setData] =useState([]);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const dispatch = useDispatch()
    //const [users,setUsers] = useState([]) ; 
    const rowData= users?.map(user => {
      return{
          id:user.uuid,
          name:user.name,
          email:user.email,
          avatar:user.avatar,
          date:user.createdAt,
          tele:user.tel,
      }
     })

   
   
   
   /*  useEffect(()=>{
    

      axios.get('http://localhost:5000/users/getapprenant', {
      },{
          headers: {'X-Requested-With': 'XMLHttpRequest', 
          "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
          "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
         "withCredentials": true 
       }).then(res=> {console.log(res.data)  ; 
         setUsers(res.data) ; }
    
    
    ) ;

      console.log(users);
  },[]) */
    
      useEffect(() => {
        //  if(isAdmin || isSuperAdmin){
             
                  dispatch(getApprenant())
              
              
        //  }
      },[ dispatch])
   //   ,isAdmin, isSuperAdmin,
      const handleDelete = async (id) => {
          try {
              
                      await axios.get(`http://localhost:5000/users/deleteapprenant/${id}`, {
                        headers: {'X-Requested-With': 'XMLHttpRequest', 
                        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                       "withCredentials": true 
                      }).then((response) => {
                        const message = response.data.message;console.log(message)
                        if (message==='apprenant supprimé !')
                              {setSuccess('apprenant supprimé !');}
                              if (message==='suppression echouée')
                              {setErr('suppression echouée');}
                              else{setErr("erreur");}})
                    
                     
              
              
          } catch (err) {
            setErr("suppression echouée");
              //setData({...data, err: err.response.data.msg , success: ''})
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
            field: 'action',
            headerName: 'Action',
            flex:1,
            renderCell: (params) =>{
              function showDeleteConfirm() {
                confirm({
                  title: 'Êtes-vous sûr de vouloir supprimer ce compte apprenant?',
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
                <Link to={`/apprenant/${params.row.id}`}>
                <VisibilityIcon  className='icon-action'/>
                </Link>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="button-tooltip-2">Supprimer apprenant</Tooltip>}>
              <DeleteOutlineIcon onClick={showDeleteConfirm} className="icon-delete"/>
              </OverlayTrigger>
                </>
              )
            }
          },
      ];
     
  return (
      <div className="apprenat-list">
        <div className="header-instructeur">
        <h1 className='title-instructeur'>Liste apprenants</h1>
        <Button className='btn-add-instructeur' href='/ajout-apprenant'>
        <AddIcon />Apprenants</Button>
      </div>
            <div style={{ height: 550 }} className="tableau">
            <Table row={rowData} columns={columns}/>
            </div> 
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

export default ApprenantList