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
import SnackbarSuccess from '../../components/Snackbar/SnackbarSuccess'
import SnackbarErr from '../../components/Snackbar/SnackbarErr'

const initialState = {
  title:'',
  subTitle:'',
  description:'',
  affiche:'',
  videopromo:'',
  price:'',
  categorie:'',
  level:'',
  err: '',
  success: ''
}

function PublierCours() {
    const token = useSelector(state => state.token)
    const [data, setData] = useState(initialState)
    const {subTitle,description,price,categorie,level, err, success} = data
    const {titre1} = useParams();
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
        
        useEffect(() => {
          fetchFormation(token,titre1).then(res =>{
                dispatch(dispatchGetFormation(res))
            })
          },[token,titre1, dispatch, callback])

        const handleChange = e => {
            const {name, value} = e.target
            setData({...data, [name]:value, err:'', success: ''})
        }

        const changeAffiche = async(e) => {
          e.preventDefault()
          try {
              const file = e.target.files[0]
    
              if(!file) return setData({...data, err: "No files were uploaded." , success: ''})
    
              if(file.size > 1024 * 1024)
                  return setData({...data, err: "Size too large." , success: ''})
    
              if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                  return setData({...data, err: "File format is incorrect." , success: ''})
    
              let formData =  new FormData()
              formData.append('file', file)
    
              setLoading(true)
              const res = await axios.post('/api/uploadAffiche', formData, {
                  headers: {'content-type': 'multipart/form-data', Authorization: token}
              })
    
              setLoading(false)
              setAffiche(res.data.url)
              
          } catch (err) {
              setAffiche({...data, err: err.response.data.msg , success: ''})
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
              setVideopromo({...data, err: err.response.data.msg , success: ''})
              setOpen2(true)
          }
        }

        const updateInfor = async() => {
          try {
            if(data.titre !== titre1){
              axios.patch(`/updateFormation/${titre1}`, {
                subTitle: subTitle ? subTitle : formations.subTitle,
                 description: description ? description : formations.description,
                   price : price ? price : formations.price, 
                   categorie : categorie ? categorie : formations.categorie,
                   level : level ? level : formations.level ,
                   free : free ? free : formations.free, 
                   affiche , videopromo
              }, { headers: {Authorization: token} })
              setData({...data, err: '' , success: "Formation sauvegardée!"})
              setOpen(true)
              navigate(`/maFormation/${titre1}`)
            }
         } catch (err) {
              setData({...data, err: err.response.data.msg , success: ''})
              setOpen2(true)
          }
        }

        const handleUpdate = () => {
            updateInfor()
        }

  return (
    <div className="publier">
        <h5>Page d'accueil du cours</h5>
        <Form >
            <Form.Group className="mb-3" >
                <Form.Label className="label">Titre du cours</Form.Label>
                  <Form.Control type="text" 
                  defaultValue={titre1}
                  name="title"
                  disabled
                  style={{ width: '500px' }}
                  />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label className="label">Sous-titre du cours</Form.Label>
                  <Form.Control type="text" 
                    placeholder="Saisissez le sous-titre de votre cours." 
                    name="subTitle"
                    onChange={handleChange}
                    defaultValue={formations.subTitle}
                    required 
                  />
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label className="label">Description du cours</Form.Label>
                <Form.Control as="textarea" rows={5} 
                placeholder="Saisissez la description de votre cours." 
                name="description" 
                onChange={handleChange}
                defaultValue={formations.description}
                required 
              />
            </Form.Group>
              <Form.Group className="mb-3" >
              {loading && <Spinner animation="border" variant="secondary" />}
              <Form.Label className="label">Images du cours</Form.Label>
              <div className="content-affiche">
              <Form.Label htmlFor="file" > 
                <img src={affiche ? affiche : formations.affiche} alt="" className="affiche-img" />
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
                  <ReactPlayer url={[{src: videopromo ? videopromo : formations.videopromo}]}
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
                    onChange={handleChange}
                    placeholder="Saisissez " 
                    >
                    <option defaultValue="--Séléctionner la catégorie--">--Séléctionner la catégorie--</option>
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
                    onChange={handleChange}
                    >
                    <option defaultValue="--Séléctionner le niveau--">--Séléctionner le niveau--</option>
                    <option value="Niveau Débutant">Niveau Débutant</option>
                    <option value="Niveau intermédiaire">Niveau intermédiaire</option>
                    <option value="Niveau Confirmé">Niveau Confirmé</option>
                    <option value="Tous les niveaux">Tous les niveaux</option>
            </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Prix
                <Form.Check 
                type="switch"
                id="custom-switch"
                label="gratuit"
                defaultValue={formations.free}
                onChange={(e) => setFree(e.target.checked)}
              />
              </Form.Label>
                <Form.Control type="number"
                placeholder="0,000 Dt"
                name="price"
                defaultValue={formations.price}
                onChange={handleChange}
                />
              </Form.Group>
          <div className="content-btn">
              <Button className='btn-annnuler'>Annuler</Button>
              <Button  className='btn-confirme' disabled={loading} onClick={handleUpdate}>Confirmer</Button>
          </div>
        </Form>
        <SnackbarSuccess success={success} open={open}/>
        <SnackbarErr err={err} open2={open2}/>
    </div>
  )
}

export default PublierCours