import React ,{useState} from 'react'
import { Button , Form, Spinner } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import {fetchEvent, dispatchGetEvent} from '../../../../redux/actions/eventsAction';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SnackbarErr from '../../../components/Snackbar/SnackbarErr';
import SnackbarSuccess from '../../../components/Snackbar/SnackbarSuccess';

const initialState = {
    titre:'',
    details:'',
    dateDebut:'',
    dateFin:'',
    nbTicket:'',
    prix:'',
    typeEvent:'',
    affiche:'',
    err: '',
    success: ''
  }

function UpdateEvent(props){
    const token = useSelector(state => state.token)
    const [event, setEvent] = useState(initialState)
    const {title,details,dateStart,dateEnd, nbTicket, price, typeEvent, err, success} = event
    const [affiche, setAffiche] = useState(false)
    const [loading, setLoading] = useState(false)
    const [setFree] = useState(false);
    const [setOnline] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const events1 = useSelector(state => state.events);
    const {id} = useParams()
    const [callback] = useState(false)
    const dispatch = useDispatch()

        useEffect(() => {
            fetchEvent(id).then(res =>{
                dispatch(dispatchGetEvent(res))
            })
        },[id, dispatch, callback])
        
        const handleChange = e => {
            const {name, value} = e.target
            setEvent({...event, [name]:value, err:'', success: ''})
            }

        const changeAffiche = async(e) => {
                    e.preventDefault()
                    try {
                        const file = e.target.files[0]
              
                        if(!file) return setEvent({...event, err: "No files were uploaded." , success: ''})
              
                        if(file.size > 1024 * 1024)
                            return setEvent({...event, err: "Size too large." , success: ''})
              
                        if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                            return setEvent({...event, err: "File format is incorrect." , success: ''})
              
                        let formData =  new FormData()
                        formData.append('file', file)
              
                        setLoading(true)
                        const res = await axios.post('/api/uploadAffiche', formData, {
                            headers: {'content-type': 'multipart/form-data'}
                        })
              
                        setLoading(false)
                        setAffiche(res.data.url)
                        setOpen(true);
                        
                    } catch (err) {
                        setAffiche({...event, err: err.response.data.msg , success: ''})
                        setOpen2(true);
                    }
        }

        const updateInfor = async() => {
                try {
                    axios.patch(`/updateEvent/${id}`, {
                       title: title ? title : events1.title,
                       details: details ? details : events1.details,
                       datStart: dateStart ? dateStart : events1.dateStart,
                       dateEnd: dateEnd ? dateEnd : events1.dateEnd,
                       nbTicket:  nbTicket ?  nbTicket : events1.nbTicket,
                       price:  price ?  price : events1.price,
                       typeEvent:  typeEvent ?  typeEvent : events1.typeEvent,
                       affiche:  affiche ?  affiche : events1.affiche,
                    },{

                        headers: {Authorization: token}
                    })
                    setEvent({...event, err: '' , success: "Événement modifié !"})
                    setOpen(true);
                  
               } catch (err) {
                    setEvent({...event, err: err.response.data.msg , success: ''})
                    setOpen2(true);
                }
        }
      
        const handleUpdate = () => {
                  updateInfor()
        }

    return(
        <div className='ajout-event'>
          <BreadcrumbHeader item="Mes événements" link="/evenements" active="Modifier événement"/>
          <div className='content-ajout'>
            <Form className="form-event">
              <Form.Group className="mb-3" >
                 <Form.Label className="label">Titre d'événement</Form.Label>
                  <Form.Control type="text" 
                  placeholder="Entrer le titre de votre événements" 
                  name="title"
                  defaultValue={events1.title}
                  onChange={handleChange} 
                  required 
                  />
              </Form.Group>
              <Form.Group className="mb-3" >
              <Form.Label className="label">Détails</Form.Label>
                <Form.Control as="textarea" rows={5} 
                placeholder="Ecrire ici..." 
                name="details" 
                defaultValue={events1.details}
                onChange={handleChange} 
                required 
              >
              </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" >
              <Form.Label className="label">Ajouter une Affiche</Form.Label>
              {loading && <Spinner animation="border" variant="secondary" />}
                  <div className="content-affiche">
                  <Form.Label htmlFor="file" > 
                    <img src={affiche ? 
                    affiche 
                    : events1.affiche} alt="" className="affiche-img"></img>
                  <p> <PhotoSizeSelectActualIcon /> Séléctionnez une image </p>
                  </Form.Label>
                  </div>
                <Form.Control type="file" id="file"
                    onChange={changeAffiche}
                    style={{display:"none"}}
              />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Date de début</Form.Label>
                <Form.Control type="datetime-local" 
                    name="dateStart"
                    defaultValue={events1.dateStart}
                    onChange={handleChange} 
                    required 
                />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Date de fin</Form.Label>
                <Form.Control type="datetime-local"
                    name="dateEnd"
                    defaultValue={events1.dateEnd}
                    onChange={handleChange} 
                    required  />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Nombre de tickets</Form.Label>
                <Form.Control type="number" 
                placeholder="0"
                name="nbTicket"
                defaultValue={events1.nbTicket}
                onChange={handleChange} 
                required 
                />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Prix
                <Form.Check 
                type="switch"
                id="custom-switch"
                label="free"
                defaultValue={events1.gratuit}
                onChange={(e) => setFree(e.target.checked)}
              />
              </Form.Label>
                <Form.Control type="number"
                placeholder="0,000 Dt"
                name="price"
                defaultValue={events1.price}
                onChange={handleChange} 
                />
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Type d'événement</Form.Label>
                <Form.Check type="radio" label="En ligne" 
                  defaultValue={events1.enLigne}
                onChange={(e) => setOnline(e.target.checked)}
                />
                <Form.Control type="text" placeholder="Lien de la réunion en ligne"
                name="typeEvent"
                defaultValue={events1.typeEvent}
                onChange={handleChange} 
                  />
              </Form.Group>
          <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme' onClick={handleUpdate}>Confirmer</Button>
          </div>
        </Form>
      </div>
          <SnackbarSuccess success={success} open={open}/>
          <SnackbarErr err={err} open2={open2}/>
        </div>
    )
}

export default UpdateEvent