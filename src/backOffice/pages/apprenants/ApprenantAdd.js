import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {isEmpty, isEmail, isLength} from '../../../components/utils/validation/Validation'
import { Button,Form} from 'react-bootstrap'
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader'
import axios from 'axios'
//import SnackbarSuccess from '../../components/Snackbar/SnackbarSuccess'
//import SnackbarErr from '../../components/Snackbar/SnackbarErr'
import {Snackbar,Alert} from "@mui/material";


const initialState = {
    name: '',
    tele:'',
    email:'',
    password:'',
    cf_password: '',
    err: '',
    success: ''
}

function ApprenantAdd() {
    const [data, setData] = useState(initialState)
   // const {name, tele, email, password,cf_password} = data
    const token = useSelector(state => state.token)
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState("");
    
   
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [telError, setTelError] = useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [password, setPassword] = useState("");


     //   const handleChangeInput = e => {
      //      const {name, value} = e.target
      //      setData({...data, [name]:value, err: '', success: ''})
      //  }

        const handleSubmit = async e => {
          e.preventDefault()
          if(isEmpty(name) || isEmpty(password) || isEmpty(tel) || isEmpty(email))
                  return setData({...data, err: "Please fill in all fields.", success: ''})
    
          if(!isEmail(email))
              return setData({...data, err: "Invalid emails.", success: ''})
    
          if(isLength(password))
              return setData({...data, err: "Password must be at least 6 characters.", success: ''})
    
          try {
              const response = await axios.post('http://localhost:5000/users/add', {

              name, email, tel, password
              },{
                  headers: {'X-Requested-With': 'XMLHttpRequest', 
                  "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                  "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                 "withCredentials": true 
               })
             
    
               if (response.data.message==="apprenant created successfully")
               {setSuccess("apprenant crée avec success");}
               else if (response.data.message==="apprenant already exist")
               {setErr("apprenant déjà exist");}
               else{setErr("erreur");}
    
          } catch (err) {
            setErr("apprenant already exist");
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
      
       
        const handlePasswordChange = (event) => {
          const { value } = event.target;
          setPassword(value);
          setPasswordError(value.length < 8);
        };
  return (
    <div className="profile" style={{marginLeft:'200px'}}>
    <BreadcrumbHeader item="Liste apprenants" link="/apprenants" active="Ajouter apprenant"/>
      <div className='content-profil' style={{width:'800px'}}>
       <Form className='form-profil' onSubmit={handleSubmit} style={{width:'100%'}}>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Nom complet</Form.Label>
              <Form.Control type="text" placeholder="Entrer son nom et prénom" 
                name="name"
                value={name} 
                required 
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
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme' type="submit">Ajouter</Button>
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

export default ApprenantAdd