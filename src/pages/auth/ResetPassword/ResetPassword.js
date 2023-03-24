import React, {useState} from 'react'
import axios from 'axios'
import {useParams,useNavigate} from 'react-router-dom'
import {ShowErrMsg, ShowSuccessMsg} from '../../../components/utils/notifications/Nofification'
import {isLength, isMatch} from '../../../components/utils/validation/Validation'
import { Button ,Form} from 'react-bootstrap'
import './RestPassword.css'
import { Snackbar, Alert} from "@mui/material";

/*const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}*/

function ResetPassword() {
   // const [data, setData] = useState(initialState)
    const {token} = useParams()
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [confpassword, setConfPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [confPasswordError, setConfPasswordError] = useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const navigate = useNavigate();

    //const {password, cf_password, err, success} = data

    /*const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
    }*/


    const updateUser = async () => {
      
      await axios.patch('http://localhost:5000/users/update', {
          email: email,
          password: password,
          confpassword: confpassword,
        }, {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5000',
            'Access-Control-Request-Methods': 'POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS'}, 
            "withCredentials": true 
         

        }).then(response => {
          const message = response.data.message;console.log(message)
          if (message==='mot de passe modifié')
                {setSuccess('mot de passe modifié');setTimeout(()=>{navigate("/connexion")},2500);}
                if (message==='Password and Confirmation Password does not match')
                {setErr('Password and Confirmation Password does not match');setTimeout(()=>{navigate("/connexion")},2500);}
                else{setErr("erreur");}
          
         // setSuccess('mot de passe modifié')
         setTimeout(()=>{navigate("/coneexion")},2000);
        })
        .catch(error => {
           setErr('Password and Confirmation Password does not match');
        });
        
        
       
      
   
    };

    const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
        setEmailError(value === '' || !/\S+@\S+\.\S+/.test(value));
      };
      const isFormValid = () => {
        // add validation rules here
        return  email !== ''  && !emailError ;
      };
    
      const handlePasswordChange = (event) => {
        const { value } = event.target;
        setPassword(value);
        setPasswordError(value.length < 8);
      };
      const handlePasswordConfChange = (event) => {
        const { value } = event.target;
        setConfPassword(value);
        setConfPasswordError(value.length < 8);
      };
    return (
        <div className="rest_pass">
            <h2>Reset Your Password</h2>
               
                <Form onSubmit={updateUser}>
         <Form.Group className="mb-3" controlId="formBasicEmail">
         <Form.Label className="labelForm" >Adresse e-mail</Form.Label>
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
               <Form.Label className="labelForm" >Nouveau mot de passe</Form.Label>
          <Form.Control type="password" placeholder="Nouveau mot de passe" 
               name="password"
                  required autoComplete="true" 
                  onChange={handlePasswordChange}
              isInvalid={passwordError}
            
            />
             <Form.Control.Feedback type="invalid">
             mot de passe contient 8 caracteres
  </Form.Control.Feedback> 
 
  
  <Form.Label className="labelForm" >confirm mot de passe</Form.Label>
    <Form.Control type="password" placeholder="Confirm mot de passe" 
    name="cf_password"
    required autoComplete="true" 
    onChange={handlePasswordConfChange}
              isInvalid={confPasswordError}
            
            />
             <Form.Control.Feedback type="invalid">
             mot de passe contient 8 caracteres
  </Form.Control.Feedback> 
  </Form.Group>
  <button
            type="submit" 
             disabled={!isFormValid()} 
            //onChange={handleResetPass}
            variant="contained" style={{marginLeft:'30%', borderRadius:'5px', color:"white",backgroundColor:"#20384D",width:'170px',height:'35px'}}
            sx={{ mt: 3, mb: 2 }} className="connexion"
          >
            Reset Password
          </button>
  </Form>
  <Snackbar autoHideDuration={3000} open={ err === "" ? false : true } onClose={()=>{ setErr("") }}  >
        <Alert variant="filled" severity="error" onClose={()=>{ setErr("") }} >
          {
            err
          }
        </Alert>
      </Snackbar>
      <Snackbar autoHideDuration={3000} open={ success === "" ? false : true } onClose={()=>{ setSuccess("") }}  >
        <Alert variant="filled" severity="success" onClose={()=>{ setSuccess("") }} >
          {
            success
          }
        </Alert>
      </Snackbar>
        </div>
    )
}

export default ResetPassword;