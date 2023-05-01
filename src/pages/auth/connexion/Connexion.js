import React, { useState,useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "./Connexion.scss";
import "./c.css";
import {useSelector} from 'react-redux'

import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logog from "./google.png";
import { GoogleLogin } from "react-google-login";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login";
import { FacebookRounded, Google } from "@mui/icons-material";
import { gapi } from "gapi-script";
import { Snackbar, Alert } from "@mui/material";
import { login } from "../../../redux/features/authSlice";


 // gapi.load("client:auth2", () => {
  //   gapi.client.init({
  //     clientId:
  //       "797042793580-ja939nj1f6murn9clhcu9b1inogtrgor.apps.googleusercontent.com",
  //     plugin_name: "chat",
  //   });
  // });
  //const { email, password, err, success } = user;
  /*.then((res)=>{
            
              console.log(res);
              localStorage.setItem("firstLogin", true);
              dispatch(dispatchLogin(res.data.user));
              navigate("/profile");
     })*/
function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [open, setOpen] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );


  /*useEffect(() => {
    if ( message==='login avec success') {
      navigate("/profile");
      
    }//dispatch(reset())
    
  }, [user, isSuccess, dispatch, navigate,message]);
  if (message==='mot de passe incorrect')
  {setTimeout(()=>{setErr('mot de passe incorrect')},1500);localStorage.removeItem('isLogged')}
if (message==='verifiez votre compte')
  {setTimeout(()=>{setErr('verifiez votre compte')},1500);localStorage.removeItem('isLogged')}
  if (message==='User does not exist')
  {setTimeout(()=>{setErr('User does not exist')},1500);localStorage.removeItem('isLogged')}
  */

  const handleSubmit = async (e) => {
         e.preventDefault();
         try{
          const res =await axios.post('http://localhost:5000/users/login', {
              email: email,
              password: password
          },{ headers: {'X-Requested-With': 'XMLHttpRequest', 
          "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
          "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS",
          //Authorization: 'Bearer ' + user.accessToken
                        }, 
         "withCredentials": true ,
         
          
          });
          if (res.data.message==='login avec success')
          {setSuccess('login avec success');setTimeout(()=>{dispatch(login(res.data))},500);
          setTimeout(()=>{localStorage.setItem('token', JSON.stringify(res.data.accessToken));},500);
          setTimeout(()=>{navigate("/profile");},500);}
          
          if (res.data.message==='vous n\'étes pas encore accepté')
          {setErr('vous n\'étes pas encore accepté');}
          if (res.data.message==='verifiez votre compte')
          {setErr('verifiez votre compte');}
          if (res.data.message==='User does not exist')
          {setErr('User does not exist');}
          if (res.data.message==='mot de passe incorrect')
          {setErr('mot de passe incorrect');}
          else{setErr("erreur");}
  


         }catch{setErr('err')}
        
          
    
      }
        

  

 //const responseGoogle = async (response) => {
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
      localStorage.setItem("profile", JSON.stringify({ result, token }));
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
    console.log(res);
  };
 
 
  const googleError = (error) => console.log(error);

  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });

    //  setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      navigate("/profile");
    } catch (err) {
      //err.response.data.msg ;
       // setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };
  const isFormValid = () => {
    // add validation rules here
    return email !== "" && password !== "" && !emailError && !passwordError;
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(value === "" || !/\S+@\S+\.\S+/.test(value));
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    setPasswordError(value.length < 8);
  };
  const handleSnackbarClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (isError) {
      setOpen(true); // Open Snackbar if isError is true
    }
  }, [isError]);

  var fex = false;
  return (
    
    <div
      className={"content-profil"}
      style={{ width: "800px", marginLeft: "24%", marginBottom: "150px" }}
    >
      <div className={`${fex ? "connexion" : ""} `}>
        <h2 className="title-inscri" style={{ marginTop: "18px" }}>
          Bienvenue
        </h2>
        <Form style={{ width: "90%", marginLeft: "5%" }}>
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
              saisir un email addresse valide
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="labelForm">Mot de passe</Form.Label>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="mot de passe"
              name="password"
              required
              onChange={handlePasswordChange}
              isInvalid={passwordError}
            /><IconButton className='eye' style={{position:'absolute',marginLeft:'650px',marginTop:'-39px'}} 
            variant="outline-secondary" onClick={handleClickShowPassword}>
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
            <Form.Control.Feedback type="invalid">
              mot de passe contient 8 caracteres
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button
              className="btn-conx"
              type="submit"
              onClick={handleSubmit}
              style={{ backgroundColor: "#20384D" }}
              size="lg"
              disabled={!isFormValid()}
            >
              Se connecter
            </Button>
            <Link
              to="/forgot_password"
              className="linkM"
              style={{ color: "#20384D" }}
            >
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
                  <Button
                    color="primary"
                    style={{
                      borderColor: "black",
                      width: "50%",
                      marginLeft: "35px",
                      marginBottom: "15px",
                    }}
                    //fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="bb"
                    variant="contained"
                  >
                    <img
                      src={logog}
                      alt="Logo"
                      width={20}
                      height={20}
                      id="logog"
                      style={{ marginRight: "10px" }}
                    />
                    Se connecter avec Google
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
              {/* { <FacebookLogin style={{ borderColor:'black',width:'50%',marginLeft:'140px'}}
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

            <Form.Label style={{ marginBottom: "15px" }}>
              Vous n'avez pas de compte ?
              <a
                href="/inscrire"
                style={{ marginLeft: "5px" }}
                className="link"
                onClick={() => (fex = true)}
              >
                {" "}
                S'inscrire
              </a>
            </Form.Label>
          </div>
        </Form>
      </div>
      <Snackbar autoHideDuration={1500} open={ err === "" ? false : true } onClose={()=>{ setErr("") }}  >
        <Alert variant="filled" severity="error" onClose={()=>{ setErr("") }} >
          {
            err
          }
        </Alert>
      </Snackbar>
      <Snackbar autoHideDuration={1500} open={ success === "" ? false : true } onClose={()=>{ setSuccess("") }}  >
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

/*import { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false); // State for Snackbar
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isError) {
      setOpen(true); // Open Snackbar if isError is true
    }
  }, [isError]);

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={Auth} className="box">
                <h1 className="title is-2">Sign In</h1>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="******"
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      /* Snackbar to show error message */
     /* <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert elevation={6} variant="filled" severity="error">
          {message}
        </MuiAlert>
      </Snackbar>
    </section>
  );
};

export default Login;if (response.data.message==='login avec success')
          {setSuccess('login avec success');
          const data = await response.json();
          console.log(data); dispatch(login(data));navigate("/profile");}
          if (response.data.message==='verifiez votre compte')
          {setErr('verifiez votre compte');}
          if (response.data.message==='User does not exist')
          {setSuccess('User does not exist');}
          if (response.data.message==='mot de passe incorrect')
          {setSuccess('mot de passe incorrect');}
          else{setErr("erreur");}*/