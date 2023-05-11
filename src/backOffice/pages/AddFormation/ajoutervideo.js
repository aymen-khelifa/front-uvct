import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {fetchFormation, dispatchGetFormation} from '../../../redux/actions/formationsAction'
import { Button, Form, Spinner } from 'react-bootstrap'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import MovieIcon from '@material-ui/icons/Movie';
import { useNavigate, useParams } from 'react-router-dom'
import './AddFormation.css'
import ReactPlayer from 'react-player'
import { Snackbar, Alert} from "@mui/material";



function PublierCours() {
    const token = useSelector(state => state.token)
    
    //const {subTitle,description,price,categorie,level, } = data
   
    const [free, setFree] = useState(false);
    const [affiche, setAffiche] = useState(false);
    const [videopromo, setVideopromo] = useState(false);
    const [loading, setLoading] = useState(false);
    const formations = useSelector(state => state.formations)
    const [callback] = useState(false)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const navigate= useNavigate()
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);
    const [subTitle, setsubTitle] = useState("");
    const [subTitleError, setsubTitleError] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState(false);
    const [price, setPrice] = useState("");
    const [priceError, setPriceError] = useState(false);
    const [categorie, setCategorie] = useState("");
    const [level, setLevel] = useState("");
    const [ref, setReference] = useState("");
    const [refError, setReferenceError] = useState(false);
    const {id}=useParams()
      

    
 
        const changeVideoPromo = async(e) => {
          e.preventDefault()
          try {
              const file2 = e.target.files[0]
              let formData =  new FormData()
              formData.append('file2', file2)
    
              setLoading(true)
              const res = await axios.post('/api/uploadVideo', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
              })
    
              setLoading(false)
              setVideopromo(res.data.url)
              setOpen(true)
              
          } catch (err) {
              //setVideopromo({...data, err: err.response.data.msg , success: ''})
              setOpen2(true)
          }
        }

      
       

      

       
  return (
    <div className="content-admin"  style={{marginLeft:'10%',marginTop:'5%',marginRight:'10%',width:'400%'  }}>
        <h5>Page d'accueil du cours</h5>
        <Form style={{}}>
           
         
             
            
              <Form.Group className="mb-3" >
                <Form.Label className="label">Vidéo promotionnelle</Form.Label>
                <div className="content-affiche">
                  <Form.Label htmlFor="file" > 
                  {/*url={[{src: videopromo ? videopromo : formations.videopromo}]}*/}
                  <ReactPlayer 
                  controls playing muted width='80%' height='60%' ></ReactPlayer>
                  <p> <MovieIcon /> Séléctionnez un vidéo </p>
                  </Form.Label>
                  </div>
                <Form.Control type="file" id="file2"
                    onChange={changeVideoPromo}
                    style={{display:"none"}}
              />
              </Form.Group>
             
              

          <div className="content-btn">
              {/*<Button className='btn-annnuler'>Annuler</Button>*/}
              <Button  className='btn-confirme'   onClick={changeVideoPromo}>Confirmer</Button>
          </div>
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

export default PublierCours