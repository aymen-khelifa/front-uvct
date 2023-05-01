import React, {useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Button, Form} from 'react-bootstrap'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import { Link, useParams } from "react-router-dom";
import {Snackbar,Alert} from "@mui/material";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

    const initialState = {
      titre:'',
      err: '',
      success: ''
    }
function AddMessage() {
    const token = useSelector(state => state.token)
    const [event, setEvent] = useState(initialState)
    //const {titre, err, success} = event
    const user=useSelector(state => state.auth.user)
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState(false); 
    const [objectif, setObjectif] = useState("");
    const [objectifError, setObjectifError] = useState(false); 
    const [destinataire, setDestinataire] = useState("");
    const [destinataireError, setDestinataireError] = useState(false); 
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");


    const handleDestinataireChange = (event) => {
      const { value } = event.target;
      setDestinataire(value);
      setDestinataireError(value === "" || !/\S+@\S+\.\S+/.test(value))
    };
     
      const handleObjectifChange = (event) => {
        const { value } = event.target;
        setObjectif(value);
        setObjectifError(value.length < 4);
      };
      const handleMessageChange = (event) => {
        const { value } = event.target;
        setMessage(value);
        setMessageError(value.length < 8);
      };
      const isFormValid = () => {
        // add validation rules here
        return message !== '' && objectif !== ''  && destinataire !== '' && !messageError  && !destinataireError && !objectifError ;
      };
      const handleSubmit = async e => {
          e.preventDefault()
          try {
              const res = await axios.post(`http://localhost:5000/messages/addmessage/${user.UUid}`, {
                objectif:objectif,
                message:message,
                destinataire:destinataire,
              },{
                headers: {'X-Requested-With': 'XMLHttpRequest', 
                "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
               "withCredentials": true 
               // headers: {Authorization: token}
            });
            if (res.data.message==='message envoyé avec succées ')
            {setSuccess('message envoyé avec succées ');}
            if (res.data.message==='instructeur non trouvé')
            {setErr('instructeur non trouvé');}
            if (res.data.message==='Une erreur est survenue ')
            {setErr('Une erreur est survenue ');}
            else{setErr("erreur");}

          } catch (err) {
            setErr('Une erreur est survenue ');
          }
      }

  return (
  <div className='ajout-event'>
    <BreadcrumbHeader item="Mes messages" link="/messages" active="Ajouter un nouveau message"/>
      <div className='content-ajout'>
      <Link to="/messages">
        <ArrowBackIcon className="icon-back" />
      </Link>
        <Form className="form-event" >
        <Form.Group className="mb-3" >
             <Form.Label className="label">Destinataire</Form.Label>
              <Form.Control type="text" 
              placeholder="À" 
              name="titre"
              
              onChange={handleDestinataireChange} 
              error={destinataireError}
                     isInvalid={destinataireError} 
                    
                  /><Form.Control.Feedback type="invalid">
              saisir email valide
               </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
             <Form.Label className="label">titre</Form.Label>
              <Form.Control type="text" 
              placeholder="saissir le titre" 
              name="titre"
              
              onChange={handleObjectifChange} 
              error={objectifError}
                     isInvalid={objectifError} 
                    
                  /><Form.Control.Feedback type="invalid">
              saisir message superieur a 4 character
               </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
             <Form.Label className="label">Message</Form.Label>
              <Form.Control type="text" 
              placeholder="Entrer votre message" 
              name="titre"
             
              onChange={handleMessageChange} 
              error={messageError}
                     isInvalid={messageError} 
                    
                  /><Form.Control.Feedback type="invalid">
              saisir message superieur a 8 character
               </Form.Control.Feedback>
          </Form.Group>
      <div className="content-btn">
          
          <Button  className='btn-confirme' disabled={!isFormValid()} onClick={handleSubmit}  type="submit">Confirmer</Button>
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
  )
}

export default AddMessage