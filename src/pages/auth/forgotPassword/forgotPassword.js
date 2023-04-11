import React, {useState} from 'react'
import axios from 'axios'
import {isEmail} from '../../../components/utils/validation/Validation'
import {ShowErrMsg, ShowSuccessMsg} from '../../../components/utils/notifications/Nofification'
import { Button,Form } from 'react-bootstrap'
import './forgotPassword.css'


import { Snackbar, Alert} from "@mui/material";

const initialState = {
    email: '',
    err: '',
    success: ''
}

function ForgotPassword() {
    const [data, setData] = useState(initialState)
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);





   const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
        setEmailError(value === '' || !/\S+@\S+\.\S+/.test(value));
      };
      const isFormValid = () => {
        // add validation rules here
        return  email !== ''  && !emailError ;
      };

    const forgotPassword = async (e) => {
      e.preventDefault();
       
            
      
         await axios.post('http://localhost:5000/users/getmail', {
                email: email,
               
              },{
                   headers: {'X-Requested-With': 'XMLHttpRequest', 
                   "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                   "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                   "withCredentials": true 
                }
                
                ).then((response) => {
                  const message = response.data.message;console.log(message)
                  if (message==='Mail sent successfully check your inbox')
                        {setSuccess('Mail sent successfully check your inbox');}
                        if (message==='user non trouve')
                        {setErr('utilisateur non trouvé');}
                        else{setErr("erreur");}})
                //setSuccess('Mail sent successfully check your inbox')
               // setData({ ...data, err: "", success: "Candidat accepté!" });
                //setOpen(true);console.log("aaaa")
                  //const msg = res.data.message;
                
        .catch( (err)=> {
          setErr('verifier le champs')
         // setData({ ...data, err: err.response.data.msg, success: "" });
          //setOpen1(true);
        
        })
    }
    
    
    return (
        <div className="fg_pass">
            <h2>Forgot Your Password?</h2>
                
                <Form >
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label className="labelForm" >Adresse E-mail</Form.Label>
    <Form.Control type="email" 
    name="email"
    required  placeholder="nom@gmail.com"
    value={email}
    onChange={handleEmailChange}
            isInvalid={emailError} 
             />
              <Form.Control.Feedback type="invalid">
              saisir un  email addresse valide
               </Form.Control.Feedback>
  </Form.Group>
  <button
           
             disabled={!isFormValid()} onClick={forgotPassword}
            variant="contained" style={{marginLeft:'30%', borderRadius:'5px', color:"white",backgroundColor:"#20384D",width:'170px',height:'35px'}}
            sx={{ mt: 3, mb: 2 }} className="connexion"
          >
            Verify your email
          </button>
         
  </Form> 
  <Snackbar autoHideDuration={2500} open={ err === "" ? false : true } onClose={()=>{ setErr("") }}  >
        <Alert variant="filled" severity="error" onClose={()=>{ setErr("") }} >
          {
            err
          }
        </Alert>
      </Snackbar>
      <Snackbar autoHideDuration={2500} open={ success === "" ? false : true } onClose={()=>{ setSuccess("") }}  >
        <Alert variant="filled" severity="success" onClose={()=>{ setSuccess("") }} >
          {
            success
          }
        </Alert>
      </Snackbar>
  
        </div>
    )
}

export default ForgotPassword;