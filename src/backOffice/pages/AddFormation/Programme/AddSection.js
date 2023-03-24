import React ,{useState, useEffect} from 'react'
import {fetchFormation, dispatchGetFormation} from '../../../../redux/actions/formationsAction'
import { Button , Form} from 'react-bootstrap'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';
import '../AddFormation.css'
import SnackbarSuccess from '../../../components/Snackbar/SnackbarSuccess'
import SnackbarErr from '../../../components/Snackbar/SnackbarErr'

const sectionState = {
    title:'',
    formation:'',
    objectif:'',
    err: '',
    success: ''
    }

function AddSection(){
    const [section, setSection] = useState(sectionState)
    const {objectif,title,err, success} = section
    const formations = useSelector(state => state.formations)
    const token = useSelector(state => state.token)
    const [callback] = useState(false)
    const dispatch = useDispatch()
    const {titre1} = useParams();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
        
          useEffect(() => {
            fetchFormation(token,titre1).then(res =>{
                  dispatch(dispatchGetFormation(res))
              })
            },[token,titre1, dispatch, callback])
            

            const handleChangeInput = e => {
                const {name, value} = e.target
                setSection({...section, [name]:value, err: '', success: ''})
              }

            const handleSubmit = async (e,titre1) => {
                e.preventDefault()
                try {
                if(formations.titre !== titre1){
                    const res = await axios.post(`/ajoutsect/${formations.title}`,
                    {title, objectif, formation: formations._id}, {headers: {Authorization: token}
                })
                    setSection({...section, err: '', success: res.data.msg})
                    setOpen(true);
                   

                  } } catch (err) { 
                err.response.data.msg &&
                setSection({...section, err: err.response.data.msg, success: ''})
                setOpen2(true);
                }
            }

    return(
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                <Form.Label className="label">Titre du section</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Enter un titre" 
                    name="title"
                    required 
                    value={title}
                    onChange={handleChangeInput} 
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                <Form.Label className="label">Qu'est-ce que les participants seront capables de faire à la fin de cette section ?</Form.Label>
                    <Form.Control type="text" 
                    placeholder="Saisir un objectif d'apprentissage" 
                    name="objectif"
                    value={objectif}
                    onChange={handleChangeInput} 
                    />
                </Form.Group>
            <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme'  type="submit">Enregistrer la section</Button>
            </div>
          </Form>
          <SnackbarSuccess success={success} open={open}/>
          <SnackbarErr err={err} open2={open2}/>
      </>
    )
}

export default AddSection