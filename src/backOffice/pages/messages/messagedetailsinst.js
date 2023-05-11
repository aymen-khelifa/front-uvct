
import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import { Snackbar, Alert} from "@mui/material";

import BreadcrumbHeader from '../../../backOffice/components/breadcrumb/BreadcrumbHeader';
import { useParams } from 'react-router-dom';
import '../../../backOffice/pages/admin/reclamations/Reclamations.css'
import ReplyIcon from '@material-ui/icons/Reply';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios'
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

import { messagebyid } from '../../../redux/features/msgbyid';

const initialState = {
    message:'',
    err: '',
    success: ''
  }

function Reclamation() {
    
    const msg = useSelector(state => state.messagebyid.msgbyid1)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [response, setReponse] = useState("")
    const [reponseError, setReponseError] = useState(false);

    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const [open, setOpen] = useState(false);
    const token = useSelector(state => state.token)
    const [open2, setOpen2] = useState(false);

      useEffect(() => {
     
                dispatch(messagebyid(id))
            
      },[id,dispatch])

  
    
      const handleSubmit = async e => {
        e.preventDefault()
      
  
        try {
             await axios.patch(`http://localhost:5000/messages/addreponse/${id}`, {response:response}, { 
          //    headers: {Authorization: token}
              headers: {'X-Requested-With': 'XMLHttpRequest', 
              "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
              "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
             "withCredentials": true  }).then((response) => {
              const message = response.data.message;console.log(message)
  
             if (message==='reponse ajouté')
                {setSuccess('reponse ajouté');}
                if (message==='ce Message a déjà une reponse')
                {setErr('ce Message a déjà une reponse');}
                else{setErr("erreur");}})
  
        } catch (err) {
          setErr("erreur");
        }
      }
      const handleReponseChange = (event) => {
        const { value } = event.target;
        setReponse(value);
        setReponseError(value.length < 4);
      };
      const isFormValid = () => {
        // add validation rules here
        return response !== ''  && !reponseError  ;
      };

  return (
    <div className='add-admin'>
      <BreadcrumbHeader item="messages à moi " link="/msginst" active="message"/>
        <div className='content-admin'>
        <Link to="/msginst">
        <ArrowBackIcon className="icon-back" />
      </Link>
        <h4>Envoyé par:<h5>Name:<h6>{msg?.user?.name}</h6></h5><h5>Email:<h6>{msg?.user?.email}</h6></h5></h4>
        <h4>Objectif: {msg?.objectif}</h4>
        <div className='header-reclamation'>
        
       
        </div>
        <h4>Message:</h4>
        <Form.Group className="mb-3" >
                <Form.Control as="textarea" rows={7} 
                defaultValue={msg?.message}
                required  disabled
              />
            </Form.Group>
            <h4>Reponse:</h4>
            <Form.Group className="mb-3" >
                <Form.Control as="textarea" rows={7} 
                defaultValue={msg?.response}
                required  disabled
              />
            </Form.Group>
        
        <div className='repondre-reclamation' onClick={() => setOpen(true)}>
            <ReplyIcon /><p>Réponse</p>
        </div>
        {
            open &&
            (
                <div className='add-reponse'>
                   <Form >
                   <Form.Group className="mb-3" >
                    <Form.Label className="label">Reponse</Form.Label>
                    <Form.Control type="text" placeholder="Ecrire ici..." as="textarea" rows={4}
                        name="message" 
                        
                        onChange={handleReponseChange}
                    isInvalid={reponseError}                            
                    /><Form.Control.Feedback type="invalid">
              Reponse superieur a 4 caracteres
               </Form.Control.Feedback>
                    </Form.Group>
                    <Button  className='btn-annuler' onClick={() => setOpen(false)} size="lg" >
                        annuler
                    </Button>
                    <Button onClick={handleSubmit}  disabled={!isFormValid()} className='btn-confirmer' type="submit" size="lg" >
                        Envoyer
                    </Button>
                   </Form>
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
                
            )
        }
        </div>
    </div>
  )
}

export default Reclamation