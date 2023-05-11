import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {getCandidatFormateur} from '../../../../redux/features/usersSlice'
import VisibilityIcon from '@material-ui/icons/Visibility';
import {OverlayTrigger, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import DayJS from 'react-dayjs';
import {isEmail} from '../../../../components/utils/validation/Validation'
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import { Modal } from 'antd';
import '../Instructeurs.css'
import Table from '../../../components/table/Table';
import SnackbarSuccess from '../../../components/Snackbar/SnackbarSuccess';
import SnackbarErr from '../../../components/Snackbar/SnackbarErr';
import {Snackbar,Alert} from "@mui/material";
import {  useNavigate } from "react-router-dom";



const { confirm } = Modal;

function CandidatList() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user, isAdmin, isSuperAdmin} = auth
    const users = useSelector(state => state.user.candidats)
    const [callback, setCallback] = useState(false)
    const [data, setData] =useState([]);
    //const {success,err} = data
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const navigate = useNavigate();



    /*const [users,setUsers] = useState([]) ; 

    

    useEffect(()=>{
    

      axios.get('http://localhost:5000/formateurcandidat/formateurs', {
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
         // if(isAdmin|| isSuperAdmin ){
           
                  dispatch(getCandidatFormateur())
              
        //  }
      },[ dispatch])

      const rowData= users?.map(user => {
        return{
            id:user.uuid,
            name:user.name,
            email:user.email,
            specialite:user.speciality,
            tele:user.tel,
            date:user.createdAt,
        }
    })
//, isAdmin, isSuperAdmin,
      const handleDelete = async (id) => {
          try {
             
                      await axios.get(`http://localhost:5000/users/refusinst/${id}`, {
                          
                      headers: {'X-Requested-With': 'XMLHttpRequest', 
                      "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                      "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                     "withCredentials": true 
                      }).then((response) => {
                        const message = response.data.message;console.log(message)
                        if (message==='candidat refusé !')
                              {setSuccess('candidat refusé !');}
                              if (message==='refus echoué')
                              {setErr('refus echouée');}
                              else{setErr("erreur");}})
                    
              } catch (err) {
                setErr("errrefus echoué");
           
          }
        }

      const handleAccept = async (id) => {console.log(id);     
       try{
              
                   await axios.get(`http://localhost:5000/users/acceptinst/${id}`,
                    {
                      headers: {'X-Requested-With': 'XMLHttpRequest', 
                      "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                      "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                     "withCredentials": true 
                    }
                    ).then((response) => {
                      const message = response.data.message;console.log(message)
                      if (message==='candidat Accepté avec Success !')
                            {setSuccess('candidat Accepté avec Success !');setTimeout(()=>{navigate(`/user/acceptInstr/${id}`)},2500);}
                            if (message==='acceptation echouée')
                            {setErr('acceptation echouée');}
                            else{setErr("erreur");}})

                              
                  //setData({...data, err: '' , success: "Accept Success!"})
                 // setOpen(true);
                }catch(err) {
                  setErr('acceptation echouée');
                }
           
        }

               
       /* try {
          if(user.uuid !== uuid){
                await axios.post('http://localhost:5000/instructeur/ajouterinstr', {email}, {
                  name: user.name,
                  email:user.email,
                  password:user.password,
                  tel: user.tel,
                  speciality:user.speciality,
                },{
                  
                  headers: {'X-Requested-With': 'XMLHttpRequest', 
                  "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                  "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                 "withCredentials": true 
                })
              setData({...data, err: '' , success: "Accept Success!"})
              setOpen(true);
            }  */
     
      const columns = [
        {
          field: 'name',
          headerName: 'Nom',
          flex:1,
        },
        {
          field: 'email',
          headerName: 'Email',
          type: 'email',
          flex:1.5,
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
          headerName: 'Date envoi',
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
              function showAccepte() {
                confirm({
                  title:'Êtes-vous sûr de vouloir accepter ce candidat?',
                  icon: <CheckCircleOutlineIcon className="iconCheck"/>,
                  okText: 'Accepter',
                  okType: 'primary',
                  cancelText: 'Annuler',
                  onOk() {
                    handleAccept(params.row.id) 
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              }
              function showRefuse() {
                confirm({
                  title: 'Êtes-vous sûr de vouloir refuser ce candidat?',
                  icon: <CancelIcon className="iconCancel"/>,
                  okText: 'Refuser',
                  okType: 'danger',
                  cancelText: 'Annuler',
                  onOk() {
                    handleDelete(params.row.id);
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
              }
              
              return(
                  <div className="action-candidat">
                  <OverlayTrigger placement="bottom" 
                    overlay={<Tooltip id="button-tooltip-2">Voir détails</Tooltip>}>
                    <Link to={"/candidat/"+params.row.id}>
                      <VisibilityIcon className='icon-action'/>
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger placement="bottom" 
                    overlay={<Tooltip id="button-tooltip-2">refuser</Tooltip>}>
                    <Link to={"/refusinst/"+params.row.id}>
                      <CancelIcon className='icon-action'/>
                    </Link>
                  </OverlayTrigger>
                  <CheckCircleOutlineIcon className="icon-candidat2" onClick={showAccepte} />
                        
                </div>
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


export default CandidatList