import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getinstructeurbyId,

} from "../../../../redux/features/usersSlice";
import {Form } from "react-bootstrap";

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
  //const auth = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.details);

  const token = useSelector((state) => state.token);
  //const  candidat  = auth;
  //const {instructeur} = auth
  const users = useSelector(state => state.user.instructeur)

  //const users = useSelector(userSelectors.selectAll)
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
          
    dispatch(getinstructeurbyId(id))

},[dispatch])
 
 
  
  
 
    
 
  return (
    <div className="candidat">
      <Link to="/instructeurs">
        <ArrowBackIcon className="icon-back" />
      </Link>
     {/*style={{width:'400px'}}*/}
      <div  className="content-candidat">
      <h5  className="info-candidat">
      <AccountCircleIcon className="icon-details" />
         {users.name}
      </h5>
        <h5 className="info-candidat">
          <WorkOutlineIcon className="icon-details" />
          {users.speciality}
        </h5>
        <h5 className="info-candidat">
          <PhoneIcon className="icon-details" />
          {users.tel}
        </h5>
        <h5 className="info-candidat">
          <MailOutlineIcon className="icon-details" />
          {users.email}
        </h5>
        <h5 className="info-candidat">
          <DescriptionIcon className="icon-details" />
          {users.cv}
        </h5>
     
            <Form.Group className="mb-3" ><MessageIcon className="icon-details" />
                <Form.Control as="textarea" rows={7} 
                defaultValue={users.message}
                required  disabled
              />
            </Form.Group>
        
      </div>
      
    </div>
  );
}

export default Voirdetails;
