import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {isEmpty, isEmail, isLength, isMatch} from '../../../components/utils/validation/Validation'
import { Button,Form} from 'react-bootstrap'
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader'
import axios from 'axios'
import SnackbarSuccess from '../../components/Snackbar/SnackbarSuccess'
import SnackbarErr from '../../components/Snackbar/SnackbarErr'
import {Snackbar,Alert} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const initialState = {
    name: '',
    phone:'',
    email:'',
    password:'',
    cf_password: '',
    speciality:'',
    err: '',
    success: '' 
}
function InstructeurAdd() {
   
  
    const [data, setData] = useState(initialState)
   // const {name, phone, email, speciality, password,cf_password, err, success} = data ; 
    const token = useSelector(state => state.token)
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    const [specialityError, setspecialityError] = useState(false);
    const [speciality, setspeciality] = useState("");
   
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [telError, setTelError] = useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [password, setPassword] = useState("");

        /*const handleChangeInput = e => {
            const {name, value} = e.target
            setData({...data, [name]:value, err: '', success: ''})
        }*/

      const handleSubmit = async (e) => {
        e.preventDefault() ;  
        // if(isEmpty(name) || isEmpty(password) || isEmpty(phone))
        //          return setData({...data, err: "Please fill in all fields.", success: ''}) ; 
        //  if(!isEmail(email))
        //      return setData({...data, err: "Invalid emails.", success: ''}) ;
        //      if(!isMatch(password, cf_password))
        //      return setData({...data, err: "Password did not match.", success: ''}) ;
        //  if(isLength(password))
        //      return setData({...data, err: "Password must be at least 6 characters.", success: ''}) ;
        try {
        const res=await axios.post('http://localhost:5000/users/ajouterinstr', {
              name: name,
              email:email,
              password:password,
              tel: tel,
              speciality:speciality,
            },{
              
              headers: {'X-Requested-With': 'XMLHttpRequest', 
              "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
              "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
             "withCredentials": true 
            });
          
            
            if (res.data.message==='Mail sent successfully')
            {setSuccess('instructeur created and Mail sent successfully');}
            if (res.data.message==='instructeur déjà exist')
            {setErr('instructeur déjà exist');}
            
                        
                //setSuccess("instructeur created and Mail sent successfully");
                
         
        } catch (err) {
          setErr('ERREUR');
        }
      }
      const isFormValid = () => {
        // add validation rules here
        return name !== '' && email !== '' && tel !== '' && !nameError && !emailError && !telError ;
      };
      const handleNameChange = (event) => {
        const { value } = event.target;
        setName(value);
        setNameError(value.length < 3  );
      };
      const [showPassword, setShowPassword] = React.useState(false);

      const handleClickShowPassword = () => setShowPassword((show) => !show);
    
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
    
      const handleSpecialityChange = (event) => {
        const { value } = event.target;
        setspeciality(value);
        setspecialityError(value.trim() === '' ? 'La spécialité est requise.' : '');
      };
      const handlePasswordChange = (event) => {
        const { value } = event.target;
        setPassword(value);
        setPasswordError(value.length < 8);
      };
   
  return (
    <div className='add-admin' style={{marginLeft:'100px',marginBottom:'50px'}}>
    <BreadcrumbHeader item="Liste instructeurs" link="/instructeurs" active="Ajouter instructeur"/>
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
              <Form.Label className='label'>Spécialité</Form.Label>
              <Form.Select aria-label="Default select example"
                name="specialite"
                required
                value={speciality}
                onChange={handleSpecialityChange}
                isInvalid={specialityError}>
               <option value="Développement web">choisissez votre specialité</option>
                <option value="Développement web">Développement web</option>
                <option value="Développement mobile">Développement mobile</option>
                <option value="Développement personnel">Développement personnel</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
                <option value="Communication">Communication</option>
                <option value="Photographie">Photographie</option>
                <option value="Musique">Musique</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
              La spécialité est requise.
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
                
              /><IconButton className='eye' style={{position:'absolute',marginLeft:'660px',marginTop:'-39px'}} variant="outline-secondary" onClick={handleClickShowPassword}>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
      <Form.Control.Feedback type="invalid">
          password contient 8 caracteres
           </Form.Control.Feedback>
        </Form.Group>
          
          <div className="content-btn">
              
              <Button  className='btn-confirme' onClick={handleSubmit} disabled={!isFormValid()} type="submit">Ajouter</Button>
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

export default InstructeurAdd;
/*<div className="profile"  style={{marginLeft:'100px'}}>
    <BreadcrumbHeader marginLeft="100px" item="Liste instructeurs" link="/instructeurs" active="Ajouter instructeur"/>
      <div className='content-profil' style={{width:'800px'}}>
       <Form className='form-profil'  style={{width:'90%'}}>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Nom complet</Form.Label>
              <Form.Control type="text" placeholder="Entrer son nom et prénom" 
                name="name"
                value={name} 
                 
                onChange={handleNameChange}
                    isInvalid={nameError}                            
                    />
            <Form.Control.Feedback type="invalid">
              Name contient au moins 3 caracteres
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Adresse e-mail</Form.Label>
              <Form.Control type="email" placeholder="nom@email.com" 
                name="email" 
                value={email}
                required 
                onChange={handleEmailChange}
            isInvalid={emailError} 
         /><Form.Control.Feedback type="invalid">
              saisir un  email addresse valide
               </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Numéro de téléphone</Form.Label>
              <Form.Control type="text" placeholder="Entrer son numéro de téléphone" 
                name="tel" 
                value={tel}
                required 
                onChange={handleTelChange}
                    
                    isInvalid={telError}
         />
          <Form.Control.Feedback type="invalid">
          saisir un numero de  telephone valide
               </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
              <Form.Label className='labelForm'>Spécialité</Form.Label>
              <Form.Select aria-label="Default select example"
                name="specialite"
                required
                value={speciality}
                onChange={handleSpecialityChange}
                isInvalid={specialityError}>
                <option>Séléctionnez votre spécialité</option>
                <option value="Développement web">Développement web</option>
                <option value="Développement mobile">Développement mobile</option>
                <option value="Développement personnel">Développement personnel</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
                <option value="Communication">Communication</option>
                <option value="Photographie">Photographie</option>
                <option value="Musique">Musique</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
              La spécialité est requise.
               </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Mot de passe</Form.Label>
              <Form.Control type="password" placeholder="Entrer mot de passe" 
                name="password" 
                value={password}
                required 
                onChange={handlePasswordChange}
              isInvalid={passwordError}
            
            />
             <Form.Control.Feedback type="invalid">
             mot de passe contient 8 caracteres
  </Form.Control.Feedback> 
          </Form.Group>
          
          <div className="content-btn">
              
              <Button  className='btn-confirme' onClick={handleSubmit} disabled={!isFormValid()} type="submit">Ajouter</Button>
          </div>
        </Form>
      </div>*/