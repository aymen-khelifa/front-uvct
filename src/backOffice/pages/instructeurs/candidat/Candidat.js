import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserDetails,
  dispatchGetUserDetails,
} from "../../../../redux/actions/authAction";
import { isEmail } from "../../../../components/utils/validation/Validation";
import { Link, useParams } from "react-router-dom";
import PhoneIcon from "@material-ui/icons/Phone";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DescriptionIcon from "@material-ui/icons/Description";
import "./Candidat.css";
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
function Candidat() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  //const  candidat  = auth;
  const {candidat} = auth

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [callback] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState([]);
  //const { err, success } = data;
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
    fetchUserDetails(token,id).then((res) => {
      dispatch(dispatchGetUserDetails(res));
      
    })
  }, [token,id, dispatch,callback]);
  console.log(candidat)
  
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
        <h5 className="info-candidat">
          <DescriptionIcon className="icon-details" />
          {candidat.cv}
        </h5>
        <h5 className="info-candidat" id="message">
          <MessageIcon className="icon-details" />
          {candidat.message}
        </h5>
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
