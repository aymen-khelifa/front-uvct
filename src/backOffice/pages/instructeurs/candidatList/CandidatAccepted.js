import React, {useState} from 'react'
import axios from 'axios'
import {isLength, isMatch} from '../../../../components/utils/validation/Validation'
import {ShowSuccessMsg, ShowErrMsg} from '../../../../components/utils/notifications/Nofification'
import { Button,Form } from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function CandidatAccepted() {
    const {token} = useParams()
    const [data, setData] = useState(initialState)
    const { password, cf_password,success,err} = data
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen1(false);
      };

     const handleChange = e => {

        const {name, value} = e.target

        setData({...data, [name]:value, err:'', success: ''})
    }
const updatePassword = () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})
      
        try {
            axios.patch('/user/updatePasswordInstr', {password},
            {headers: {Authorization: token}}
            )
            setData({...data, err: '' , success: "Updated Success!"})
            navigate("/connexion")
            setOpen(true);
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
            setOpen1(true);
        }
    }
    const handleUpdate = () => {
        if(password) updatePassword()
    }
    return (
        <div className="active_page">
        <h3>Bienvenue à Uvct Training</h3>
                {err && ShowErrMsg(err)}
           {success&& ShowSuccessMsg(success)}
           <Form >
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Control type="password" placeholder="Password" 
    name="password"
    required 
    value={password}
    onChange={handleChange} 
   />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Control type="password" placeholder="Confirm password" 
    name="cf_password"
    value={cf_password}
    onChange={handleChange}
   />
  </Form.Group>

  <div className="d-grid gap-2">
  <Button  className="btn-conx" type="submit" size="lg" onClick={handleUpdate}>
    Se connecter
  </Button>
  </div>
  </Form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success">
                {success}
                </Alert>
        </Snackbar>
        <Snackbar open={open1} autoHideDuration={6000} onClose={handleClose1}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose1} severity="error">
                {err}
                </Alert>
            </Snackbar>
    </div>
    )
}

export default CandidatAccepted