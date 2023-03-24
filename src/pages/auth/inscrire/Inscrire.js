import React, {useState} from 'react'
import { Button,Form} from 'react-bootstrap';
import axios from 'axios'
import {ShowErrMsg, ShowSuccessMsg} from '../../../components/utils/notifications/Nofification'
//import {isEmpty, isEmail, isLength} from '../../../components/utils/validation/Validation'
import './inscrire.css'
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert} from "@mui/material";
import logog from "../connexion/google.png"
import { GoogleLogin } from "react-google-login";


const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Inscrire({setShow1}) {
    
    
    const [user, setUser] = useState(initialState)
   // const {name, email, password, err, success} = user
   const [name, setName] = useState("");
   const [nameError, setNameError] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const navigate = useNavigate();

   /* const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }*/
  
    const handleSubmit = async e => {
        e.preventDefault() ; 
        try {
          const response=await axios.post('http://localhost:5000/users/register', {
              name: name,
              email: email,
              password: password
              
            },{
                 headers: {'X-Requested-With': 'XMLHttpRequest', 
                 "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                 "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                "withCredentials": true 
              }
              ); 
                if (response.data.message==='user created successfully...check your inbox')
                {setSuccess('user created successfully...check your inbox');setTimeout(()=>{navigate("/connexion")},2500);}
                if (response.data.message==='user already exist')
                {setErr('user already exist');setTimeout(()=>{navigate("/connexion")},2500);}
                else{setErr("erreur");}
                
             // }).catch(err=>{
             // console.log("erreur");
            //  setErr('user already exist');
                 // alert("erreur")
                } catch (err) {
                  setErr('echec');
                  setTimeout(() => {
                    navigate('/connexion');
                  }, 2500);
                }
              };
              
       
    
   // {err && alert(err)}
   // {success && alert(success)}
   const googleSuccess = async (res) => {

    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(res); 
    try {
      
      localStorage.setItem('profile',JSON.stringify({result,token})) ;  
      navigate('/profile');
    } catch (error) {
      console.log(error);
    }
    console.log(res);
  };

  const googleError = (error) =>
    console.log(error);
    const isFormValid = () => {
        // add validation rules here
        return  email !== '' && password !== ''  && !emailError && !passwordError;
      };
      const handleNameChange = (event) => {
        const { value } = event.target;
        setName(value);
        setNameError(value.length < 3);
      };
      const handleEmailChange = (event) => {
        const { value } = event.target;
        setEmail(value);
        setEmailError(value === '' || !/\S+@\S+\.\S+/.test(value));
      };
    
      const handlePasswordChange = (event) => {
        const { value } = event.target;
        setPassword(value);
        setPasswordError(value.length < 8);
      };

    var fex=false
    return (
      <div className={`${fex ? "inscrire":"" } `} >
      <div className='content-profil' style={{width:'800px',marginLeft:'24%',marginBottom:'150px'}}>
      <h2 className="title-inscri" style={{marginTop:'18px'}}>S'inscrire</h2>
                  <p className="sous-title-inscri">
                    Passez votre temps libre à étudier avec les meilleurs
                    instructeurs. 
                  </p>

        <Form  onSubmit={handleSubmit} className="form" style={{width:'90%',marginLeft:'5%'}}>
            <Form.Group className="mb-3" style={{width:'100%'}}>
                <Form.Label className="labelForm" >Nom complet</Form.Label>
                    <Form.Control type="Normal text"
                    placeholder="Saisissez votre mot de passe" 
                    name="name"
                    value={name} required 
                    onChange={handleNameChange}
                    isInvalid={nameError}                            
                    /><Form.Control.Feedback type="invalid">
              Name is required and at least 3 character
               </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="labelForm">Adresse e-mail</Form.Label>
            <Form.Control
         type="email"
          placeholder="nom@gmail.com"
          name="email"
          required
         onChange={handleEmailChange}
            isInvalid={emailError} 
             />
              <Form.Control.Feedback type="invalid">
              saisir un  email addresse valide
               </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="labelForm" >Mot de passe</Form.Label>
                <Form.Control type="password" placeholder="Créez votre mot de passe" 
                name="password"
                required 
                onChange={handlePasswordChange}
              isInvalid={passwordError}
            
            />
             <Form.Control.Feedback type="invalid">
             mot de passe contient 8 caracteres
  </Form.Control.Feedback> 
  
               
        </Form.Group>
        <div className="d-grid gap-2">
            <Button  className='btn-inscr'  type="submit" size="lg" disabled={!isFormValid()}>
                S'inscrire
            </Button>
            <Form.Label style={{ textAlign: "center" }}>ou</Form.Label>
            <div style={{ textAlign: "center" }}>


              {/* <GoogleLogin
                clientId="797042793580-ja939nj1f6murn9clhcu9b1inogtrgor.apps.googleusercontent.com"
                buttonText="Continuer avec Google"
                onSuccess={responseGoogle}
                cookiePolicy={"single_host_origin"}
                className={"google-button"}
                icon={<Google />}
              /> */}


              <GoogleLogin 
                clientId="797042793580-ja939nj1f6murn9clhcu9b1inogtrgor.apps.googleusercontent.com"
                render={(renderProps) => ( 
                  <Button  color="primary" style={{ borderColor:'black',width:'50%',marginLeft:'35px',marginBottom:'15px'}} 
                  fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} className="bb"
                   variant="contained">
                   <img src={logog} alt="Logo" width={20} height={20} id="logog" 
                   style={{marginRight:'10px'}}  />
                    Se connecter avec Google 
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
            { /* { <FacebookLogin style={{ borderColor:'black',width:'50%',marginLeft:'140px'}}
                appId="5341302392569355"
                autoLoad={false}
                cssClass="facebook-button"
                fields="name,email,picture"
                callback={responseFacebook}
                icon={
                  <FacebookRounded
                    style={{ color: "#0163E0", marginRight: 59 }}
                  />
                }
              />} */}
            </div>
            <Form.Label style={{marginBottom:'15px'}}>Vous avez déjà un compte ?
                <a href="/connexion" style={{ marginLeft:'5px'}} className="link" onClick={() => fex=true}>Se connecter</a> 
            </Form.Label>
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

export default Inscrire;