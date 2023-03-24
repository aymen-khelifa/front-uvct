import React ,{useState} from 'react'
import { Button , Form} from 'react-bootstrap'
import axios from 'axios'
import { useSelector} from 'react-redux'
import '../AddFormation.css'
import SnackbarSuccess from '../../../components/Snackbar/SnackbarSuccess'
import SnackbarErr from '../../../components/Snackbar/SnackbarErr'

    const sessionState = {
    title:'',
    err: '',
    success: ''
    }

function UpdateSession(props){
    const [session, setSession] = useState(sessionState)
    const {title,err,success} = session
    const token = useSelector(state => state.token)
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
        
                const handleChange = e => {
                    const {name, value} = e.target
                    setSession({...session, [name]:value, err:'', success: ''})
                }

              const updateInfor = async() => {
                try {
                    axios.patch(`/updateSession/${props.id}`, {
                       titre: title ? title : session.titre,
                    }, { headers: {Authorization: token} })
                    setSession({...session, err: '' , success: "Success!"})
                    setOpen(true);
                  
               } catch (err) {
                    setSession({...session, err: err.response.data.msg , success: ''})
                    setOpen2(true);
                }
              }
      
              const handleUpdate = () => {
                  updateInfor()
              }

    return(
        <>
            <Form>
                <Form.Group className="mb-3" >
                <Form.Label className="label">Titre du section</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter un titre" 
                    name="title"
                    required 
                    defaultValue={props.title}
                    onChange={handleChange} 
                    />
                </Form.Group>
            <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme'  onClick={handleUpdate}>Enregistrer la session</Button>
            </div>
          </Form>
        <SnackbarSuccess success={success} open={open}/>
        <SnackbarErr err={err} open2={open2}/>
      </>
    )
}

export default UpdateSession