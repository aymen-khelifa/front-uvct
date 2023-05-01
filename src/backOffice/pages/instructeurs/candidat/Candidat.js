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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Viewer,Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { pdfjs } from 'react-pdf';


import CancelIcon from '@mui/icons-material/Cancel';
const { confirm } = Modal;
function Candidat() {
  const token = useSelector((state) => state.token);
  
  const candidat = useSelector((state) => state.user.candidat);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [callback] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [viewPdf , setviewPdf] = useState(null);

  const [err , setErr] = useState("");
  const [success , setSuccess] = useState("");
  const navigate = useNavigate();
  function showAccepte() {
    confirm({
      title:'Êtes-vous sûr de vouloir accepter ce candidat?',
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
      title: 'Êtes-vous sûr de vouloir refuser ce candidat?',
      icon: <CancelIcon className="iconCancel"/>,
      okText: 'Refuser',
      okType: 'danger',
      cancelText: 'Annuler',
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
  useEffect(() => {
   
    dispatch(getcandidatbyId(id));
    
  }
, [token,id, dispatch]);

  const handleSubmit=(e)=>
  {
    e.preventDefault()
    if(candidat.cv!==null)
    {setviewPdf(candidat.url)}
    else {
      setviewPdf(null)
    }
  }
  const newplugin=defaultLayoutPlugin()
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
  const handleAccept = async (id) => {
    
    try {
      //if (candidat._id !== id) {
        await axios.get(
          `http://localhost:5000/users/acceptinst/${id}`,
          {
           // headers: { Authorization: token },
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
        
                  
       // setData({ ...data, err: "", success: "Candidat accepté!" });
        //setOpen(true);
      //}
    } catch (err) {
      setErr("acceptation echouée !");
      //setData({ ...data, err: err.response.data.msg, success: "" });
      //setOpen1(true);
    }
  };

  return (
    <div className="candidat">
      <Link to="/instructeurs">
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
         {candidat.name}
      </h5>
        <h5 className="info-candidat">
          <WorkOutlineIcon className="icon-details" />
          {candidat.speciality}
        </h5>
        <h5 className="info-candidat">
          <PhoneIcon className="icon-details" />
          {candidat.tel}
        </h5>
        <h5 className="info-candidat">
          <MailOutlineIcon className="icon-details" />
          {candidat.email}
        </h5>
        <h6 className="info-candidat">
        <MessageIcon className="icon-details" />
      {/*Message:*/}
        </h6>
        <Form.Group className="mb-3" >
                <Form.Control as="textarea" rows={8} 
                defaultValue={candidat.message}
                required  disabled
              />
            </Form.Group>
        <h5 className="info-candidat">
          <DescriptionIcon className="icon-details" />
          CV :             <Button type="submit" className='btn-confirme' onClick={handleSubmit} >ouvrir cv</Button>
        </h5>
        
       <div style={{width:'100%',height:'1350px',overflow:'auto',display:'flex',
        justifyContent:'center',alignItems:'center'}}>

          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {viewPdf && <>  
          
          <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
           
          </>}
          {!viewPdf && <>no pdf</>}


          </Worker>
        </div>
       
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
