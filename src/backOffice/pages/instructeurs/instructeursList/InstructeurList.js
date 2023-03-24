import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllInstr, dispatchGetAllInstr} from '../../../../redux/actions/usersAction'
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
import SnackbarErr from '../../../components/Snackbar/SnackbarErr';
import { Link } from 'react-router-dom';
import { isEmpty } from '../../../../Utils';

const { confirm } = Modal;

function InstructeurList() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id= open ? 'simple-popover' : undefined;
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin, isSuperAdmin } = auth ; 
    const users = useSelector(state => state.users)
   // const [users,setUsers] = useState([]) ; 
    const [callback, setCallback] = useState(false)
    const [data, setData] =useState([]);
    const {err} = data
    const dispatch = useDispatch()
    const [open2, setOpen2] = React.useState(false);
   

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




    const rowData=users?.map(user => {
      return{
          id:user.uuid,
          avatar:user.avatar,
          name:user.name,
          email:user.email,
          date:user.createdAt,
          tele:user.tel,
      }
     })
    
      const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        
      const handleClose1 = () => {
          setAnchorEl(null);
        };

      useEffect(() => {
        //if(isAdmin|| isSuperAdmin ){
              fetchAllInstr(token).then(res =>{
                  dispatch(dispatchGetAllInstr(res))
              })
        // }
        },[token, dispatch, callback])
       // ,isAdmin, isSuperAdmin
      const handleDelete = async (id) => {
          try {
              if(user._id !== id){
                      await axios.delete(`/user/delete/${id}`, {
                          headers: {Authorization: token}
                      })
                      setCallback(!callback)
                    }
                  } catch (err) {
              setData({...data, err: err.response.data.msg , success: ''})
              setOpen2(true)
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
            field: 'statut',
            headerName: 'Statut',
            flex:1,
            renderCell: (params) =>{
                return(
                  <div className={`${params.row.status ? "status-admin2" : "status-admin1"}`}> 
                  {
                    params.row.status ? 
                    <p className='p-admin'>BLOQUÉ</p>:
                    <p className='p-admin'>ACTIVÉ</p> 
                  }
                  </div>
                )
              }
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
              return(
                <>
                 <Link to={`/instructeur/${params.row.id}`}>
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
                            <Nav.Link className="actionNav">Bloqué instructeur</Nav.Link>
                            <Divider />
                            <Nav.Link className="actionNav" onClick={showDeleteConfirm}>Supprimer instructeur</Nav.Link>
                        </Popover> 
                </>
              )
            }
          },
      ];
        

  return (
    <div style={{ height: 550, width: '100%' }} >
      <Table row={rowData} columns={columns}/>
      <SnackbarErr err={err} open2={open2}/>
    </div>  
  )
}

export default InstructeurList