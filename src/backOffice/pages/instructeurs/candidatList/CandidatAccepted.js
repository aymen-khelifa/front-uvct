import React, {useState} from 'react'
import axios from 'axios'
import {isLength, isMatch} from '../../../../components/utils/validation/Validation'
import {ShowSuccessMsg, ShowErrMsg} from '../../../../components/utils/notifications/Nofification'
import { Button,Form } from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
//import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {Snackbar,Alert} from "@mui/material";

import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//function Alert(props) {
 // return <MuiAlert elevation={6} variant="filled" {...props} />;
//}

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function CandidatAccepted() {
    const {id} = useParams()
    const [data, setData] = useState(initialState)
   // const { password, cf_password,success,err} = data
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [confpassword, setConfPassword] = useState("");
    const [confPasswordError, setConfPasswordError] = useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    //const dispatch = useDispatch();
    const navigate = useNavigate();
  

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen1(false);
      };

     /*const handleChange = e => {

        const {name, value} = e.target

        setData({...data, [name]:value, err:'', success: ''})
    }*/

    const handleEmailChange = (event) => {
      const { value } = event.target;
      setEmail(value);
      setEmailError(value === '' || !/\S+@\S+\.\S+/.test(value));
    };
    const isFormValid = () => {
      // add validation rules here
      return   password !== ''  && !passwordError && confpassword !== ''  && !confPasswordError ;
    };
  
    const handlePasswordChange = (event) => {
      const { value } = event.target;
      setPassword(value);
      setPasswordError(value.length < 8);
    };
    const handlePasswordConfChange = (event) => {
      const { value } = event.target;
      setConfPassword(value);
      setConfPasswordError(value.length < 8 );
    };
const updatePassword = async () => {
       // if(isLength(password))
       //     return setData({...data, err: "Password must be at least 6 characters.", success: ''})
       console.log('aa')
        if(!isMatch(password, confpassword))
           { setErr("Password did not match")}
     
       else{ try{
        await axios.patch(`http://localhost:5000/users/ajoutmdpinstr/${id}`, {
            password: password
          
          },{ headers: {'X-Requested-With': 'XMLHttpRequest', 
            "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
            "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
           "withCredentials": true }
            ).then((response) => {
              const message = response.data.message;console.log(message)
              if (message==='mail envoyé !')
                    {setSuccess('mail envoyé et mot de passe modifié');}
                    if (message==='envoie echouée')
                    {setErr('envoie echouée');}
                    else{setErr("erreur");}})
           
            
            
            //setOpen(true);
        } catch(err) {
          setErr("erreur")
          //  setErr({...data, err: err.response.data.msg , success: ''})
          //  setOpen1(true);
        }
      }
    }
    const handleUpdate = () => {
        if(password) updatePassword()
    }
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

    return (
        <div className="active_page">
         <div className='content-profil' style={{width:'800px',marginLeft:'16%',marginBottom:'200px',marginTop:'40px',padding:' 40px'}}>
        <h3 style={{marginTop:'18px',marginLeft:'30%'}}>Bienvenue à Uvct Training</h3>
               
        <Form   className="form" style={{width:'90%',marginLeft:'5%'}}>
            
       
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="labelForm" >Mot de passe</Form.Label>
                <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Créez votre mot de passe" 
                name="password"
                required 
                onChange={handlePasswordChange}
              isInvalid={passwordError}
            
            /><IconButton className='eye' style={{position:'absolute',marginLeft:'570px',marginTop:'-39px'}} 
            variant="outline-secondary" onClick={handleClickShowPassword}>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
             <Form.Control.Feedback type="invalid">
             mot de passe contient 8 caracteres
  </Form.Control.Feedback> 
  <Form.Label className="labelForm" >confirm mot de passe</Form.Label>
    <Form.Control type={showPassword1 ? 'text' : 'password'} placeholder="Confirmer mot de passe" 
    name="cf_password"
    required autoComplete="true" 
    onChange={handlePasswordConfChange}
              isInvalid={confPasswordError}
            
            /><IconButton className='eye' style={{position:'absolute',marginLeft:'570px',marginTop:'-39px'}} 
            variant="outline-secondary" onClick={handleClickShowPassword1}>
        {showPassword1 ? <VisibilityOff /> : <Visibility />}
      </IconButton>
             <Form.Control.Feedback type="invalid">
             mot de passe contient 8 caracteres
  </Form.Control.Feedback> 
  
               
        </Form.Group>
                   <div className="d-grid gap-2">
                   <Button  className="btn-conx"  size="lg" disabled={!isFormValid()}  onClick={updatePassword}>
                  confirmer
                   </Button>
                  </div>
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
    </div>
    )
}

export default CandidatAccepted;

//{err && ShowErrMsg(err)}
//{success&& ShowSuccessMsg(success)}
/*   <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
<Alert onClose={handleClose} severity="success">
{success}
</Alert>
</Snackbar>
<Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}
anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
<Alert onClose={handleClose1} severity="error">
{err}
</Alert>
</Snackbar>*/