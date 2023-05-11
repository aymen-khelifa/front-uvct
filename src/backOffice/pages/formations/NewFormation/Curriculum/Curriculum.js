import React ,{useState, useEffect} from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';import Box from '@mui/material/Box';
import {Snackbar,Alert} from "@mui/material";

import IconButton from '@material-ui/core/IconButton';
import {getsectionbyid} from '../../../../../redux/features/sectionbyid';import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import TextField from '@mui/material/TextField';

import {fetchSections, dispatchSections} from '../../../../../redux/actions/sectionAction'
import {ShowSuccessMsg, ShowErrMsg} from '../../../../../components/utils/notifications/Nofification'
import { Collapse } from 'antd';
import { Button , Form } from 'react-bootstrap'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom';
import PostAddIcon from '@material-ui/icons/PostAdd';
import '../../Formation.css'
import Questionnaire from './Questionnaire';import { Modal} from 'antd';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';import { ExclamationCircleOutlined } from '@ant-design/icons';

import EditIcon from '@material-ui/icons/Edit';
import getsession from '../../../../../redux/features/sessionSlice'
const { Panel } = Collapse;

function callback1(key) {
  console.log(key);
}

const initialState = {
  titre:'',
  formation:'',
  description:'',
  err: '',
  success: ''
}

export default function Curriculum() {
  
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(true);
  const [showFile, setShowFile] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showQuest, setShowQuest] = useState(false);
  const [checked, setChecked] = React.useState([0]);
 // const [section, setSection] = useState([])
  //const {formation,description,titre} = section
  const token = useSelector(state => state.token)
  const formations = useSelector(state => state.formations)
  const sections = useSelector(state => state.sectionbyid.sections)
  //const sessions = useSelector(state => state.session.sessions)

  const [callback, setCallback] = useState(false)
  const [callback2, setCallback2] = useState(false)
  const [Title, setTitle] = useState("");const [Title1, setTitle1] = useState("");
  const [texte, setTexte] = useState("");
  const [titlesec, setTitlesec] = useState("");
  const [err , setErr] = useState("");
  const [success , setSuccess] = useState("");
  const [titleses, setTitleses] = useState("");
  const [objectif, setObjectif] = useState("");
  const [titleError, setTitlelError] = useState(false);
  const [objectifError, setObjectifError] = useState(false);
  const dispatch = useDispatch()
  const dispatch2 = useDispatch()
  const {id} = useParams();const { confirm } = Modal;

  //var id = formations._id

       /* useEffect(() => {
         
                dispatch(getformation(id))
            
          },[dispatch])*/
          
          useEffect(() => {
          
                  dispatch(getsectionbyid(id))
              
          },[dispatch])
