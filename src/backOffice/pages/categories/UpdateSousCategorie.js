import React ,{useState,  useEffect} from 'react'
import { Button , Form, Spinner } from 'react-bootstrap'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader';
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual';
import {fetchSousCategorie, dispatchGetSousCategorie} from '../../../redux/actions/sousCategorieAction'
import { useDispatch, useSelector } from 'react-redux';
import SnackbarSuccess from '../../components/Snackbar/SnackbarSuccess';
import SnackbarErr from '../../components/Snackbar/SnackbarErr';

    const souscategorieState = {
    title:'',
    keywords:'',
    description:'',
    err: '',
    success: ''
    }

function UpdateSousCategorie(props){
    const [data, setData] = useState(souscategorieState)
    const {title,keywords,description,err,success} = data
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const {id} = useParams();
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const souscategories3 = useSelector(state => state.sousCategorie)
    const [setCallback3] = useState(false)
    const dispatch3 = useDispatch()
    
    useEffect(() => {
        fetchSousCategorie(id).then(res =>{
            dispatch3(dispatchGetSousCategorie(res))
        })
    },[id, dispatch3, setCallback3])

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
                            headers: {'content-type': 'multipart/form-data'}
                        })
              
                        setLoading(false)
                        setImage(res.data.url)
                        setOpen(true);
                        
                    } catch (err) {
                        setImage({...data, err: err.response.data.msg , success: ''})
                        setOpen2(true);
                    }
    }

    const updateInfor = async() => {
                    try {
                        axios.patch(`/updateSousCategorie/${id}`, {
                        titre: title ? title : souscategories3.titre,
                        motCles: keywords ? keywords : souscategories3.motCles,
                        description: description ? description : souscategories3.description,

                        })
                        setData({...data, err: '' , success: "Success!"})
                        setOpen(true);
                    
                } catch (err) {
                        setData({...data, err: err.response.data.msg , success: ''})
                        setOpen2(true);
                    }
    }
        
    const handleUpdate = () => {
                    updateInfor()
    }

    return(
        <div className='add-admin'>
         <BreadcrumbHeader item="Liste des sous catégories" link="/categories" active="Modifier sous catégorie"/>
          <div className='content-admin'>
              <Form className='form-admin'>
                  <Form.Group className="mb-3" >
                  <Form.Label className="label">Titre du sous catégorie</Form.Label>
                      <Form.Control type="text" 
                      placeholder="Enter un titre" 
                      name="title"
                      required 
                      defaultValue={souscategories3.title}
                      onChange={handleChange} 
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                  <Form.Label className="label">Mot clés</Form.Label>
                      <Form.Control type="text" 
                      placeholder="mot clés" 
                      name="keywords"
                      required 
                      defaultValue={souscategories3.keywords}
                      onChange={handleChange} 
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" >
                {loading && <Spinner animation="border" variant="secondary" />}
                <Form.Label className="label">Images du catégorie</Form.Label>
                <div className="content-affiche">
                <Form.Label htmlFor="file" > 
                  <img src={image} alt="" className="affiche-img"></img>
                <p> <PhotoSizeSelectActualIcon /> Séléctionnez une image </p>
                </Form.Label>
                </div>
              <Form.Control type="file" id="file"
                  onChange={changeAffiche}
                  style={{display:"none"}}
                />
                </Form.Group>
                  <Form.Group className="mb-3" >
                  <Form.Label className="label">Description</Form.Label>
                      <Form.Control type="text" 
                      placeholder="Enter description" 
                      name="description"
                      required 
                      defaultValue={souscategories3.description}
                      onChange={handleChange} 
                      />
                  </Form.Group>
              <div className="content-btn">
                <Button className='btn-annnuler'>Annuler</Button>
                <Button  className='btn-confirme'  onClick={handleUpdate}>Modifier catégorie</Button>
              </div>
              </Form>
          <SnackbarSuccess success={success} open={open}/>
          <SnackbarErr err={err} open2={open2}/>
      </div>
        </div>
    )
}

export default UpdateSousCategorie