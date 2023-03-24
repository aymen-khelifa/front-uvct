import React ,{useState} from 'react'
import { Button , Form } from 'react-bootstrap'
import {useSelector} from 'react-redux'
import axios from 'axios'
import '../AddFormation.css'
import SnackbarErr from '../../../components/Snackbar/SnackbarErr'
import SnackbarSuccess from '../../../components/Snackbar/SnackbarSuccess'

    const sessionState = {
      title:'',
      section:'',
      err: '',
      success: ''
      }

      function AddSession(props){
        const token = useSelector(state => state.token)
        const [session, setSession] = useState(sessionState)
        const {title, err, success} = session
        const [open, setOpen] = React.useState(false);
        const [open2, setOpen2] = React.useState(false);
        
          const handleChangeInput = e => {
            const {name, value} = e.target
            setSession({...session, [name]:value, err: '', success: ''})
          }

        const handleSubmit = async (e,idS) => {
            e.preventDefault()
            try {  if(idS !== props.id){
                const res = await axios.post("/ajoutSession",
                {title, section: props.id }, {headers: {Authorization: token}
            })
                setSession({...session, err: '', success: res.data.msg})
                setOpen(true);
            }  
              }
          catch (err) { 
            err.response.data.msg &&
            setSession({...session, err: err.response.data.msg, success: ''})
            setOpen2(true);
            }
        }

      return(
        <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                    <Form.Label className="label">Nouvelle session</Form.Label>
                        <Form.Control type="text" 
                        placeholder="Entrer un titre" 
                        name="title"
                        value={title}
                        onChange={handleChangeInput}
                        />
                    </Form.Group>
                <div className="content-btn">
                  <Button className='btn-annnuler'>Annuler</Button>
                  <Button  className='btn-confirme'  type="submit">Ajouter une session</Button>
                </div>
              </Form>
              <SnackbarSuccess success={success} open={open}/>
              <SnackbarErr err={err} open2={open2}/>
        </div>
      )
    }

export default AddSession