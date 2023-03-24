import React ,{useState} from 'react'
import { Accordion, Button , Form} from 'react-bootstrap'
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import '../AddFormation.css'
import UpdateSession from './UpdateSession';
import { Modal} from 'antd';
import axios from 'axios'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {useSelector} from 'react-redux'
const { confirm } = Modal;

const sessionState = {
  title:'',
  description:'',
  article:'',
  err: '',
  success: ''
  }

      function AddDescription(props){
        const [session, setSession] = useState(sessionState)
        const {description} = session
        const token = useSelector(state => state.token)

        const handleChange = e => {
          const {name, value} = e.target
          setSession({...session, [name]:value, err:'', success: ''})
      }

    const updateInfor = async() => {
      try {
          axios.patch(`/updateSession/${props.id}`, {
            description: description ? description : session.description,
          }, { headers: {Authorization: token} })
          setSession({...session, err: '' , success: "Success!"})
        
     } catch (err) {
          setSession({...session, err: err.response.data.msg , success: ''})
      }
    }

    const handleUpdate = () => {
        updateInfor()
    }
        return(
          <div>
                  <Form >
                      <Form.Group className="mb-3" >
                      <Form.Label className="label">Description de la session</Form.Label>
                          <Form.Control type="text" 
                          placeholder="Ajouter une description.Mentionnez ce que les participants seront capables de faire une fois la session" 
                          name="description"
                          required 
                          defaultValue={props.description}
                          onChange={handleChange} 
                          />
                      </Form.Group>
                  <div className="content-btn">
                    <Button className='btn-annnuler'>Annuler</Button>
                    <Button  className='btn-confirme'   onClick={handleUpdate}>Sauvegarder</Button>
                  </div>
                </Form>
          </div>
        )
      }
  
      function AddVideo(props){
        const token = useSelector(state => state.token)
        const [session, setSession] = useState(sessionState);
        const [video, setVideo] = useState(false);
        const [loading, setLoading] = useState(false);
        
        const changeVideo = async(e) => {
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
              setVideo(res.data.url)
              
          } catch (err) {
              setVideo({...session, err: err.response.data.msg , success: ''})
          }
        }

        const updateInfor = async() => {
          try {
              axios.patch(`/updateSession/${props.id}`, {
                 video
              }, { headers: {Authorization: token} })
              setSession({...session, err: '' , success: "Success!"})
            
         } catch (err) {
              setSession({...session, err: err.response.data.msg , success: ''})
          }
        }

        const handleUpdate = () => {
            updateInfor()
        }

        return(
          <div>
                  <Form >
                      <Form.Group className="mb-3" >
                      <Form.Label className="label">Télécharger vidéo :</Form.Label>
                          <Form.Control type="file" 
                          onChange={changeVideo}
                          />
                      </Form.Group>
                  <div className="content-btn">
                    <Button className='btn-annnuler'>Annuler</Button>
                    <Button  className='btn-confirme'  onClick={handleUpdate}>Sauvegarder</Button>
                  </div>
                </Form>
                  </div>
        )
      }
  
      function AddMulti(props){
        const token = useSelector(state => state.token)
        const [session, setSession] = useState(sessionState);
        const [video, setVideo] = useState(false);
        const [file, setFile] = useState(false);
        const [loading, setLoading] = useState(false);

        const changeVideo = async(e) => {
          e.preventDefault()
          try {
              const file = e.target.files[0]
    
              if(!file) return setSession({...session, err: "No files were uploaded." , success: ''})
    
              if(file.size > 1024 * 1024)
                  return setSession({...session, err: "Size too large." , success: ''})
    
              if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                  return setSession({...session, err: "File format is incorrect." , success: ''})
    
              let formData =  new FormData()
              formData.append('file', file)
    
              setLoading(true)
              const res = await axios.post('/api/uploadAffiche', formData, {
                  headers: {'content-type': 'multipart/form-data', Authorization: token}
              })
    
              setLoading(false)
              setVideo(res.data.url)
              
          } catch (err) {
              setVideo({...session, err: err.response.data.msg , success: ''})
          }
        }

        const changeFile = async(e) => {
          e.preventDefault()
          try {
              const file = e.target.files[0]
    
              if(!file) return setSession({...session, err: "No files were uploaded." , success: ''})
    
              if(file.size > 1024 * 1024)
                  return setSession({...session, err: "Size too large." , success: ''})
              if(file.type !== 'application/pdf')
                  return setSession({...session, err: "File format is incorrect." , success: ''})
    
              let formData =  new FormData()
              formData.append('file', file)
    
              setLoading(true)
              const res = await axios.post('/api/uploadFile', formData, {
                  headers: {'content-type': 'multipart/form-data', Authorization: token}
              })
    
              setLoading(false)
              setFile(res.data.url)
              
          } catch (err) {
              setFile({...session, err: err.response.data.msg , success: ''})
          }
        }

        const updateInfor = async() => {
          try {
              axios.patch(`/updateSession/${props.id}`, {
                 video, file
              }, { headers: {Authorization: token} })
              setSession({...session, err: '' , success: "Success!"})
            
         } catch (err) {
              setSession({...session, err: err.response.data.msg , success: ''})
          }
        }

        const handleUpdate = () => {
            updateInfor()
        }
        return(
          <div>
                  <Form >
                      <Form.Group className="mb-3" >
                      <Form.Label className="label">Choisissez une vidéo :</Form.Label>
                          <Form.Control type="file" 
                          onChange={changeVideo}
                          />
                      </Form.Group>
                      <Form.Group className="mb-3" >
                      <Form.Label className="label">Choisissez une présentation :</Form.Label>
                          <Form.Control type="file"
                          onChange={changeFile} 
                          />
                      </Form.Group>
                  <div className="content-btn">
                    <Button className='btn-annnuler'>Annuler</Button>
                    <Button  className='btn-confirme'  onClick={handleUpdate}>Sauvegarder</Button>
                  </div>
                </Form>
                  </div>
        )
      }
  
      function AddArticle(props){
        const token = useSelector(state => state.token)
        const [session, setSession] = useState(sessionState);
        const {article} = session

        const handleChangeInput = e => {
          const {name, value} = e.target
          setSession({...session, [name]:value, err: '', success: ''})
        }

        const updateInfor = async() => {
          try {
              axios.patch(`/updateSession/${props.id}`, {
                 article
              }, { headers: {Authorization: token} })
              setSession({...session, err: '' , success: "Success!"})
            
         } catch (err) {
              setSession({...session, err: err.response.data.msg , success: ''})
          }
        }

        const handleUpdate = () => {
            updateInfor()
        }
        return(
          <div>
                  <Form >
                      <Form.Group className="mb-3" >
                      <Form.Label className="label">Texte</Form.Label>
                          <Form.Control type="text" as="textarea" rows={5} 
                            placeholder="Ecrire text..." 
                            onChange={handleChangeInput}
                            name="article"
                            required 
                          />
                      </Form.Group>
                  <div className="content-btn">
                    <Button className='btn-annnuler'>Annuler</Button>
                    <Button  className='btn-confirme'   onClick={handleUpdate}>Sauvegarder</Button>
                  </div>
                </Form>
          </div>
        )
      }
  
      function AddContenu(props){
        const [video, setVideo] = useState(false)
        const [article, setArticle] = useState(false)
        const [multi, setMulti] = useState(false)
  
        return(
          <div>
        <h5>Sélectionner le type de contenu</h5>
        <p>Sélectionner le type principal de contenu. Des fichiers et des liens peuvent
        <br /> être ajoutés en tant que ressources.</p>
        {
          (!video && !multi && !article) &&
          (
            <div className='content-type'>
              <div className='type-content' onClick={ () => setVideo(!video)}>
                <PlayCircleOutlineIcon /><p>Vidéo</p>
              </div>
              <div className='type-content' onClick={ () => setMulti(!multi)}>
                <p>Support:<br /> Vidéo et <br />diapositives</p>
              </div>
              <div className='type-content' onClick={ () => setArticle(!article)}>
                <DescriptionIcon /><p>Article</p>
              </div>
            </div>
          )
        }
        
        {
          video && 
          (<div className='content-chapitre'>
                    <CloseIcon onClick={ () => setVideo(!video)} className="icon-add"/>
                      <AddVideo id={props.id}/>
                  </div>
                    )
        }
        {
          multi && 
          (<div className='content-chapitre'>
                    <CloseIcon onClick={ () => setMulti(!multi)} className="icon-add"/>
                      <AddMulti id={props.id}/>
                  </div>
                    )
        }
        {
          article && 
          (<div className='content-chapitre'>
                    <CloseIcon onClick={ () => setArticle(!article)} className="icon-add"/>
                      <AddArticle id={props.id}/>
                  </div>
                    )
        }
          </div>
        )
      }

