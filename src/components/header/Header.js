import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Modal } from "react-bootstrap";
import Connexion from "../../pages/auth/connexion/Connexion";
import Inscrire from "../../pages/auth/inscrire/Inscrire";
import { useSelector } from "react-redux";
import axios from "axios";
import "./Header.css";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import { dispatchLogin } from "../../../src/redux/actions/authAction";
import { GoogleLogin } from "react-google-login";
import Avatar1 from "../Avatar/Avatar";
import Popover from "@material-ui/core/Popover";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SvgLogo from "../../logo";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NativeSelect from "@mui/material/NativeSelect";
import { Snackbar, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Google, Logout } from "@mui/icons-material";
import logog from "../../pages/auth/connexion/google.png";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { logout } from '../../redux/features/authSlice'
import { login } from "../../redux/features/authSlice";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const open3 = Boolean(anchorEl3);
  const id3 = open3 ? "simple-popover" : undefined;
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);
  const [show1, setShow1] = useState(false);
  const auth = useSelector((state) => state?.auth);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const user = useSelector((state) => state.auth.user); 

  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit1 = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/users/register",
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5000",
            "Access-control-request-methods":
              "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS",
          },
          withCredentials: true,
        }
      );
      if (
        response.data.message === "user created successfully...check your inbox"
      ) {
        setSuccess("user created successfully...check your inbox");
        setTimeout(() => {
          navigate("/connexion");
        }, 2500);
        setTimeout(() => {
          handleClose1();
        }, 2500);
      }
      if (response.data.message === "User already exist") {
        setErr("user already exist");
        setTimeout(() => {
          navigate("/connexion");
        }, 2500);
        setTimeout(() => {
          handleClose1();
        }, 2500);
      } else {
        setErr("erreur");
      }

      // }).catch(err=>{
      // console.log("erreur");
      //  setErr('user already exist');
      // alert("erreur")
    } catch (err) {
      setErr("user already exist");
      setTimeout(() => {
        navigate("/inscrire");
      }, 2500);
      setTimeout(() => {
        handleClose1();
      }, 2500);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/users/Login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest","content-type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:5000","Access-control-request-methods":
              "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS",
          },withCredentials: true,}
      );
      if (res.data.message==='login avec success')
      {setSuccess('login avec success');setTimeout(()=>{dispatch(login(res.data))},500);
      setTimeout(()=>{localStorage.setItem('token', JSON.stringify(res.data.accessToken));},500);
      setTimeout(()=>{navigate("/profile");},500);}
      
      if (res.data.message==='verifiez votre compte')
      {setErr('verifiez votre compte');}
      if (res.data.message==='User does not exist')
      {setErr('User does not exist');}
      if (res.data.message==='mot de passe incorrect')
      {setErr('mot de passe incorrect');}
      else{setErr("erreur");}
    } catch (err) {
      console.log("erreur"); 
     
    }
  };
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
  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    setNameError(value.length < 3);
  };
 /* const handleLogout = async () => {
    try {
      await axios.patch("http://localhost:5000/users/Logout");
      localStorage.removeItem("firstLogin");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("isLogged");
      localStorage.removeItem("loginUser");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };*/
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
  const googleError = (error) => console.log(error);

  var fex = false;
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <div className="header">
      <Navbar className="row2">
        <Navbar.Brand href="/">
          <p className="titleLogo">
            <SvgLogo />
            &#160; Uvct-Training
          </p>
        </Navbar.Brand>

        <div class="dropdown">
          <a
          href=""
            class="btn  dropdown-toggle"
            role="button"
            id="dropdownMenuLink"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            Categories
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <a class="dropdown-item" href="/devloppement-web">
                Développement web
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/design">
                Design
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/business">
                Business
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/marketing">
                Marketing
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/developpement-personnel">
                Développement personnel
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/communication">
                Communication
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/photographie">
                Photographie
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/informatique">
                Informatiques et logiciels
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/mode-de-vie">
                Mode de vie
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="/musique">
                Musique
              </a>
            </li>
          </ul>
        </div>

        <Form className="flex-auto">
          <FormControl
            style={{
              boxShadow: "0px 0px 5px -3px black",
              width: "550px",
              marginLeft: "50px",
            }}
            type="search"
            placeholder="Rechercher"
            className="me-2 rounded-pill"
            aria-label="Search"
          />
        </Form>

        { (
          <Nav.Link
            href="/devenir-instructeur"
            className="link-postuler-enseigner"
          >
            Devenir instructeur
          </Nav.Link>
        )}

        {user!==null && user.role!=='instructeur' && (
          <a href="/panier" className="shoppingIcon">
            <ShoppingCartIcon href="/panier" />
          </a>
        )}

        {user!==null ? (
          <>
            {user.role!=='admin' && (
              <div>
                <FavoriteBorderIcon className="header-icon" />
              </div>
            )}
            <NotificationsNoneIcon className="header-icon" />
            <Box sx={{ flexGrow: 0 }} style={{ marginRight: "40px" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user.avatar} />{" "}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={handleCloseUserMenu}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
              >
                <MenuItem>
                  <a onClick={handleLogout} textAlign="center">
                    Se deconnecter
                  </a>
                </MenuItem>
              </Menu>
            </Box>
          </>
        ) : (
          <>
            <Button
              className="button-connexion"
              onClick={handleShow}
              variant="light"
            >
              Connecter
            </Button>
            <Modal centered show={show} onHide={handleClose} animation={true}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h2 className="title-inscri1">Bienvenue</h2>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className={"connection-page"}>
                  <div className={`${fex ? "connexion" : ""} `}>
                    <Form>
                      <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label className="labelForm">
                          Adresse e-mail
                        </Form.Label>
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
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label className="labelForm">
                          Mot de passe
                        </Form.Label>
                        <Form.Control
                          type={showPassword ? "text" : "password"}
                          placeholder="mot de passe"
                          name="password"
                          required
                          onChange={handlePasswordChange}
                          isInvalid={passwordError}
                        />
                        <IconButton
                          className="eye"
                          style={{
                            position: "absolute",
                            marginLeft: "290px",
                            marginTop: "-39px",
                          }}
                          variant="outline-secondary"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        <Form.Control.Feedback type="invalid">
                          mot de passe contient 8 caracteres
                        </Form.Control.Feedback>
                      </Form.Group>
                      <div className="d-grid gap-2">
                        <Button
                          className="btn-conx"
                          onClick={handleSubmit}
                          size="lg"
                          disabled={!isFormValid()}
                        >
                          Se connecter
                        </Button>
                        <a href="/forgot_password" className="linkM">
                          Mot de passe oublié ?
                        </a>
                        <Form.Label style={{ textAlign: "center" }}>
                          ou
                        </Form.Label>
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
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                style={{
                                  borderColor: "black",
                                  width: "100%",
                                  marginBottom: "10px",
                                }}
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
                          {/* <FacebookLogin
                appId="5341302392569355"
                autoLoad={false}
                cssClass={"facebook-button"}
                fields="name,email,picture"
                callback={responseFacebook}
                icon={
                  <FacebookRounded
                    style={{ color: "#0163E0", marginRight: 59 }}
                  />
                }
              /> */}
                        </div>

                        <Form.Label style={{ marginBottom: "10px" }}>
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
                  <Snackbar
                    autoHideDuration={2500}
                    open={err === "" ? false : true}
                    onClose={() => {
                      setErr("");
                    }}
                  >
                    <Alert
                      variant="filled"
                      severity="error"
                      onClose={() => {
                        setErr("");
                      }}
                    >
                      {err}
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    autoHideDuration={2500}
                    open={success === "" ? false : true}
                    onClose={() => {
                      setSuccess("");
                    }}
                  >
                    <Alert
                      variant="filled"
                      severity="success"
                      onClose={() => {
                        setSuccess("");
                      }}
                    >
                      {success}
                    </Alert>
                  </Snackbar>
                </div>
              </Modal.Body>
            </Modal>
            <Button
              className="button-inscription"
              onClick={handleShow1}
              variant="light"
            >
              S'inscrire
            </Button>

            <NativeSelect
              disableUnderline="none"
              defaultValue="TND"
              className="link-postuler-enseigner1"
            >
              <option value="TND">TND</option>
              <option value="EUR">EUR</option>
            </NativeSelect>
            <NativeSelect
              className="link-postuler-enseigner2"
              defaultValue="FR"
              disableUnderline="none"
            >
              <option value="FR">Fr</option>
              <option value="ENG">ENG</option>
            </NativeSelect>

            <Modal centered show={show1} onHide={handleClose1} animation={true}>
              <Modal.Header closeButton>
                <Modal.Title className="titl">
                  <h2 className="title-inscri">S'inscrire</h2>
                  <p className="sous-title-inscri">
                    Passez votre temps libre à étudier avec les meilleurs
                    instructeurs.
                  </p>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  className={`${fex ? "inscrire" : ""} `}
                  setShow1={setShow1}
                >
                  <Form
                    
                    className="form"
                    style={{ width: "90%", marginLeft: "5%" }}
                  >
                    <Form.Group className="mb-3" style={{ width: "100%" }}>
                      <Form.Label className="labelForm">Nom complet</Form.Label>
                      <Form.Control
                        type="Normal text"
                        placeholder="Saisissez votre mot de passe"
                        name="name"
                        //value={name}
                        required
                        onChange={handleNameChange}
                        isInvalid={nameError}
                      />
                      <Form.Control.Feedback type="invalid">
                        Name is required and at least 3 character
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="labelForm">
                        Adresse e-mail
                      </Form.Label>
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
                      <Form.Label className="labelForm">
                        Mot de passe
                      </Form.Label>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Créez votre mot de passe"
                        name="password"
                        required
                        onChange={handlePasswordChange}
                        isInvalid={passwordError}
                      />
                      <IconButton
                        className="eye"
                        style={{
                          position: "absolute",
                          marginLeft: "350px",
                          marginTop: "-39px",
                        }}
                        variant="outline-secondary"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                      <Form.Control.Feedback type="invalid">
                        mot de passe contient 8 caracteres
                      </Form.Control.Feedback>
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button
                        className="btn-inscr"
                        size="lg" onClick={handleSubmit1}
                        disabled={!isFormValid()} 
                      >
                        S'inscrire
                      </Button>
                      <Form.Label style={{ textAlign: "center" }}>
                        ou
                      </Form.Label>
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
                                width: "100%",
                                marginBottom: "10px",
                              }}
                              fullWidth
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
                      <Form.Label style={{ marginBottom: "10px" }}>
                        Vous avez déjà un compte ?
                        <a
                          href="/connexion"
                          style={{ marginLeft: "5px" }}
                          className="link"
                          onClick={() => (fex = true)}
                        >
                          Se connecter
                        </a>
                      </Form.Label>
                    </div>
                  </Form>
                  <Snackbar
                    autoHideDuration={2500}
                    open={err === "" ? false : true}
                    onClose={() => {
                      setErr("");
                    }}
                  >
                    <Alert
                      variant="filled"
                      severity="error"
                      onClose={() => {
                        setErr("");
                      }}
                    >
                      {err}
                    </Alert>
                  </Snackbar>
                  <Snackbar
                    autoHideDuration={2500}
                    open={success === "" ? false : true}
                    onClose={() => {
                      setSuccess("");
                    }}
                  >
                    <Alert
                      variant="filled"
                      severity="success"
                      onClose={() => {
                        setSuccess("");
                      }}
                    >
                      {success}
                    </Alert>
                  </Snackbar>
                </div>
              </Modal.Body>
            </Modal>
          </>
        )}
      </Navbar>
    </div>
  );
}

