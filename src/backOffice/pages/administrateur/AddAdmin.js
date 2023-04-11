import React,{useState} from 'react';
import {useSelector} from 'react-redux'
import {isEmpty, isEmail, isLength} from '../../../components/utils/validation/Validation'
import { Button} from 'react-bootstrap';
import axios from 'axios'
import './Adminstrateur.css'
import { Form } from 'react-bootstrap'
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader';
import SnackbarSuccess from '../../components/Snackbar/SnackbarSuccess';
import SnackbarErr from '../../components/Snackbar/SnackbarErr';
import {Snackbar,Alert} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
 

function AddAdmin() {
    
    
    const token = useSelector(state => state.token)
   
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [telError, setTelError] = useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const [genre, setGenre] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [password, setPassword] = useState("");
  /*  const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
      }*/   
    const handleSubmit = async e => {
        e.preventDefault()
       try{
        const response=await axios.post('http://localhost:5000/users/registeradmin', {
              name: name,
              genre:genre,
              email:email,
              password:password,
              tel: tel,
            },{
                 headers: {'X-Requested-With': 'XMLHttpRequest', 
                 "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                 "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                "withCredentials": true 
              });                         
            if (response.data.message==="admin created successfully")
            {setSuccess("admin created successfully");}
           // else if (response.data.message==="admin already exist")
            //{setErr("admin déjà exist");}
         
           // else{setErr("erreur");}

              }catch(err){
                console.log(err);
                    setErr("admin déjà exist");}
        } ;
   // headers: {Authorization: token}
           // setData({...data, err: '', success: res.data.msg})
            //setOpen(true);
  
      
            const [showPassword, setShowPassword] = React.useState(false);

            const handleClickShowPassword = () => setShowPassword((show) => !show);
      const isFormValid = () => {
        // add validation rules here
        return name !== '' && email !== '' && tel !== '' && password !== ''  && !nameError && !emailError && !telError && !passwordError ;
      };
      const handleNameChange = (event) => {
        const { value } = event.target;
        setName(value);
        setNameError(value.length < 3);
      };
      const handlegenreChange = (event) => {
        const { value } = event.target;
        setGenre(value);
      };
      const handlePasswordChange = (event) => {
        const { value } = event.target;
        setPassword(value);
        setPasswordError(value.length < 8);
      };
     
    
      const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
        setEmailError(value === '' || !/\S+@\S+\.\S+/.test(value));
      };
    
      const handleTelChange = (event) => {
        const { value } = event.target;
        setTel(value);
        setTelError(!/^\d{8}$/.test(value));
      };
  return (
      <div className='add-admin' style={{marginLeft:'100px',marginBottom:'50px'}}>
        <BreadcrumbHeader item="Administrateur" link="/administrateurs" active="Ajouter Administrateur"/>
        <div className='content-admin' style={{width:'800px'}}>
          <Form  className='form-admin' style={{width:'97%'}}>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Nom complet</Form.Label>
                  <Form.Control type="text" placeholder="Entrer nom et prénom" 
                    name="name" 
                    value={name} required 
                    onChange={handleNameChange}
                     error={nameError}
                     isInvalid={nameError} 
                    
                  /><Form.Control.Feedback type="invalid">
              Name obligatoirement 3 caracteres
               </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Adresse e-mail</Form.Label>
                  <Form.Control type="email" placeholder="nom@email.com" 
                    name="email" 
                    value={email} required
                    onChange={handleEmailChange}
                    error={emailError}
                     isInvalid={emailError} 
                    
                  /><Form.Control.Feedback type="invalid">
              saisir un email valide
               </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Numéro de téléphone</Form.Label>
                  <Form.Control type="number" placeholder="ex: 21 212 212" 
                    name="tele" 
                    value={tel}
                    onChange={handleTelChange} 
                    required 
                    error={telError}
                     isInvalid={telError} 
                    
                  /><Form.Control.Feedback type="invalid">
              saisir un numero de telephone valide
               </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Genre</Form.Label>
                  <Form.Select type="text" placeholder="" 
                    name="tele" 
                    
                    //value={tel}
                    onChange={handlegenreChange} 
                     
                    
                    
                  >
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
              genre est obligatoire
               </Form.Control.Feedback>
            </Form.Group>
           
            <Form.Group className="mb-3" >
                <Form.Label className="label">Mot de passe</Form.Label>
                  <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Entrez mot de passe" 
                    name="password"
                    value={password}
                    onChange={handlePasswordChange} 
                    required  
                    error={passwordError}
                     isInvalid={passwordError} 
                    
                  /><IconButton className='eye' style={{position:'absolute',marginLeft:'655px',marginTop:'-39px'}} variant="outline-secondary" onClick={handleClickShowPassword}>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton><Form.Control.Feedback type="invalid">
              password contient 8 caracteres
               </Form.Control.Feedback>
            </Form.Group>
            <div className='ctn-btn-admin'>
            <Button type='reset' className='btn-annuler' size="lg" >
                Annuler
            </Button>
            <Button disabled={!isFormValid()} onClick={handleSubmit} className='btn-confirmer' type="submit" size="lg" >
                confirmer
            </Button>
            </div>
          </Form>
        </div>
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

export default AddAdmin