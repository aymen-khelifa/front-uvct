import React, {useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import { Button, Form} from 'react-bootstrap'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import SnackbarSuccess from '../../../components/Snackbar/SnackbarSuccess'
import SnackbarErr from '../../../components/Snackbar/SnackbarErr'

    const initialState = {
      titre:'',
      err: '',
      success: ''
    }
function AddMessage() {
    const token = useSelector(state => state.token)
    const [event, setEvent] = useState(initialState)
    const {titre, err, success} = event
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
     
      const handleChangeInput = e => {
        const {name, value} = e.target
        setEvent({...event, [name]:value, err: '', success: ''})
      }
     

      const handleSubmit = async e => {
          e.preventDefault()
          try {
              const res = await axios.post('/envoyerMessage', {
                titre
              },{

                headers: {Authorization: token}
            })

              setEvent({...event, err: '', success: res.data.msg})
              setOpen(true);

          } catch (err) {
              err.response.data.msg && 
              setEvent({...event, err: err.response.data.msg, success: ''})
              setOpen2(true);
          }
      }

  return (
  <div className='ajout-event'>
    <BreadcrumbHeader item="Mes messages" link="/messages" active="Ajouter un nouveau message"/>
      <div className='content-ajout'>
        <Form className="form-event" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
             <Form.Label className="label">Destinataire</Form.Label>
              <Form.Control type="text" 
              placeholder="À" 
              name="titre"
              value={titre}
              onChange={handleChangeInput} 
              required 
              />
          </Form.Group>
          <Form.Group className="mb-3" >
             <Form.Label className="label">Message</Form.Label>
              <Form.Control type="text" 
              placeholder="Entrer votre message" 
              name="titre"
              value={titre}
              onChange={handleChangeInput} 
              required 
              />
          </Form.Group>
      <div className="content-btn">
          <Button className='btn-annnuler'>Annuler</Button>
          <Button  className='btn-confirme'  type="submit">Confirmer</Button>
      </div>
    </Form>
  </div>
  <SnackbarSuccess success={success} open={open}/>
  <SnackbarErr err={err} open2={open2}/>
  </div>
  )
}

export default AddMessage