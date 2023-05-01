import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {fetchFormation, dispatchGetFormation} from '../../../redux/actions/formationsAction'
import './AddFormation.css'
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom'
import { Snackbar, Alert} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const initialState = {
    objectif:'',
    prerequis:'',
    intendedFor:'',
    err: '',
    success: ''
  }
  
function PlanifierCours() {
    const token = useSelector(state => state.token)
    const [data, setData] = useState(initialState)
    //const {objectif,prerequis,intendedFor, err, success} = data
    const {titre1} = useParams();
    const navigate = useNavigate();

    const formations = useSelector(state => state.formations)
    const [callback] = useState(false)
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [objectif, setObjectif] = useState("");
    const [objectifError, setObjectifError] = useState(false);
    const [prerequis, setPrerequis] = useState("");
    const [prerequisError, setPrerequisError] = useState(false);
    const [intendedFor, setIntendedFor] = useState("");
    const [intendedForError, setIntendedForError] = useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
   
    const [title, setTitle] = useState("");
    const [titleError, setTitleError] = useState(false);


    const handleObjectifChange = (event) => {
      const { value } = event.target;
      setObjectif(value);
      setObjectifError(value.length < 4);
    };
    const handlePrerequisChange = (event) => {
      const { value } = event.target;
      setPrerequis(value);
      setPrerequisError(value.length < 4);
    };
    const handleIntendedForChange = (event) => {
      const { value } = event.target;
      setIntendedFor(value);
      setIntendedForError(value.length < 3);
    };
    const isFormValid = () => {
      // add validation rules here
      return  objectif !== ''   && intendedFor !== '' && prerequis !== '' 
      && title !== '' && !objectifError && !titleError && !intendedForError && !prerequisError ;
    };

       
       

        const updateInfor = async(e) => {
          e.preventDefault() ;
              
                axios.patch(`http://localhost:5000/formations/objectifFormation/${title}`, {
                     objectif: objectif,
                     prerequis : prerequis , 
                     intendedFor : intendedFor ,
                     
                }, {headers: {'X-Requested-With': 'XMLHttpRequest', 
                "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS",
                //Authorization: token
              }, 
               "withCredentials": true , }
               ).then((response)=>{console.log(response.data.msg)
                if(response.data.message==='ajoutée avec succès')
                {setSuccess('ajoutée avec succès')}
                if(response.data.message==='vérifiez les champs')
                {setErr('vérifiez les champs');}


                //setData({...data, err: '' , success: "Success!"})
              //  setOpen(true);
              navigate(`/maFormation/${response.data.msg}`)
              }
           ).catch( (err) =>{
              
                setErr('erreur')
            })
          }
  
        const handleUpdate = () => {
              updateInfor() 
        }
       
        const handleTitleChange = (event) => {
          const { value } = event.target;
          setTitle(value);
          setTitleError(value.length < 4);
        };
  return (
    <div className='content'>
      <>
      <Form.Group className="mb-3" >
                <Form.Label className="label">Titre du cours relié a ce formulaire </Form.Label>
                  <Form.Control type="text" 
                  //defaultValue={titre1}
                  name="title"
                  placeholder='saisir le titre du cours à ajouté'
                  style={{ width: '500px' }}
                  onChange={handleTitleChange}
                    isInvalid={titleError}                            
                    /><Form.Control.Feedback type="invalid">
              Title is required and at least 4 character
               </Form.Control.Feedback>
            </Form.Group>
        <h3>Participants cibles</h3>
        <span className='paragraphe'>
            Les descriptions suivantes seront publiquement visibles sur la page d'accueil de votre cours <br /> et auront une incidence directe sur les performances de votre cours. <br />
            Ces descriptions aideront les participants à décider si votre cours leur convient.
        </span>
        <h5>Que vont apprendre les participants inscrits à votre cours ?</h5>
        <span className='paragraphe'>
            Vous devez saisir au moins 3 objectifs ou résultats d'apprentissage que les participants <br />sont censés atteindre après avoir suivi votre cours.
        </span>
      </>
      <Form className='publier-content'>
     
         <Form.Group className="mb-3" >
            <Form.Control type="text" 
              name="objectif"
              placeholder="Exemple : Définir les roles et les responsabilités d'un chef de projet" 
              style={{ width: '80%' }}
              onChange={handleObjectifChange}
                    isInvalid={objectifError}                            
                    /><Form.Control.Feedback type="invalid">
              objectif est obligatoire 
               </Form.Control.Feedback>
          </Form.Group>
          <>
            <h5>Quels sont les prérequis du cours ?</h5>
            <span className='paragraphe'>Dressez la liste des compétences, de l'expérience, des outils ou de l'équipement <br /> 
            que les participants doivent posséder pour suivre votre cours.<br />
            S'il n'y a pas de prérequis, profitez-en pour simplifier la tâche des débutants.</span>
          </>
          <Form.Group className="mb-3" >
            <Form.Control type="text" 
              name="prerequis"
              placeholder="Exemple : Aucune expérience en programmation requise." 
              style={{ width: '80%' }}
              onChange={handlePrerequisChange}
                    isInvalid={prerequisError}                            
                    /><Form.Control.Feedback type="invalid">
              prerequis est obligatoire est au  moins contient 4 character
               </Form.Control.Feedback>
          </Form.Group>
          <>
            <h5>À qui ce cours s'adresse-t-il ?</h5>
            <span className='paragraphe'>
            Rédigez une courte description des participants cibles que le contenu de votre cours peut intéresser.<br />
            Cela vous aidera à attirer les bons participants.
            </span>
          </>
          <Form.Group className="mb-3" >
            <Form.Control type="text" 
              name="intendedFor"
              placeholder="Exemple : développeurs Python débutants intéressés par la science des données" 
              style={{ width: '80%' }}
              onChange={handleIntendedForChange}
                    isInvalid={intendedForError}                            
                    /><Form.Control.Feedback type="invalid">
               priciapux cible est obligatoire 
               </Form.Control.Feedback>
          </Form.Group>
          
            <div className="content-btn">
              {/*<Button className='btn-annnuler'>Annuler</Button>*/}
              <Button  className='btn-confirme' disabled={!isFormValid()} onClick={updateInfor}>Confirmer</Button>
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

export default PlanifierCours