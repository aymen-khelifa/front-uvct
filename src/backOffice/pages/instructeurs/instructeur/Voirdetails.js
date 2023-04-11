import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserDetails1,
  dispatchGetUserDetails1,
} from "../../../../redux/actions/authAction";
import { Link, useParams } from "react-router-dom";
import PhoneIcon from "@material-ui/icons/Phone";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DescriptionIcon from "@material-ui/icons/Description";
import MessageIcon from "@material-ui/icons/Message";
import { Button } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import {  useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
/*function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}*/
function Voirdetails() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  //const  candidat  = auth;
  const {instructeur} = auth

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
  
  


 

  useEffect(() => {
    fetchUserDetails1(token,id).then((res) => {
      dispatch(dispatchGetUserDetails1(res));
      
    })
  }, [token,id, dispatch,callback]);
  console.log(instructeur)
  
 
    
 
  return (
    <div className="candidat">
      <Link to="/instructeurs">
        <ArrowBackIcon className="icon-back" />
      </Link>
     {/*style={{width:'400px'}}*/}
      <div  className="content-candidat">
      <h5  className="info-candidat">
      <AccountCircleIcon className="icon-details" />
         {instructeur.name}
      </h5>
        <h5 className="info-candidat">
          <WorkOutlineIcon className="icon-details" />
          {instructeur.speciality}
        </h5>
        <h5 className="info-candidat">
          <PhoneIcon className="icon-details" />
          {instructeur.tel}
        </h5>
        <h5 className="info-candidat">
          <MailOutlineIcon className="icon-details" />
          {instructeur.email}
        </h5>
        <h5 className="info-candidat">
          <DescriptionIcon className="icon-details" />
          {instructeur.cv}
        </h5>
        <h5 className="info-candidat" >
          <MessageIcon className="icon-details" />
          {instructeur.message}
        </h5>
      </div>
      
    </div>
  );
}

export default Voirdetails;
