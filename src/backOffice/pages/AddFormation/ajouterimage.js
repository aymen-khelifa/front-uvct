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
import SkeletonImage from 'antd/lib/skeleton/Image'
import { getformationcandi } from '../../../redux/features/detailsforSlice'

const initialState = {
  name: '',
  phone:'',
  email:'',
  image:'',
  speciality:'',
  password:'',
  cf_password: '',
  err: '',
  success: ''
}


function PublierCours() {
    const token = useSelector(state => state.token)
    
    //const {subTitle,description,price,categorie,level, } = data
    const formation = useSelector((state) => state.detailfor.candidatfordet);

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
    const[image,setImage]=useState("");
    const [data, setData] = useState(initialState)
    const[preview,setPreview]=useState("");


    useEffect(() => {
         
      dispatch(getformationcandi(id))
  
     },[token,id, dispatch, callback])

        const changeAffiche = async(e) => {
          e.preventDefault()
          try {
            const image= e.target.files[0]
            setImage(image);
            setPreview(URL.createObjectURL(image));

            if(!image) return setData({...data, err: "Aucun fichier n'a été téléchargé." , success: 'Photo téléchargée'})

            if(image.size > 1024 * 1024)
                return setData({...data, err: "Taille trop grande." , success: 'Photo téléchargée'})

            if(image.type !== 'image/jpeg' && image.type !== 'image/png')
                return setData({...data, err: "Le format de fichier est incorrect." , success: 'Photo téléchargée'})

            let formData =  new FormData()
            formData.append('file', image)

            setLoading(true)
              const res = await axios.patch(`http://localhost:5000/formations/ajouterimage/${id}`, formData, {
                headers: {'X-Requested-With': 'XMLHttpRequest', 
               "content-type":"multipart/form-data", "Access-Control-Allow-Origin": "http://localhost:5000", 
               "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
              "withCredentials": true ,// Authorization: token
           });
           setSuccess('image ajoutée!');

           setLoading(false)
           SkeletonImage(res.data.url)
           window.location.reload()
           
    
             
              
          } catch (err) {
              //setAffiche({...data, err: err.response.data.msg , success: ''})
              setOpen2(true);
          }
        }
 
      
      
        

      

        
       
  return (
    <div className="content-admin"  style={{width:'100%'  }}>
        <h5>Page d'accueil du cours</h5>
        <Form >
           
            
          
              <Form.Group className="mb-3" >
              {loading && <Spinner animation="border" variant="secondary" />}
              <Form.Label className="label">Images du cours</Form.Label>
              <div className="content-affiche" style={{width:'50%' ,marginLeft:'25%'}}>
              <Form.Label htmlFor="file" style={{width:'500%',height: '20%'  }}> 
              {/*src={affiche ? affiche : formations.affiche}*/}
                <img src={formation?.url} alt="" className="affiche-img" style={{width:'100%'  }}/>
             {/* <p> <PhotoSizeSelectActualIcon /> Séléctionnez une image </p>*/}
              </Form.Label>
              </div>
            <Form.Control type="file" id="file"
                onChange={changeAffiche} placeholder='ajouter iamge'
                style={{display:"none"}}
              />
              </Form.Group>
          
             
             
             
             
          <div className="content-btn">
              {/*<Button className='btn-annnuler'>Annuler</Button>*/}
              <Button  className='btn-confirme'  onClick={changeAffiche}>Confirmer</Button>
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