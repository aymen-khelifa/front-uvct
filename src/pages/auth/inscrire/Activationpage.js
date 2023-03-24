import React, { useState } from "react";
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import './Activationpage.css'
import { Snackbar, Alert} from "@mui/material";
import { Button,Form } from 'react-bootstrap'


 

const Activercompte = () => {
  const navigate = useNavigate();
  const [err , setErr] = useState("");
  const [success , setSuccess] = useState("");
   const handleSubmit = async (e) => {
    e.preventDefault();
          await axios.get('http://localhost:5000/users/activationpage/:activationCode', {
          
          
        }, {
          
          
        },{
             headers: {'X-Requested-With': 'XMLHttpRequest', 
             "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
             "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
            "withCredentials": true 
          }
          
          ).then((response) => {
            const msg = response.data.message;
            if (msg==="le code d'activation semble étre faux !")
            {console.log(msg);setErr(msg);setTimeout(()=>{navigate("/inscrire")},2500);}
            else if (msg==="Votre compte est déja activé !")
            {console.log(msg);setErr(msg);setTimeout(()=>{navigate("/connexion")},2500);}
            else if (msg===" Votre compte est activé avec succées !")
            {console.log(msg);setSuccess(msg);setTimeout(()=>{navigate("/connexion")},2500);}
            else{setErr("erreur");}
            
           
        }).catch(err => {
            console.log(err);
            setErr("erreur");
        });
  
        
    
    }
      


 
  const theme = createTheme();

  return (<div className="fg_pass">
  <h2 className="h2">confirmer votre compte</h2>
      
      <Form >
<Form.Group className="mb-3" controlId="formBasicEmail">

<button
            type="submit" 
            fullWidth onClick={handleSubmit}
            variant="contained" style={{marginLeft:'40%', borderRadius:'5px', color:"white",backgroundColor:"#20384D",width:'100px',height:'35px'}}
            sx={{ mt: 3, mb: 2 }} className="connexion"
          >
            confirmer
          </button>
    
</Form.Group>
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
</Form>
</div>





);
};

export default  Activercompte ;