import React ,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getformations} from '../../../../redux/features/formationSlice'
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
import { Snackbar, Alert} from "@mui/material";
import { Link } from 'react-router-dom';
import {  Form,  } from 'react-bootstrap'

import Table from '../../../components/table/Table';

const { confirm } = Modal;


function Formation() {
  const token = useSelector(state => state.token)
  const formations = useSelector((state) => state.formation.formatiozn)
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const [message, setMessage] = useState("");
    
    const handleMessageChange = (event) => {
        const { value } = event.target;
            setMessage(value);
            
          };
  console.log(formations)
  const data= formations?.map(formation => {
    return{
        id:formation.uuid,
        title:formation.title,
        affiche:formation.affiche,
        date:formation.createdAt,
        categorie:formation.categorie,
        instructeur:formation.user.name,  
      
    }
  })
      
        useEffect(() => {
                 
                        dispatch(getformations())
                   
        },[dispatch]) ; 

        

        const handleDelete = async (id) => {
          console.log(message);
             
                      await axios.get(`http://localhost:5000/formations/supprformation/${id}`,{message:message}, {
                          //headers: {Authorization: token}
                          headers: {'X-Requested-With': 'XMLHttpRequest', 
                          "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                          "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                         "withCredentials": true 
                        }).then((response)=>{
                          if(response.data.message==='formation supprimé !')
                          {setSuccess('formation supprimé !');window.location.reload()}
                          if(response.data.message==='suppression echouée')
                          {setErr('suppression echouée')}
                          }
              ).catch( (err)=> {
                setErr('erreur')
                  
                })
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
         
          { field:'instructeur',
            headerName: 'Instructeur',
            flex:2,
          
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
                    /*content: (
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label className="label">motifqq de refus</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Saisissez la description de votre cours."
                            name="description"
                            onChange={handleMessageChange}
                            
                          />
                          <Form.Control.Feedback type="invalid">
                            La description est requise et doit comporter au moins 4 caractères.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Form>
                    ),*/
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
                   <Link to={`/formation/${params.row.id}`}>
                 <VisibilityIcon className='icon-action'/>
                 </Link>
                 
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
          <Snackbar autoHideDuration={1500} open={ err === "" ? false : true } onClose={()=>{ setErr("") }}  >
        <Alert variant="filled" severity="error" onClose={()=>{ setErr("") }} >
          {
            err
          }
        </Alert>
      </Snackbar>
      <Snackbar autoHideDuration={1500} open={ success === "" ? false : true } onClose={()=>{ setSuccess("") }}  >
        <Alert variant="filled" severity="success" onClose={()=>{ setSuccess("") }} >
          {
            success
          }
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Formation