function Session(props) {
    const [description, setDescription] = useState(false)
    const [contenu, setContenu] = useState(false)
    const [edit1, setEdit1] = useState(false)
    const [modifier, setModifier] = useState(false)
    const token = useSelector(state => state.token)
    const [session, setSession] = useState(sessionState)
    const [callback, setCallback] = useState(false)


    const handleDelete = async () => {
      try {
                  await axios.delete(`/deleteSession/${props.id}`, {
                      headers: {Authorization: token}
                  })
                  setCallback(!callback)
        }   catch (err) {
          setSession({...session, err: err.response.data.msg , success: ''})
      }
      } 

      function showDeleteConfirm() {
        confirm({
          title: 'Êtes-vous sûr de vouloir supprimer cette session?',
          icon: <ExclamationCircleOutlined />,
          okText: 'Supprimer',
          okType: 'danger',
          cancelText: 'Annuler',
          closable:true,
          onOk() {
            handleDelete()
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

  return (
    <div>
    {
                      modifier ? (
                      <div className='content-section'>
                        <CloseIcon onClick={() => setModifier(!modifier)} className="icon-add"/>
                          <UpdateSession  id={props.id} titre={props.title}/>
                      </div>
                      )  :
                      (
            <Accordion>
             <Accordion.Item eventKey={props.num-1}>
                <Accordion.Header>
                <div  onMouseEnter={() => setEdit1(true)}  onMouseLeave={() => setEdit1(false)}>
                    <div>
                    <CheckCircleIcon />{props.titre} :{
                            edit1 && (
                                <>
                                <EditIcon className="icon-prog" onClick={() => setModifier(true)}/> 
                                <DeleteOutlineIcon className="icon-prog" onClick={showDeleteConfirm}/>
                                </>
                            )
                        }
                        </div>
                </div>
                </Accordion.Header>
                <Accordion.Body>
                { (!description && !contenu) && (
                        <>
                          <Button className='btn-annnuler' onClick={ () => setDescription(!description)}>
                          <AddIcon />Description</Button>
                        <Button className='btn-annnuler' onClick={() => setContenu(!contenu)}>
                        <AddIcon />Contenu</Button>
                        </>
                        )
                        }
                        { description && 
                        (<div className='content-chapitre'>
                        <CloseIcon onClick={ () => setDescription(!description)} className="icon-add"/>
                            <AddDescription id={props.id}/>
                        </div>
                        )}
                        {
                        contenu && (<div className='content-chapitre'>
                        <CloseIcon onClick={ () => setContenu(!contenu)} className="icon-add"/>
                            <AddContenu id={props.id}/>
                        </div>
                        )
                        }
                        <div className='content-chapitre'>
                        {props.description}
                        </div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
                      )
                  }
        
    </div>
  )
}

export default Session