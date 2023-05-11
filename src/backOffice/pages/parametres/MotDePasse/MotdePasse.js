import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {isLength, isMatch} from '../../../../components/utils/validation/Validation'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../../redux/actions/usersAction'
import { Button, Form } from 'react-bootstrap'
import '../Parametres.css'
import SnackbarSuccess from '../../../components/Snackbar/SnackbarSuccess'
import SnackbarErr from '../../../components/Snackbar/SnackbarErr'
import { Snackbar, Alert} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const initialState = {
  password: '',
  cf_password: '',
  err: '',
  success: ''
}
function MotdePasse() {
    const user = useSelector(state => state.auth.user)
    const token = useSelector(state => state.token)
    //const {user} = auth
    const [data, setData] = useState(initialState)
   // const { password, cf_password, err, success} = data
    const [callback] = useState(false)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [passworda, setPassworda] = useState("");
    const [passwordaError, setPasswordaError] = useState(false);
    const [password, setPassword] = useState("");
   
    const [passwordError, setPasswordError] = useState(false);
    const [confpassword, setConfPassword] = useState("");
    const [confPasswordError, setConfPasswordError] = useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");

  
   
   /* const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }*/
    const updatePassword = () => {
    //  if(isLength(password))
      //    return setData({...data, err: "Password must be at least 6 characters.", success: ''})

      if(!isMatch(password, confpassword))
          //return setData({...data, err: "Password did not match.", success: ''})
          return setErr("Password did not match.")
      try {
        //user/reset
          axios.patch(`http://localhost:5000/users/changpass/${user.UUid}`, {password:password},{
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'content-type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:5000',
              'Access-Control-Request-Methods': 'POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS'}, 
              "withCredentials": true 
          }).then((response) => {
            const message = response.data.message;console.log(message)
            if (message==='mot de passe modifié')
                  {setSuccess('mot de passe modifié');}
                  if (message==='modification echouée')
                  {setErr('modification echouée');}
                  if (message==='mot de passe actuelle est incorrecte')
                  {setErr('mot de passe actuelle est incorrecte');}
                  if (message==='utilisateur non trouvé')
                  {setErr('utilisateur non trouvé');}
                  
                  else{setErr("erreur");}})
          

          //setData({...data, err: '' , success: "Updated Success!"})
          //setOpen(true)
      } catch (err) {
         // setData({...data, err: err.response.data.msg , success: ''})
         // setOpen2(true)
         return setErr("modification echouée....vérifier les champs")
      }
  }
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);


  const handleUpdate = () => {
      if(password) updatePassword()
  }
  const isFormValid = () => {
    // add validation rules here
    return password !== ''  && !passwordError && confpassword !== ''  && !confPasswordError ;
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
    <div className='motDePasse'>
      <Form>
     
         
        <Form.Group className="mb-3" >
          <Form.Label className="label">Nouveau mot de passe</Form.Label>
            <Form.Control type={showPassword1 ? 'text' : 'password'} placeholder="Entrer le nouveau mot de passe" 
              required
              name="password"
              onChange={handlePasswordChange}
              isInvalid={passwordError}
            
            /><IconButton className='eye' style={{position:'absolute',marginLeft:'1060px',marginTop:'-39px'}} variant="outline-secondary" 
            onClick={handleClickShowPassword1}>
        {showPassword1 ? <VisibilityOff /> : <Visibility />}
      </IconButton>
             <Form.Control.Feedback type="invalid">
             mot de passe contient 8 caracteres
  </Form.Control.Feedback> 
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="label">Répétez le nouveau mot de passe ici</Form.Label>
            <Form.Control type={showPassword2 ? 'text' : 'password'} placeholder="Confirmer le nouveau mot de passe" 
              required
              name="cf_password"
              onChange={handlePasswordConfChange}
              isInvalid={confPasswordError}
            
            /><IconButton className='eye' style={{position:'absolute',marginLeft:'1060px',marginTop:'-39px'}} variant="outline-secondary" 
            onClick={handleClickShowPassword2}>
        {showPassword2 ? <VisibilityOff /> : <Visibility />}
      </IconButton>
             <Form.Control.Feedback type="invalid">
             mot de passe contient 8 caracteres
  </Form.Control.Feedback>
        </Form.Group>
        <div className="content-button">
        <Button className='btn-confirme' disabled={!isFormValid()} onClick={updatePassword}>Changer le mot de passe</Button>
        </div>
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

export default MotdePasse;
/* <SnackbarSuccess success={success} open={open}/>
      <SnackbarErr err={err} open2={open2}/> */