export default Header;

/*<NativeSelect disableUnderline="none" className="categorie-content"
>
 <option  href="/profil" className="categorie-lien"  value="TND">Profil</option>
 <option  href="/profil"  > <p onClick={handleLogout} className="categorie-lien">
   Se déconnecter
 </p></option>
 

</NativeSelect>


 <p
            aria-describedby={id3}
            variant="contained"
            color="primary"
            className="categorie-title"
            onClick={handleClick3}
          >
            Catégories 
            <ArrowDropDownIcon/> 
          </p> 
<Popper
id={id3}
open={open3}
anchorEl={anchorEl3}
onClose={handleClose3}
anchorOrigin={{
  vertical: "bottom",
  horizontal: "center",
}}
transformOrigin={{
  vertical: "top",
  horizontal: "center",
}}
>
<div className="categorie-content">
  <a href="/devloppement-web" className="categorie-lien">
    Développement web
  </a>
</div>
<div className="categorie-content">
  <a href="/design" className="categorie-lien">
    Design
  </a>
</div>
<div className="categorie-content">
  <a href="/business" className="categorie-lien">
    Business
  </a>
</div>
<div className="categorie-content">
  <a href="/marketing" className="categorie-lien">
    Marketing
  </a>
</div>
<div className="categorie-content">
  <a href="/developpement-personnel" className="categorie-lien">
    Développement personnel
  </a>
</div>
<div className="categorie-content">
  <a href="/communication" className="categorie-lien">
    Communication
  </a>
</div>
<div className="categorie-content">
  <a href="/photographie" className="categorie-lien">
    Photographie
  </a>
</div>
<div className="categorie-content">
  <a href="/informatique" className="categorie-lien">
    Informatiques et logiciels 
  </a>
</div>
<div className="categorie-content">
  <a href="/mode-de-vie" className="categorie-lien">
    Mode de vie 
  </a>
</div>
<div className="categorie-content">
  <a href="/musique" className="categorie-lien">
    Musique 
  </a>
</div>
</Popper>*/
