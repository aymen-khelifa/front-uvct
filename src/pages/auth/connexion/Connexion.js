import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./Connexion.scss";
import "./c.css";


import {
  ShowErrMsg,
  ShowSuccessMsg,
} from "../../../components/utils/notifications/Nofification";
import logog from "./google.png"
import { GoogleLogin } from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";

import FacebookLogin from "react-facebook-login";
import { FacebookRounded, Google } from "@mui/icons-material";
import { gapi } from "gapi-script";
import { Snackbar, Alert} from "@mui/material";


const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Connexion() {

  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "797042793580-ja939nj1f6murn9clhcu9b1inogtrgor.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });
  const [user, setUser] = useState(initialState);
  //const { email, password, err, success } = user;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [err , setErr] = useState("");
  const [success , setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

 /* const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/users/Login', {
          email: email,
          password: password
          
        },{
             headers: {'X-Requested-With': 'XMLHttpRequest', 
             "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
             "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
            "withCredentials": true 
          }          
          )
      setUser({ ...user, err: "", success: res.data.message });console.log(res.data.message)

      localStorage.setItem("firstLogin", true);
       dispatch(dispatchLogin());
      navigate("/profile");
    } catch (err) {
      //err.response.data.msg &&
        setUser(err);
    }
  };

  // const responseGoogle = async (response) => {
  //   try {


  //     const res = await axios.post("/user/google_login", {
  //       tokenId: response.tokenId
  //     });


  //     setUser({ ...user, error: "", success: res.data.msg });
  //     localStorage.setItem("firstLogin", true);


  //     //dispatch(dispatchLogin());
  //     //navigate("/profile");
  //   } catch (err) {
  //     err.response.data.msg &&
  //       setUser({ ...user, err: err.response.data.msg, success: "" });
  //   }
  // };

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




  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      navigate("/profile");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };
  const isFormValid = () => {
    // add validation rules here
    return  email !== '' && password !== ''  && !emailError && !passwordError;
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


  var fex = false;
  return (
    <div className={"content-profil"} style={{width:'800px',marginLeft:'24%',marginBottom:'150px'}}>
      <div className={`${fex ? "connexion" : ""} `} >
      <h2 className="title-inscri" style={{marginTop:'18px'}}>Bienvenue</h2> 
        <Form onSubmit={handleSubmit} style={{width:'90%',marginLeft:'5%'}}>
        <Form.Group controlId="formBasicEmail" className="mb-3">
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
            <Form.Label className="labelForm">Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="mot de passe"
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
            <Button className="btn-conx" type="submit" style={{backgroundColor:'#20384D'}} size="lg" disabled={!isFormValid()}>
              Se connecter
            </Button>
            <Link to="/forgot_password" className="linkM" style={{color:'#20384D'}}>
              Mot de passe oublié ?
            </Link>
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

            <Form.Label style={{marginBottom:'15px'}}>
              Vous n'avez pas de compte ?
              <a href="/inscrire" style={{ marginLeft:'5px'}} className="link"  onClick={() => (fex = true)}>
                {" "}
                S'inscrire
              </a>
            </Form.Label>
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
  );
}

export default Connexion;
