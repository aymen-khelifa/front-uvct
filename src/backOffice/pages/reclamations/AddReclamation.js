import React,{useState} from 'react';
import {isEmpty} from '../../../components/utils/validation/Validation'
import axios from 'axios'
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader';
import { Button, Form} from 'react-bootstrap'
import {useSelector} from 'react-redux'

import {Snackbar,Alert} from "@mui/material";

  const initialState = {
    cause: '',
    message:'',
    err: '',
    success: ''
  }

function AddReclamation() {
    const token = useSelector(state => state.token)

    const [data, setData] =useState(initialState);
   // const {cause, message, err, success} = data
    const [sujet, setSujet] = useState("");
    const [message, setMessage] = useState("");
    const [messageError, setMessageError] = useState(false); 
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const user= useSelector(state => state.auth.user)
    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault()
      
  
        try {console.log(user.UUid)
            const res = await axios.post(`http://localhost:5000/reclamations/addReclamation/${user.UUid}`, {sujet:sujet, message:message}, { 
              //headers: {Authorization: token}
              headers: {'X-Requested-With': 'XMLHttpRequest', 
                      "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                      "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                     "withCredentials": true 
            }).then((response) => {
              const message = response.data.message;console.log(message)
              if (message==='reclamation envoyé avec succées ')
                    {setSuccess('reclamation envoyé avec succées ');}
                    if (message==='Une erreur est survenue ')
                    {setErr('Une erreur est survenue ');}
                    else{setErr("erreur");}})
            
  
            
  
        } catch (err) {setErr("erreur");
           
        }
      }
      const handleSujetChange = (event) => {
        const { value } = event.target;
        setSujet(value);
        
      };
      const handleMessageChange = (event) => {
        const { value } = event.target;
        setMessage(value);
        setMessageError(value.length < 8);
      };
      const isFormValid = () => {
        // add validation rules here
        return message !== '' && sujet !== ''  && !messageError  ;
      };
      
  return (
      <div className='add-admin'>
      <BreadcrumbHeader item="Mes réclamations" link="/reclamations" active="Ajouter réclamation"/>
        <div className='content-admin'>
          <Form  className='form-admin'>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Sujet</Form.Label>
                  <Form.Select aria-label="Default select example"
                        name="cause"
                        required 
                        
                        onChange={handleSujetChange}>
                        <option value="Problème avec mon compte">Problème avec mon compte</option>
                        <option value="Problème d'accéder à ma formation">Problème d'accéder à ma formation</option>
                        <option value="Problème d'accéder à mon événement">Problème d'accéder à mon événement</option>
                        <option value="Problème avec mon formateur">Problème avec mon formateur</option>
                        <option value="Problème avec le contenu de ma formation">Problème avec le contenu de ma formation</option>
                        <option value="Problème à propos d'une formation">Problème à propos d'une formation</option>
                        <option value="Problème à propos de site web">Problème à propos de site web</option>
                    </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Message</Form.Label>
                  <Form.Control type="text" placeholder="Ecrire ici..." as="textarea" rows={3}
                    name="message" 
                    
                    onChange={handleMessageChange}
                    error={messageError}
                     isInvalid={messageError} 
                    
                  /><Form.Control.Feedback type="invalid">
              saisir message superieur a 8 character
               </Form.Control.Feedback>
            </Form.Group>
            <div className='ctn-btn-admin'>
           
            <Button disabled={!isFormValid()} onClick={handleSubmit} className='btn-confirmer' type="submit" size="lg" >
                Envoyer 
            </Button>
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

export default AddReclamation