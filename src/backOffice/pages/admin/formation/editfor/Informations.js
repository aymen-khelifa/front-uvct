import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {ShowSuccessMsg, ShowErrMsg} from '../../../../../components/utils/notifications/Nofification'
import {useSelector, useDispatch} from 'react-redux'
import {fetchFormation, dispatchGetFormation} from '../../../../../redux/actions/formationsAction'
import { Button, Form, Spinner } from 'react-bootstrap'
import '../Formation.css'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import MovieIcon from '@material-ui/icons/Movie';
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import SkeletonImage from 'antd/lib/skeleton/Image'
import { getformation } from '../../../../../redux/features/detailsforSlice'
import { Snackbar, Alert} from "@mui/material";




const initialState = {
  title:'',
  description:'',
  affiche:'',
  videopromo:'',
  price:'',
  categorie:'',
  level:'',
  err: '',
  success: ''
}

function Informations() {
    const token = useSelector(state => state.token)
   // const {description,price,categorie,level} = data
    const {id} = useParams();
    const [free, setFree] = useState(false);
    const [affiche, setAffiche] = useState(false);
    const [videopromo, setVideopromo] = useState(false);
    const [loading, setLoading] = useState(false);
    const formation = useSelector(state => state.detailfor.fordet)
    const [callback, setCallback] = useState(false)
    const dispatch = useDispatch()
    const[image,setImage]=useState("");
    const [data, setData] = useState(initialState)
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const[preview,setPreview]=useState("");
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
        /*useEffect(() => {
          fetchFormation(token,titre1).then(res =>{
                dispatch(dispatchGetFormation(res))
            })
          },[token,titre1, dispatch, callback])*/

        const handleChange = e => {
            const {name, value} = e.target
            setData({...data, [name]:value, err:'', success: ''})
        }
        useEffect(() => {
  
          dispatch(getformation(id));
          
        }
      , [id, dispatch]);
      const handleTitleChange = (event) => {
        const { value } = event.target;
        setTitle(value);
        setTitleError(value.length < 4);
      };
     
      const handleDescriptionChange = (event) => {
        const { value } = event.target;
        setDescription(value);
        setDescriptionError(value.length < 4);
      };
     
      const handlePriceChange = (event) => {
        const { value } = event.target;
        setPrice(value);
        setPriceError(value < 50);
      };
      const handleCategorieChange = (event) => {
        const { value } = event.target;
        setCategorie(value);
        
      };
      const handleLevelChange = (event) => {
        const { value } = event.target;
        setLevel(value);
        
      };
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
             // setOpen2(true);
          }
        }
 

        const updateInfor = async() => {
          try {
           
              axios.patch(`http://localhost:5000/formations/accepterformation/${id}`, {
                 description: description ,
                   price : price, 
                   categorie : categorie,
                   level : level  ,
                   free : free , 
                  
              }, { 
                headers: {'X-Requested-With': 'XMLHttpRequest', 
                "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
               "withCredentials": true 
               // {Authorization: token}
              })
              setData({...data, err: '' , success: "Success!"})
            
         } catch (err) {
              setData({...data, err: err.response.data.msg , success: ''})
          }
        }
        const isFormValid = () => {
          // add validation rules here
          return  title  !== ''  && description !== '' && price !== ''  && categorie !== '' && level !== '' 
          &&  !titleError && !descriptionError && !priceError    ;
        };
       
    return (
      <div>
        <Form className="form-event" >
          
            <Form.Group className="mb-3" >
                <Form.Label className="label">Titre du formation</Form.Label>
                  <Form.Control type="text" 
                 // defaultValue={titre1}
                  name="title" placeholder={formation?.title}
                  onChange={handleTitleChange}
                    isInvalid={titleError}                            
                    /><Form.Control.Feedback type="invalid">
              Title is required and at least 4 character
               </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className="label">Description</Form.Label>
                <Form.Control as="textarea" rows={5} 
                placeholder={formation?.description} 
                name="description" 
               
                //defaultValue={formations.description}
                onChange={handleDescriptionChange}
                    isInvalid={descriptionError}                            
                    /><Form.Control.Feedback type="invalid">
              descrption is required and at least 4 character
               </Form.Control.Feedback>
            </Form.Group>


           
           
            
          
           <Form.Group className="mb-3" >
          
           <Form.Label className="label">Image du cours:</Form.Label>
           <div className="content-affiche" style={{width:'50%' ,marginLeft:'25%'}}>
           <Form.Label htmlFor="file" style={{width:'500%',height: '20%'  }}> 
           {/*src={affiche ? affiche : formations.affiche}*/}
             <img src={formation?.url} alt="" className="affiche-img" style={{width:'100%'  }}/>
          {/* */}<p> <Form.Control type="file" id="file"
                onChange={changeAffiche} placeholder='ajouter iamge'
                style={{display:"none"}}
              /> <PhotoSizeSelectActualIcon /> Séléctionnez une image </p>
           </Form.Label>
           </div>
        
           </Form.Group>
          
          




              <Form.Group className="mb-3" >
                <Form.Label className="label">Catégorie</Form.Label>
                <Form.Select 
                    required 
                    name="categorie"
                    onChange={handleCategorieChange}
                                             
                    >
                    {/*<option defaultValue={formations.categorie}>{formations.categorie}</option>*/}
                    <option value="développement web">développement web</option>
                    <option value="développement mobile">développement mobile</option>
                    <option value="développement personnel">développement personnel</option>
                    <option value="design">design</option>
                    <option value="business">business</option>
                    <option value="design">design</option>
                    <option value="communication">communication</option>
                    <option value="photographie">photographie</option>
                    <option value="mode de vie">design</option>
                    <option value="musique">musique</option>
            </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Niveau</Form.Label>
                <Form.Select 
                    required 
                    name="level"
                    onChange={handleLevelChange}
                                             
                    >
                   {/* <option defaultValue={formations.level}>{formations.level}</option>*/}
                    <option value="Débutant">Débutant</option>
                    <option value="développement mobile">Expert</option>
            </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Prix
               
              </Form.Label>
                <Form.Control type="number"
                placeholder={formation?.price} 
                name="prix" 
                //defaultValue={formations.price}
                onChange={handlePriceChange}
                    isInvalid={priceError}                            
                    /><Form.Control.Feedback type="invalid">
              prix is required and at least 4 character
               </Form.Control.Feedback>
              </Form.Group>
          <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme'  disabled={!isFormValid()} onClick={updateInfor}>Confirmer</Button>
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

export default Informations