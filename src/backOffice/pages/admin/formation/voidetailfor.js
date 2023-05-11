import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getformation,

} from "../../../../redux/features/detailsforSlice";
import {  Form,  } from 'react-bootstrap'

import { Link, useParams } from "react-router-dom";
import PhoneIcon from "@material-ui/icons/Phone";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DescriptionIcon from "@material-ui/icons/Description";
import MessageIcon from "@material-ui/icons/Message";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import {  useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
/*function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}*/
function Voirdetailfor() {
  //const auth = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.details);

 
  const formation = useSelector(state => state.detailfor.fordet)

  
  const dispatch = useDispatch();
  const { id } = useParams();
  
  
  


 

  useEffect(() => {
  
      dispatch(getformation(id));
      
    }
  , [id, dispatch]);
  
  
 
    
 
  return (
    <div className="candidat">
      
     {/*style={{width:'400px'}}*/}
      <div  className="content-candidat">
      <Form >
           
            
          
           <Form.Group className="mb-3" >
          
           <Form.Label className="label">Image du cours:</Form.Label>
           <div className="content-affiche" style={{width:'50%' ,marginLeft:'25%'}}>
           <Form.Label htmlFor="file" style={{width:'500%',height: '20%'  }}> 
           {/*src={affiche ? affiche : formations.affiche}*/}
             <img src={formation?.url} alt="" className="affiche-img" style={{width:'100%'  }}/>
          {/* <p> <PhotoSizeSelectActualIcon /> Séléctionnez une image </p>*/}
           </Form.Label>
           </div>
        
           </Form.Group>
           </Form>
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
          {/*formation.email*/}
        </h5>
        <h5 className="info-candidat">
          <DescriptionIcon className="icon-details" />
          {formation.user?.name}
        </h5>
        <h5 className="info-candidat" >
          <MessageIcon className="icon-details" />
          {formation.affiche}
        </h5>
      </div>
      
    </div>
  );
}

export default Voirdetailfor;