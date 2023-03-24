import React ,{useState} from 'react'
import { Button , Form} from 'react-bootstrap'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import '../AddFormation.css'
import { dispatchGetSection, fetchSection } from '../../../../redux/actions/sectionAction'
import { useEffect } from 'react'
import SnackbarSuccess from '../../../components/Snackbar/SnackbarSuccess'
import SnackbarErr from '../../../components/Snackbar/SnackbarErr'

    const sectionState = {
    title:'',
    formation:'',
    objectif:'',
    err: '',
    success: ''
    }

function UpdateSection(props){
    const [section, setSection] = useState(sectionState)
    const {objectif,title,err,success} = section
    const sections5 = useSelector(state => state.sections)
    const token = useSelector(state => state.token)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const {id} = props.id
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
        
            useEffect(() => {
                    fetchSection(token,id).then(res =>{
                        dispatch(dispatchGetSection(res))
                    })
                },[token,id, dispatch, callback])

                const handleChange = e => {
                    const {name, value} = e.target
                    setSection({...section, [name]:value, err:'', success: ''})
                }

              const updateInfor = async() => {
                try {
                    axios.patch(`/updatesection/${props.id}`, {
                       titre: title ? title : section.description,
                       objectif : objectif ? objectif : section.objectif, 
                    }, { headers: {Authorization: token} })
                    setSection({...section, err: '' , success: "Success!"})
                    setOpen(true)
                  
               } catch (err) {
                    setSection({...section, err: err.response.data.msg , success: ''})
                    setOpen2(true)
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
                    defaultValue={sections5[0].title}
                    onChange={handleChange} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label className="label">Qu'est-ce que les participants seront capables de faire à la fin de cette section ?</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Saisir un objectif d'apprentissage" 
                    name="objectif"
                    defaultValue={sections5[0].objectif}
                    onChange={handleChange} 
                    />
                </Form.Group>
            <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme'  onClick={handleUpdate}>Enregistrer la section</Button>
            </div>
          </Form>
        <SnackbarSuccess success={success} open={open}/>
        <SnackbarErr err={err} open2={open2}/>
      </>
    )
}

export default UpdateSection