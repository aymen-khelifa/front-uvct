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
        /*useEffect(() => {
          fetchFormation(token,titre1).then(res =>{
                dispatch(dispatchGetFormation(res))
            })
          },[token,titre1, dispatch, callback])*/

       /* const handleChange = e => {
            const {name, value} = e.target
            setData({...data, [name]:value, err:'', success: ''})
        }*/

        const changeAffiche = async(e) => {
          e.preventDefault()
          try {
              const file = e.target.files[0]
    
              if(!file) return //setData({...data, err: "No files were uploaded." , success: ''})
    
              if(file.size > 1024 * 1024)
                  return //setData({...data, err: "Size too large." , success: ''})
    
              if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                  return //setData({...data, err: "File format is incorrect." , success: ''})
    
              let formData =  new FormData()
              formData.append('file', file)
    
              setLoading(true)
              const res = await axios.post('/api/uploadAffiche', formData, {
                  headers: {'content-type': 'multipart/form-data', Authorization: token}
              })
    
              setLoading(false)
              setAffiche(res.data.url)
              
          } catch (err) {
              //setAffiche({...data, err: err.response.data.msg , success: ''})
              setOpen2(true);
          }
        }
 
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
        const handleReferenceChange = (event) => {
          const { value } = event.target;
          setReference(value);
          setReferenceError(value.length < 4);
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
        console.log(id)
        

        const updateInfor = async(e) => {
          e.preventDefault() ;
          
           
              axios.post(`http://localhost:5000/formations/addFormation/${id}`, {
                
                  title:title,
                 
                   description: description ,
                   price : price , 
                   categorie : categorie,
                   level : level  ,
                   ref:ref,
                   //free : free , 
                   //affiche , 
                   //videopromo
              }, {headers: {'X-Requested-With': 'XMLHttpRequest', 
              "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
              "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
             "withCredentials": true ,}
             ).then((response)=>{console.log(response.data.message)
              if(response.data.message==='Formation créée avec succès')
              {setSuccess('Formation créée avec succès')}
              if(response.data.message==='vérifiez les champs')
              {setErr('vérifiez les champs')}
              //navigate(`/maFormation/${titre1}`)
            }
         ).catch((err)=> {
              setErr('erreur')
              
          }) 
        }

        const handleUpdate = () => {
            updateInfor()
        }
        const isFormValid = () => {
          // add validation rules here
          return  title  !== ''  && description !== '' && price !== ''  && categorie !== '' && level !== '' 
          && ref !== '' && !titleError && !descriptionError && !priceError  && !refError  ;
        };
  return (
    <div className="publier">
        <h5>Page d'accueil du cours</h5>
        <Form >
            <Form.Group className="mb-3" >
                <Form.Label className="label">Titre du cours</Form.Label>
                  <Form.Control type="text" 
                  //defaultValue={titre1}
                  name="title"
                  placeholder='saisir le titre du cours'
                  style={{ width: '500px' }}
                  onChange={handleTitleChange}
                    isInvalid={titleError}                            
                    /><Form.Control.Feedback type="invalid">
              Title is required and at least 4 character
               </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3" >
              <Form.Label className="label">Description du cours</Form.Label>
                <Form.Control as="textarea" rows={5} 
                placeholder="Saisissez la description de votre cours." 
                name="description" 
                //onChange={handleChange}
                //defaultValue={formations.description}
                 
                onChange={handleDescriptionChange}
                    isInvalid={descriptionError}                            
                    /><Form.Control.Feedback type="invalid">
              description is required and at least 4 character
               </Form.Control.Feedback>
            </Form.Group>
              <Form.Group className="mb-3" >
              {loading && <Spinner animation="border" variant="secondary" />}
              <Form.Label className="label">Images du cours</Form.Label>
              <div className="content-affiche">
              <Form.Label htmlFor="file" > 
              {/*src={affiche ? affiche : formations.affiche}*/}
                <img  alt="" className="affiche-img" />
              <p> <PhotoSizeSelectActualIcon /> Séléctionnez une image </p>
              </Form.Label>
              </div>
            <Form.Control type="file" id="file"
                onChange={changeAffiche}
                style={{display:"none"}}
              />
              </Form.Group>
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
              <Form.Group className="mb-3" >
                <Form.Label className="label">Catégorie</Form.Label>
                <Form.Select 
                    required 
                    name="categorie"
                    onChange={handleCategorieChange}
                    placeholder="Saisissez " 
                    >
                    <option defaultValue="">--Séléctionner la catégorie--</option>
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
                    <option defaultValue="">--Séléctionner le niveau--</option>
                    <option value="Niveau Débutant">Niveau Débutant</option>
                    <option value="Niveau intermédiaire">Niveau intermédiaire</option>
                    <option value="Niveau Confirmé">Niveau Confirmé</option>
                    <option value="Tous les niveaux">Tous les niveaux</option>
            </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Reference</Form.Label>
                  <Form.Control type="text" 
                    placeholder="Saisissez la reference du formation." 
                    name="Reference"
                    //onChange={handleChange}
                    //defaultValue={formations.subTitle}
                     
                    onChange={handleReferenceChange}
                    isInvalid={refError}                            
                    /><Form.Control.Feedback type="invalid">
              Reference is required and at least 4 character
               </Form.Control.Feedback>
            </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Prix
              
              </Form.Label>
                <Form.Control type="number"
                placeholder="0,000 Dt"
                name="price"
               // defaultValue={formations.price}
               onChange={handlePriceChange}
                    isInvalid={priceError}                            
                    /><Form.Control.Feedback type="invalid">
              prix is required and at least 5Odt 
               </Form.Control.Feedback>
              </Form.Group>

          <div className="content-btn">
              {/*<Button className='btn-annnuler'>Annuler</Button>*/}
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

export default PublierCours