console.log(sections)
         
       /*   useEffect(() => {
          
            dispatch2(getsession(sections.uuid))
        
    },[dispatch2])

   useEffect(() => {
    
        const data =  dispatch(getsession(id));
        setSection(data);
      });*/
      const handleObjectifChange = (event) => {
        const { value } = event.target;
        setObjectif(value);
       // setObjectifError(value.length < 8);
      };
      const handleTitleChange = (event) => {
        const { value } = event.target;
        setTitle(value);
       // setTitlelError(value.length < 8);
      };const handleTitle1Change = (event) => {
        const { value } = event.target;
        setTitle1(value);
       // setTitlelError(value.length < 8);
      };
      const handleTitlesesChange = (event) => {
        const { value } = event.target;
        setTitleses(value);
       // setTitlelError(value.length < 8);
      };
      const handleTexteChange = (event) => {
        const { value } = event.target;
        setTexte(value);
       // setObjectifError(value.length < 8);
      };const handleTitlesecChange = (event) => {
        const { value } = event.target;
        setTitlesec(value);
       // setTitlelError(value.length < 8);
      };
      
      const handleSubmit = async (e,) => {
        e.preventDefault()
        try {
          
            const res = await axios.post(`http://localhost:5000/sections/addsection/${id}`,
            {title:Title,
              objectif:objectif,
               }, {headers: {'X-Requested-With': 'XMLHttpRequest', 
               "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
               "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
              "withCredentials": true 
          });
          if (res.data.message==='section créé avec succès')
          {setSuccess('section créé avec succès')}
          
          if (res.data.message===' existe déjà')
          {setErr(' existe déjà');}
          if (res.data.message==='Une erreur est survenue lors de la création de section')
          {setErr('Une erreur est survenue lors de la création de section');}
          
          else{setErr("erreur");}

       } catch (err) { 
        setErr("erreur");
        }
      }
      const handleSubmit1 = async (e) => {
        e.preventDefault()
        try {
          
            const res = await axios.post('http://localhost:5000/sessions/addSession',
            {texte:texte,
              titleses:titleses,titlesec:titlesec
              
               }, {headers: {'X-Requested-With': 'XMLHttpRequest', 
               "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
               "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
              "withCredentials": true 
             
          })
          if (res.data.message==='session créé avec succès')
          {setSuccess('session créé avec succès')}
          
          if (res.data.message==='Une erreur est survenue lors de la création de section')
          {setErr('Une erreur est survenue lors de la création de section');}
          if (res.data.message==='chapitre non trouvé')
          {setErr('chapitre non trouvé');}
          if (res.data.message===' existe déjà')
          {setErr('existe déjà');}
          else{setErr("erreur");}

       } catch (err) { 
        setErr("erreur");
        }
      }
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    };
    const handleDeleteses = async (title) => {
          
             
      await axios.get(`http://localhost:5000/formations/supprformation/${title}`, {
          //headers: {Authorization: token}
          headers: {'X-Requested-With': 'XMLHttpRequest', 
          "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
          "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
         "withCredentials": true 
        }).then((response)=>{
          if(response.data.message==='formation supprimé !')
          {setSuccess('formation supprimé !')}
          if(response.data.message==='suppression echouée')
          {setErr('suppression echouée')}
          }
).catch( (err)=> {
setErr('erreur')
  
})
}
const handleUpdateses = async (title) => {
          
             
  await axios.get(`http://localhost:5000/formations/supprformation/${title}`, {
      //headers: {Authorization: token}
      headers: {'X-Requested-With': 'XMLHttpRequest', 
      "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
      "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
     "withCredentials": true 
    }).then((response)=>{
      if(response.data.message==='formation supprimé !')
      {setSuccess('formation supprimé !')}
      if(response.data.message==='suppression echouée')
      {setErr('suppression echouée')}
      }
).catch( (err)=> {
setErr('erreur')

})
}
const handleDeletesec = async (title) => {
          
             
          await axios.get(`http://localhost:5000/sections/supprimersection/${title}`, {
             //headers: {Authorization: token}
             headers: {'X-Requested-With': 'XMLHttpRequest', 
                 "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
              "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
             "withCredentials": true 
                }).then((response)=>{
                if(response.data.message==='chapitre supprimé !')
                 {setSuccess('chapitre supprimé !')}
                  if(response.data.message==='suppression echouée')
                  {setErr('suppression echouée')}
                 }
                   ).catch( (err)=> {
                     setErr('erreur')

                 })
}
const handleUpdatesec = async (title) => { 
  console.log(title);
  
      
          await axios.patch(`http://localhost:5000/sections/modifier/${title}`,{title:Title}, {
              //headers: {Authorization: token}
              headers: {'X-Requested-With': 'XMLHttpRequest', 
             "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
             "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
                  "withCredentials": true 
                   }).then((response)=>{
                 if(response.data.message==='section modifié !')
               {setSuccess('section modifié !')}
               if(response.data.message==='modification echouée')
                  {setErr('modification echouée')}
                    }
                ).catch( (err)=> {
               setErr('erreur')

              })
}
    function showDeletesecConfirm(tit) {
      confirm({
        title: 'Êtes-vous sûr de vouloir supprimer ce chapitre ?',
        icon: <ExclamationCircleOutlined />,
        okText: 'Supprimer',
        okType: 'danger',
        cancelText: 'Annuler',
         
        onOk() {
          handleDeletesec(tit)
        },
        onCancel() {
          console.log('Cancel');
        },
      });}
      /*function showUpdatesecConfirm(tit) {
        confirm({
          title: 'Êtes-vous sûr de vouloir modifer ce chapitre ?',
         
          okText: 'Modifier',
          okType: 'primary',
          cancelText: 'Annuler',
          content: (
            <Box component="form"    sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required placeholder={tit}
              onChange={handleTitleChange} 
            />
            <Button onClick={() => handleUpdatesec(tit)} >ok</Button>
            
            </Box>
            
               
          ),
           
          
          onCancel() {
            console.log('Cancel');
          },
        });}*/

        function showDeletesesConfirm(tit) {
          confirm({
            title: 'Êtes-vous sûr de vouloir supprimer ce chapitre ?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Supprimer',
            okType: 'danger',
            cancelText: 'Annuler',
             
            onOk() {
              handleDeleteses(tit)
            },
            onCancel() {
              console.log('Cancel');
            },
          });}
       /*   function showUpdatesesConfirm(tit) {
            confirm({
              title: 'Êtes-vous sûr de vouloir supprimer ce chapitre ?',
              icon: <ExclamationCircleOutlined />,
              okText: 'Supprimer',
              okType: 'danger',
              cancelText: 'Annuler',
               
              onOk() {
                handleUpdateses(tit)
              },
              onCancel() {
                console.log('Cancel');
              },
            });}*/
    const genExtra = (title) => (
       <DeleteOutlineIcon className='icon-action'
         onClick={() => showDeletesecConfirm(title)}
      />);
      
    /* const genExtra1 = (title) => (
      <BorderColorIcon className='icon-action'
      onClick={() => showUpdatesecConfirm(title)}
     />
    
    );*/
    const genExtra2 = (title) => (
      <DeleteOutlineIcon className='icon-action'
       onClick={() => showDeletesesConfirm(title)}
      />
    );
   /* const genExtra3 = (title) => (
      <BorderColorIcon className='icon-action'
     onClick={() => showUpdatesesConfirm(title)}
    />
    );*/


    return(
      <div className="coupon">
      {
        show2 ?
       (<>
        <Button className='btn-event'  onClick={() => setShow(!show)}>Nouveau chapitre</Button>
      {
          sections?.map(section => 
          (
           

          <div className='content-chapitre'>
              <Collapse  onChange={callback1}> 
                <Panel header={section?.title}  extra={[genExtra(section?.title)
                //,genExtra1(section.title)
                ]}>
                  <List>
                    {/*section?.sessions?.map(session => */}
                    {section?.sessions?.map(session => //titlede session
                        (<div className='content-chapitre'>
              <Collapse  onChange={callback1}>
              {/*console.log('aaa');console.log('aaa');*/}
                <Panel header={session?.title }  extra={[genExtra2(session?.title) //,genExtra3(session.title)
                ]}>
                  <List>
 
 
                     <ListItemSecondaryAction>
                      <DeleteOutlineIcon className='icon-action'
       // onClick={showDeleteConfirm}
      />
                      </ListItemSecondaryAction>
                   
                     
                  </List>
                </Panel>
            </Collapse>
          </div> ))
                         }
                     
                  </List>
                  <Button className='btn-add-lecon' onClick={() => setShow2(!show2)}>
                       <AddCircleOutlineIcon /> Ajouter une nouvelle leçon
                      </Button>
                </Panel>
            </Collapse>
          </div> 
          
        ))
      }
        {
          !show &&
          (
          <div className='content-chapitre'>
                <Form >
                
                <Form.Group className="mb-3" >
                  <Form.Label className="label">Titre du chapitre</Form.Label>
                    <Form.Control type="text" 
                      placeholder="Enter un titre" 
                      name="titre"
                      value={Title}
                      onChange={handleTitleChange} 
                      required 
                    />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label className="label">Qu'est-ce que les participants seront capables de faire à la fin de cette section ?</Form.Label>
                    <Form.Control type="text" 
                      placeholder="Saisir un objectif d'apprentissage" 
                      name="description"
                      value={objectif}
                      onChange={handleObjectifChange} 
                      required 
                    />
                </Form.Group>
                <div className="content-btn">
                  <Button className='btn-annnuler'  type="annuler" onClick={() => setShow(!show)}>Annuler</Button>
                  <Button  className='btn-confirme'  type="submit" onClick={handleSubmit}>Sauvgarder</Button>
                </div>
              </Form>
          </div>
          )
        } 
       </>

       )
        :
        (
          <>
            <div className="btn-group">
             <Button className="btn-lecon" onClick={() => setShowFile(!showFile)}>Ajouter le fichier </Button>
             <Button className="btn-lecon" onClick={() => setShowText(!showText)}>Ajouter du text </Button>
             <Button className="btn-lecon" onClick={() => setShowQuest(!showQuest)}>Ajouter un questionnaire </Button>
            </div>
            {
              (showFile) &&
                (<div className="content-lecon">
                <h5>Téléchargeur de fichiers</h5>
                <p>Utilisez le téléchargeur de fichiers pour télécharger des fichiers vidéo, audio, PDF ou tout autre fichier dans votre cours.</p>
               <Form>
               <Form.Group className="mb-3" >
              <div className="content-affiche">
              <Form.Label htmlFor="file" > 
                <img src="" alt="" className="affiche-img"></img>
                <PostAddIcon />  <p>Déposez ici des fichiers vidéo, audio, PDF ou d'autres fichiers ou cliquez pour choisir des fichiers</p>
              </Form.Label>
              </div>
            <Form.Control type="file" id="file"
                style={{display:"none"}}
          />
              </Form.Group>
              <div className="content-btn">
              <Button className='btn-annnuler' onClick={() => setShowFile(false)}>Annuler</Button>
              <Button  className='btn-confirme' >Sauvegarder</Button>
          </div>
               </Form>
                </div>
                )
            }
            {
              showText &&
                (<div className="content-lecon">
                <h5>titre de chapitre dans lequelle ajouté  </h5>
                
               <Form>
               <Form.Group className="mb-3" >
                <Form.Control type="text" 
                placeholder="saisir titre de chapitre " 
                required  onChange={handleTitlesecChange} 
              /></Form.Group>
                <h5>titre de leçon</h5>
                
               
               <Form.Group className="mb-3" >
                <Form.Control type="text" 
                placeholder="saisir titre de leçon " 
                required  onChange={handleTitlesesChange} 
              /></Form.Group>
              <h5>Texte</h5>
               <Form.Group className="mb-3" >
                <Form.Control as="textarea" rows={5} 
                placeholder="Ecrire ici..." 
                required  onChange={handleTexteChange} 
              />
            </Form.Group>
              <div className="content-btn">
              <Button className='btn-annnuler' onClick={() => setShowText(false)}>Annuler</Button>
              <Button  className='btn-confirme' onClick={handleSubmit1} >Sauvegarder</Button>
          </div>
               </Form>
                </div>
                )
            }
            {
              showQuest &&
                (<div className="content-lecon">
                <h5>Questionnaire</h5>
                <p>Utilisez le créateur de quiz pour créer un quiz à choix multiples. Vous ne pouvez avoir qu'un quiz par session.</p>
               <Form>
               <Questionnaire />
              <div className="content-btn">
              <Button className='btn-annnuler' onClick={() => setShowQuest(false)}>Annuler</Button>
              <Button  className='btn-confirme' >Sauvegarder</Button>
          </div>
               </Form>
                </div>
                )
            }
            
          </>
        )
      }
       
    <div >
  </div>
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
 )}