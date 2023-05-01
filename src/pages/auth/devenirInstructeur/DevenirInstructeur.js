import React, {useState} from 'react'
import { Button,Form} from 'react-bootstrap';
import axios from 'axios'
import {ShowErrMsg, ShowSuccessMsg} from '../../../components/utils/notifications/Nofification'
import {isEmpty, isEmail} from '../../../components/utils/validation/Validation'
import { useNavigate } from 'react-router-dom';
import './DevenirInstructeur.scss'
import {Typography} from "antd";
import {arrow} from "../../../assets";
import { Snackbar, Alert} from "@mui/material";


const initialState = {
    name: '',
    email: '',
    speciality:'',
    message:'',
    phone:'',
    err: '',
    success: ''
}

function DevenirInstructeur() {
    const [user, setUser] = useState(initialState)
    //const {name, email, speciality,message,phone,err, success} = user
    const navigate = useNavigate();
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 
  
  const [cv, setCV] = useState("");
  const [msg, setmessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [tel, setTel] = useState("");
  const [telError, setTelError] = useState(false);
  const [err , setErr] = useState("");
  const [success , setSuccess] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [speciality, setspeciality] = useState("");
  const [specialityError, setspecialityError] = useState(false);

  
    

    
    const handleSubmit = async e => {console.log('aa');
        e.preventDefault() ; 
      
      

        try {console.log('bbb');
            const response = await axios.post('http://localhost:5000/users/devenirinstructeur1',
              
             { name: name,
              email:email,
              tel: tel,
              message:message,
              speciality:speciality,

            },{
              headers: {'X-Requested-With': 'XMLHttpRequest', 
              "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
              "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
             "withCredentials": true 
              }
              
              );console.log('ccc');console.log(response.data.message); if (response.data.message==='votre demande est bien envoyé')
              {setSuccess('votre demande est bien envoyé');
              setTimeout(()=>{navigate("/devenirinstructeur/"+response.data.userid)},1000);}
            
              if (response.data.message==='demande deja envoyée')
              {setErr('demande deja envoyée');}
              if (response.data.message==='merci d\'utiliser un autre email pour devenir instructeur')
              {setErr('merci d\'utiliser un autre email pour devenir instructeur');}
              else{setErr("erreur");}

              
            //navigate("/")

        } catch (err) {
          setErr('erreur');//setTimeout(()=>{navigate("/")},2000);
        }
    }
    const isFormValid = () => {
      // add validation rules here
      return name !== '' && email !== '' && tel !== '' && message!== '' && !nameError && !emailError && !telError && !messageError;
    };
    const handleNameChange = (event) => {
      const { value } = event.target;
      setName(value);
      setNameError(value.length < 3  );
    };
    const handleMessageChange = (event) => {
      const { value } = event.target;
      setMessage(value);
      if (value.length < 100) {
        setMessageError(true);
      } else {
        setMessageError(false);
      }
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
   
    const handleSpecialityChange = (event) => {
      const { value } = event.target;
      setspeciality(value);
      setspecialityError(value.trim() === '' ? 'La spécialité est requise.' : '');
    };
  return (
      <div className={'devenir-instructeur-container flex-row '} >
          <Typography className={'become-instructor'}>Inscrivez-vous pour devenir instructeur</Typography>
          <img src={arrow} className={'arrow'} alt={'arrow'}/>
    <div className='devInst' >
      
        <Form >
        <Form.Group  >
        <Form.Label className='labelForm'>Nom complet</Form.Label>
        <Form.Control type="Normal text"
         className='inputForm'
         placeholder=" Saissiez votre nom et prénom"
         name="name"
         value={name} required
         onChange={handleNameChange}
                    isInvalid={nameError}                            
                    />
            <Form.Control.Feedback type="invalid">
              Name is required and at least 3 character
              </Form.Control.Feedback>
      </Form.Group>
      <Form.Group  controlId="formBasicEmail" >
      <Form.Label className='labelForm'>Adresse E-mail</Form.Label>
        <Form.Control type="email" placeholder="nom@email.com"
        name="email"
        required
        onChange={handleEmailChange}
            isInvalid={emailError} 
         /><Form.Control.Feedback type="invalid">
              saisir un  email addresse valide
               </Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group  controlId="formBasicEmail" >
      <Form.Label className='labelForm'>Téléphone</Form.Label>
        <Form.Control type="number" placeholder="21 212 212"
        name="phone"
        required
        value={tel}
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
      <Form.Label className='labelForm'>Message</Form.Label>
        <Form.Control type="text" as="textarea" rows={5}
         placeholder="Saissiez un message"
         name="message"
          required
          onChange={handleMessageChange}
          isInvalid={messageError}
          
        />
        <Form.Control.Feedback type="invalid">
        message est superieur à 100 character
               </Form.Control.Feedback>
      </Form.Group>
      <div className="d-grid gap-2">
      <Button className='btn-devInst' type="submit" size="lg" disabled={!isFormValid()} onClick={handleSubmit}>
        Envoyer
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

export default DevenirInstructeur

