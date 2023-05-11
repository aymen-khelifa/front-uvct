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
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Viewer,Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { pdfjs } from 'react-pdf';
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
  const [viewPdf , setviewPdf] = useState(null);

  


  useEffect(() => {
          
    dispatch(getinstructeurbyId(id))
console.log(users);
},[dispatch])
 
const handleSubmit=(e)=>
{console.log("aa")
  e.preventDefault()
  if(users?.cv!==null)
  {setviewPdf(users?.url)}
  else {
    setviewPdf(null)
  }
}
const newplugin=defaultLayoutPlugin()
  
  
 
    
 
  return (
    <div className="candidat">
      <Link to="/instructeurs">
        <ArrowBackIcon className="icon-back" />
      </Link>
     {/*style={{width:'400px'}}*/}
      <div  className="content-candidat">
      <Form.Label > photo de profile :</Form.Label>
      <Form className='form-profil'>
       <Form.Group className="mb-3">
         <div className='profile-pic-div'>
         <img src={users?.url1} alt="image" className="avatar-img" />
        
        
           <div className="uploadBtn">
           <Form.Label htmlFor="file"> 
           
           </Form.Label>
           </div>
         </div>
         <Form.Control type="file"  id="file"
              name="avatar"
              //defaultValue={users?.image}
              style={{display:"none"}}
          /> 
           </Form.Group>
          </Form>
        
      <h5  className="info-candidat">
      <AccountCircleIcon className="icon-details" />
         {users?.name}
      </h5>
        <h5 className="info-candidat">
          <WorkOutlineIcon className="icon-details" />
          {users?.speciality}
        </h5>
        <h5 className="info-candidat">
          <PhoneIcon className="icon-details" />
          {users?.tel}
        </h5>
        <h5 className="info-candidat">
          <MailOutlineIcon className="icon-details" />
          {users?.email}
        </h5>
        <Form.Group className="mb-3" ><MessageIcon className="icon-details" />
                <Form.Control as="textarea" rows={7} 
                defaultValue={users?.message}
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
      
    </div>
  );
}

export default Voirdetails;
