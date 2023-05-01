import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  
    getformationcandi
} from "../../../../redux/features/detailsforSlice";
import {  Form,  } from 'react-bootstrap'

import { Link, useParams } from "react-router-dom";
import PhoneIcon from "@material-ui/icons/Phone";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DescriptionIcon from "@material-ui/icons/Description";
import "../../instructeurs/candidat/Candidat.css";
import MessageIcon from "@material-ui/icons/Message";
import { Button } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import {Alert} from "@mui/material";
import {  useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Modal } from 'antd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
/*function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}*/
import CancelIcon from '@mui/icons-material/Cancel';
const { confirm } = Modal;
function Acceptforcan() {
  
  const formation = useSelector((state) => state.detailfor.candidatfordet);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [message, setMessage] = useState("");
    
  const dispatch = useDispatch();
  const { id } = useParams();
 
  const [err , setErr] = useState("");
  const [success , setSuccess] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    //getcanforbyId
    dispatch(getformationcandi(id));
    
  }
, [id, dispatch]);

const handleMessageChange = (event) => {
  const { value } = event.target;
  setMessage(value);
  
};
  function showAccepte() {
    
    confirm({
      title:'Êtes-vous sûr de vouloir accepter cette formation?',
      icon: <CheckCircleIcon className="iconCheck"/>,
      okText: 'Accepter',
      okType: 'primary',
      cancelText: 'Annuler',
      onOk() {
        handleAccept(id) 
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  function showRefuse() {
    confirm({ 
    
      title: 'Êtes-vous sûr de vouloir refuser cette formation?',
      icon: <CancelIcon className="iconCancel"/>,
      okText: 'Refuser',
      okType: 'danger',
      cancelText: 'Annuler',
      content: (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="label">motif de refus</Form.Label>
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
      ),
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });}


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen1(false);
  };
 

  
  
  const handleDelete = async (id) => {
    await axios.get(`http://localhost:5000/formations/supprformation/${id}`,{message:message}, {
        // headers: {Authorization: token}
        headers: {'X-Requested-With': 'XMLHttpRequest', 
        "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
        "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
       "withCredentials": true 
       }).then((response)=>{
         if(response.data.message==='formation supprimé !')
         {setSuccess('formation supprimé !')}
         if(response.data.message==='suppression echouée')
         {setErr('suppression echouée')}
         }
          ).catch( (err)=> {
            setErr('erreur')
 
           })
  }
  const handleAccept = async (id) => {
    try{
        await axios.patch(`http://localhost:5000/formations/accepterformation/${id}`,{
            headers: {'X-Requested-With': 'XMLHttpRequest', 
           "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
           "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
          "withCredentials": true 
          // {Authorization: token}
       }).then((res)=>{console.log(res.data.message)
         if(res.data.message==='formation acceptée !')
         {setSuccess('formation acceptée !')}
         if(res.data.message==='acceptation echouée')
         {setErr('acceptation echouée')}
       
       }
       
   ).catch( (err)=> {
     setErr('acceptation echouée')
       
     })}catch{ setErr('acceptation echouée')}
  };

  return (
    <div className="candidat">
      <Link to="/all-formations">
        <ArrowBackIcon className="icon-back" />
      </Link>
      <div className="btn-repond">
        <Button className="btn-refuser"
        onClick={showRefuse} 
        //onClick={() => handleAccept(candidat.id)}
        >Refuser</Button>
        <Button
          className="btn-accepter"
          //onClick={() => handleAccept(candidat.id)}
          onClick={showAccepte}
        >
          Accepter
        </Button>
      </div>
      <div className="content-candidat">
      <h5  className="info-candidat">
      <AccountCircleIcon className="icon-details" />
         {formation.title}
      </h5>
        <h5 className="info-candidat">
          <WorkOutlineIcon className="icon-details" />
          {formation.price}
        </h5>
        <h5 className="info-candidat">
          <PhoneIcon className="icon-details" />
          {formation.categorie}
        </h5>
        <h5 className="info-candidat">
          <MailOutlineIcon className="icon-details" />
          {formation.user.name}
        </h5>
        <h5 className="info-candidat">
          <DescriptionIcon className="icon-details" />
          {/*formation.inscrption*/}
        </h5>
        <h5 className="info-candidat" id="message">
          <MessageIcon className="icon-details" />
          {formation.affiche}
        </h5>
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
  );
}

export default Acceptforcan;
