import "./WidgetSm.css"
import VisibilityIcon from '@material-ui/icons/Visibility';
import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {fetchAllCond, dispatchGetAllCond} from '../../../redux/actions/usersAction'
import {OverlayTrigger, Tooltip } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import Table from '../widgetSm/Tables';

import {Snackbar,Alert} from "@mui/material";
import {  useNavigate } from "react-router-dom";
export default function WidgetSm() {
  const auth = useSelector(state => state.auth)
  const token = useSelector(state => state.token)
  const {user, isAdmin, isSuperAdmin} = auth
  const users = useSelector(state => state.users)
  const [callback, setCallback] = useState(false)
  const [data, setData] =useState([]);
  //const {success,err} = data
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [err , setErr] = useState("");
  const [success , setSuccess] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    // if(isAdmin|| isSuperAdmin ){
       fetchAllCond(token).then(res =>{
             dispatch(dispatchGetAllCond(res))
         })
   //  }
 },[token, dispatch, callback])


 const columns = [
  {
    field: 'name',
    headerName: 'Nom',
    flex:1,
  },
  {
    field: 'specialite',
    headerName: 'Spécialité',
    flex:1,
  },
  {
    field: 'action',
    headerName: 'Voir details',
    flex:0.5,
    renderCell: (params) =>{
        return(
          <div className="action-candidat">
          <OverlayTrigger placement="bottom" 
            overlay={<Tooltip id="button-tooltip-2">Voir détails</Tooltip>}>
            <Link to={"/candidat/"+params.row.id}>
              <VisibilityIcon className='icon-action'/>
            </Link>
          </OverlayTrigger>
              
        </div>
      )
        }}
      
      
      ]
      const rowData= users?.map(user => {
        return{
            id:user.uuid,
            name:user.name,
            specialite:user.speciality,
           
        }
    })
  return (
    <div style={{ height: 353, width: '48%' ,backgroundColor:"white",marginTop:'10px',}} className="aa" >
    <h4 className="widgetTitle1"  > Nouvelles candidatures</h4>
    <div style={{ height: 303, width: '100%' ,backgroundColor:"white",marginTop:'10px',}} >
    
    <Table border='none' row={rowData} columns={columns}/>
    
   </div> </div>
  )
}
