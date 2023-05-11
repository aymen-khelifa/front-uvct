import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getcandidatbyId,
  
} from "../../../../redux/features/usersSlice";import {Form } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";
import PhoneIcon from "@material-ui/icons/Phone";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DescriptionIcon from "@material-ui/icons/Description";
import "./Candidat.css";
import MessageIcon from "@material-ui/icons/Message";
import { Button } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import {Alert} from "@mui/material";
import {  useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Modal } from 'antd';



function Candidat() {
  const token = useSelector((state) => state.token);
  
  const candidat = useSelector((state) => state.user.candidat);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [callback] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [viewPdf , setviewPdf] = useState(null);
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [err , setErr] = useState("");
  const [success , setSuccess] = useState("");
  const navigate = useNavigate();
  

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
  useEffect(() => {
   
    dispatch(getcandidatbyId(id));
    
  }
, [token,id, dispatch]);
const handleMessageChange = (event) => {
    const { value } = event.target;
    setMessage(value);
    if (value.length < 10) {
      setMessageError(true);
    } else {
      setMessageError(false);
    }
  };

 
 
  const handleDelete = async (e) => {
    e.preventDefault() ;  
    try {console.log(message)
       
                await axios.delete(`http://localhost:5000/users/refusinst/${id}`,{message:message,},{
                    
                headers: {'X-Requested-With': 'XMLHttpRequest', 
                "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
               "withCredentials": true 
                }).then((response) => {
                  const message = response.data.message;console.log(message)
                  if (message==='candidat refusé !')
                        {setSuccess('candidat refusé !');setTimeout(()=>{navigate("/instructeurs")},2500);}
                        if (message==='refus echouée')
                        {setErr('refus echouée');}
                        else{setErr("erreur");}})
              
        } catch (err) {
          setErr("errrefus echoué");
     
    }
  }


  return (
    <div className="candidat">
      <Link to="/instructeurs">
        <ArrowBackIcon className="icon-back" />
      </Link>
      <div className="btn-repond">
        
       
      </div>
      <div className="content-candidat">
      <Form >
       
      <Form.Group className="mb-3" >
      <Form.Label className='labelForm'>Motif de refus:</Form.Label>
        <Form.Control type="text" as="textarea" rows={7}
         placeholder="Saissiez un message"
         name="message"
          required
          onChange={handleMessageChange}
          isInvalid={messageError}
          
        />
        <Form.Control.Feedback type="invalid">
        message est superieur à 10 character
               </Form.Control.Feedback>
      </Form.Group>
      
      <Button className="btn-refuser"
        onClick={handleDelete}
        
        >Refuser</Button>
  
  </Form>
        
        
        
      
        
       
      
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={open1}
        autoHideDuration={6000}
        onClose={handleClose1}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose1} severity="error">
          {err}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Candidat;
