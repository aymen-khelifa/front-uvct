import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserDetails,
  dispatchGetUserDetails,
} from "../../../../redux/actions/authAction";
import { isEmail } from "../../../../components/utils/validation/Validation";
import { useParams } from "react-router-dom";
import PhoneIcon from "@material-ui/icons/Phone";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DescriptionIcon from "@material-ui/icons/Description";
import "./Candidat.css";
import MessageIcon from "@material-ui/icons/Message";
import { Button } from "react-bootstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Candidat() {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { admin } = auth;
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [callback, ] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { err, success } = data;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClose1 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen1(false);
  };

  useEffect(() => {
    fetchUserDetails(token, id).then((res) => {
      dispatch(dispatchGetUserDetails(res));
    });
  }, [token, id, dispatch, callback]);

  const handleAccept = async (id) => {
    if (!isEmail(admin.email))
      return setData({ ...data, err: "Invalid emails.", success: "" });
    const email = admin.email;
    try {
      if (admin._id !== id) {
        await axios.post(
          `/user/acceptInstr/${id}`,{ email },
          {
            headers: { Authorization: token },
          }
        );
        setData({ ...data, err: "", success: "Candidat accepté!" });
        setOpen(true);
      }
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
      setOpen1(true);
    }
  };

  return (
    <div className="candidat">
      <a href="/instructeur">
        <ArrowBackIcon className="icon-back" />
      </a>
      <div className="btn-repond">
        <Button className="btn-refuser">Refuser</Button>
        <Button
          className="btn-accepter"
          onClick={() => handleAccept(admin._id)}
        >
          Accepter
        </Button>
      </div>
      <div className="content-candidat">
        <h1 className="name-candidat">{admin.name}</h1>
        <h5 className="info-candidat">
          <WorkOutlineIcon className="icon-details" />
          {admin.specialite}
        </h5>
        <h5 className="info-candidat">
          <PhoneIcon className="icon-details" />
          {admin.tele}
        </h5>
        <h5 className="info-candidat">
          <MailOutlineIcon className="icon-details" />
          {admin.email}
        </h5>
        <h5 className="info-candidat">
          <DescriptionIcon className="icon-details" />
          {admin.cv}
        </h5>
        <h5 className="info-candidat">
          <MessageIcon className="icon-details" />
          {admin.message}
        </h5>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={open1}
        autoHideDuration={6000}
        onClose={handleClose1}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose1} severity="error">
          {err}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Candidat;
