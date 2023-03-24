import React,{useState} from 'react';
import {isEmpty} from '../../../components/utils/validation/Validation'
import axios from 'axios'
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader';
import { Button, Form} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import SnackbarSuccess from '../../components/Snackbar/SnackbarSuccess';
import SnackbarErr from '../../components/Snackbar/SnackbarErr';

  const initialState = {
    cause: '',
    message:'',
    err: '',
    success: ''
  }

function AddReclamation() {
    const token = useSelector(state => state.token)
    const [data, setData] =useState(initialState);
    const {cause, message, err, success} = data
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    const handleChangeInput = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err: '', success: ''})
      }
    
      const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(cause) || isEmpty(message))
                return setData({...data, err: "Please fill in all fields.", success: ''})
  
        try {
            const res = await axios.post('/addReclamation', {cause, message}, { headers: {Authorization: token} })
  
            setData({...data, err: '', success: res.data.msg})
            setOpen(true);
  
        } catch (err) {
            err.response.data.msg && 
            setData({...data, err: err.response.data.msg, success: ''})
            setOpen2(true);
        }
      }
      
  return (
      <div className='add-admin'>
      <BreadcrumbHeader item="Mes réclamations" link="/reclamations" active="Ajouter réclamation"/>
        <div className='content-admin'>
          <Form onSubmit={handleSubmit} className='form-admin'>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Sujet</Form.Label>
                  <Form.Select aria-label="Default select example"
                        name="cause"
                        required 
                        value={cause}
                        onChange={handleChangeInput}>
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
                    value={message}
                    onChange={handleChangeInput} 
                    required 
                />
            </Form.Group>
            <div className='ctn-btn-admin'>
            <Button  className='btn-annuler' size="lg" >
                Annuler
            </Button>
            <Button  className='btn-confirmer' type="submit" size="lg" >
                Envoyer
            </Button>
            </div>
          </Form>
      </div>
        <SnackbarSuccess success={success} open={open}/>
        <SnackbarErr err={err} open2={open2}/>
      </div>
    
  )
}

export default AddReclamation