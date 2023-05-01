import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Profil.css";
import { Button, Form } from "react-bootstrap";
import { message } from "antd";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import SnackbarSuccess from "../../components/Snackbar/SnackbarSuccess";
import SnackbarErr from "../../components/Snackbar/SnackbarErr";
import LeftList from "../../components/leftList/LeftList";
import PhoneIcon from "@material-ui/icons/Phone";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DescriptionIcon from "@material-ui/icons/Description";
import MessageIcon from "@material-ui/icons/Message";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";
const key = "updatable";
const openMessage = () => {
  message.loading({ content: "Loading...", key });
  setTimeout(() => {
    message.success({ content: "Loaded!", key, duration: 2 });
  }, 1000);
};
const initialState = {
  name: "",
  phone: "",
  site: "",
  description: "",
  err: "",
  success: "",
};
function Profil() {
  const dispatch = useDispatch();
  //const auth = useSelector((state) => state.auth);
  //const token = useSelector((state) => state.token);
  
  //const { user, isInstr, setIsLogged } = auth;
  const [data, setData] = useState(initialState);
  // const {name,site,phone,description, err, success} = data
  //const {site,description, err, success} = data
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [telError, setTelError] = useState(false);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value, err: "", success: "" });
  };
  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const avatar = e.target.files[0];

      if (!avatar)
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });

      if (avatar.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });

      if (avatar.type !== "image/jpeg" && avatar.type !== "image/png")
        return setData({
          ...data,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", avatar);

      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/users/ajoutavatar",
        avatar,
        {
          headers: {
            Accept: "*/*",
            AcceptEncoding: "gzip, deflate, br",
            "X-Requested-With": "XMLHttpRequest",
            "content-type": "multipart/form-data",
            boundary: <calculated when request is sent></calculated>,
            "Access-Control-Allow-Origin": "http://localhost:5000",
            "Access-Control-Request-Methods":
              "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS",
          },
          withCredentials: true,
        }
      );

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };
  const updateInfor = () => {
    try {
      axios.patch(
        "http://localhost:5000/users/updateinfo",
        {
          name: name,
          avatar: avatar,
          tel: tel,
          email: email,
          //site: site ? site : user.site,
          message: message,
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
      setSuccess("profile modifié");
    } catch (err) {
      setSuccess("erreur");
      //setData({...data, err: err.response.data.msg , success: ''})
      // setOpen2(true);
    }
  };
  const handleUpdate = () => {
    updateInfor();
  };
  const isFormValid = () => {
    // add validation rules here
    return email !== "" && !emailError;
  };
  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    setNameError(value.length < 3);
  };
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(value === "" || !/\S+@\S+\.\S+/.test(value));
  };
  const handleTelChange = (event) => {
    const { value } = event.target;
    setTel(value);
    setTelError(!/^\d{8}$/.test(value));
  };
  useEffect(() => {
    // Mettre à jour la valeur de isLogged à true au chargement du composant
   
  }, []);
  return (
    <>
      <div className="profile">
        <h2 className="title-profil">Informations générales</h2>
        <h2 className="title-profil1">Welcome </h2>
        <div className="content-profil">
          <Form className="form-profil">
            <Form.Group>
              {loading && openMessage()}
              <div className="profile-pic-div">
                <img  alt="" className="avatar-img" />
                <div className="uploadBtn">
                  <Form.Label htmlFor="file">
                    <PhotoCameraIcon className="icon-camera" />
                  </Form.Label>
                </div>
              </div>
              <Form.Control
                type="file"
                id="file"
                name="avatar"
                onChange={changeAvatar}
                style={{ display: "none" }}
              />
            </Form.Group>
            <div className="content-candidat">
              <h5 className="info-candidat">
                <AccountCircleIcon className="icon-details" />
                
              </h5>

              <h5 className="info-candidat">
                <MailOutlineIcon className="icon-details" />
                
              </h5>
            </div>
            {/* loginUser.role==="instructeur" &&
            (<>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Site web personnel</Form.Label>
                  <Form.Control type="text" placeholder="Enter votre URL"
                    name="site"
                  //  defaultValue={user?.site}
                    onChange={handleChange}
                /><Form.Control.Feedback type="invalid">
              Name is required and at least 3 character
              </Form.Control.Feedback>
             </Form.Group>
             
            </>
            )
          */}
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
    </>
  );
}

export default Profil;
//<SnackbarSuccess success={success} open={open}/>
//      <SnackbarErr err={err} open2={open2}/>
