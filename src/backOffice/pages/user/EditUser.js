import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { Button,Form} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import './EditUser.css'
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Snackbar, Alert} from "@mui/material";
import { getinstructeurbyId } from '../../../redux/features/usersSlice'

        const initialState = {
            name: '',
            phone:'',
            email:'',
            speciality:'',
            password:'',
            cf_password: '',
            err: '',
            success: ''
        }

function EditUser() {
    const token = useSelector(state => state.token)
    const instructeur = useSelector(state => state.auth.user)
    //const {instructeur} = auth
    const [data, setData] = useState(initialState)
    //const {name,phone,email,speciality,password, cf_password, err, success} = data
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback] = useState(false)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [speciality, setspeciality] = useState("");
    const [specialityError, setspecialityError] = useState(false);
    const [tel, setTel] = useState("");
    const [telError, setTelError] = useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const [password, setPassword] = useState("");
   
    const [passwordError, setPasswordError] = useState(false);


        useEffect(() => {
         
                dispatch(getinstructeurbyId(id))
            
        },[token,id, dispatch, callback])
        console.log(instructeur.UUid)
        

        const changeAvatar = async(e) => {
            e.preventDefault()
            try {
                const file = e.target.files[0]

                if(!file) return setData({...data, err: "Aucun fichier n'a été téléchargé." , success: 'Photo téléchargée'})

                if(file.size > 1024 * 1024)
                    return setData({...data, err: "Taille trop grande." , success: 'Photo téléchargée'})

                if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                    return setData({...data, err: "Le format de fichier est incorrect." , success: 'Photo téléchargée'})

                let formData =  new FormData()
                formData.append('file', file)

                setLoading(true)
                const res = await axios.post('/api/upload_avatar', formData, {
                    headers: {'content-type': 'multipart/form-data', Authorization: token}
                })

                setLoading(false)
                setAvatar(res.data.url)
                
                
            } catch (err) {
                setData({...data, err: err.response.data.msg , success: ''})
               

            }
        }
   const uuid=instructeur.UUid
        const updateInfor = () => {
            try {
                axios.patch(`http://localhost:5000/users/editprofileinst/${instructeur.UUid}`, {
                    name: name ,
                    //avatar: avatar ,
                    tel: tel ,
                    email: email ,
                    speciality: speciality,
                    

                },{ headers: {'X-Requested-With': 'XMLHttpRequest', 
                "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
                "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
               "withCredentials": true 
                    //headers: {Authorization: token}
                })

                setData({...data, err: '' , success: "Profile modifié!"})
                
                
            } catch (err) {
                setData({...data, err: err.response.data.msg , success: ''})
               
            }
        }

 
    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setEmailError(value === '' || !/\S+@\S+\.\S+/.test(value));
  };
  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    setNameError(value.length < 3);
  };
  const handleTelChange = (event) => {
    const { value } = event.target;
    setTel(value);
    setTelError(!/^\d{8}$/.test(value));
  };
  
  const handleSpecialityChange = (event) => {
    const { value } = event.target;
    setspeciality(value);
    setspecialityError(value.trim() === '' ? 'La spécialité est requise.' : '');
  };
  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    setPasswordError(value.length < 8);
  };
  const isFormValid = () => {
    // add validation rules here
    return  email !== ''   && name !== '' && tel !== '' && !emailError  && !nameError && !telError  && !specialityError ;
  };
  


  return (
      <div className='content-user'>
       <h3 className='title-photo'>Photo de profile</h3>
       <Form className='form-profil'>
       <Form.Group className="mb-3">
         <div className='profile-pic-div'>
         <img src={ instructeur.avatar} alt="" className="avatar-img" />
           <div className="uploadBtn">
           <Form.Label htmlFor="file"> 
            <PhotoCameraIcon className='icon-camera'/>
           </Form.Label>
           </div>
         </div>
         <Form.Control type="file"  id="file"
              name="avatar"
              //defaultValue={instructeur.avatar}
              onChange={changeAvatar}
              style={{display:"none"}}
          />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Nom complet</Form.Label>
              <Form.Control type="text"  
                name="name" 
                required 
                //Value={instructeur.name}
                onChange={handleNameChange}
                    isInvalid={nameError}                            
                    /><Form.Control.Feedback type="invalid">
              Name is required and at least 3 character
               </Form.Control.Feedback>
          </Form.Group>
          
          <Form.Group className="mb-3" >
            <Form.Label className="label">Adresse e-mail</Form.Label>
              <Form.Control type="email" 
                name="email" 
              //Value={instructeur.email}
               onChange={handleEmailChange}
            isInvalid={emailError} 
             />
              <Form.Control.Feedback type="invalid">
              saisir un  email addresse valide
               </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Numéro de téléphone</Form.Label>
              <Form.Control type="text"  
                name="phone" 
              //Value={instructeur.tel}
              onChange={handleTelChange}
                    
                    isInvalid={telError}
         />
          <Form.Control.Feedback type="invalid">
          saisir un numero de  telephone valide
               </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Spécialité</Form.Label>
            <Form.Select
              name="speciality"
              required 
              onChange={handleSpecialityChange}
                isInvalid={specialityError}>
             
              <option Value={instructeur.speciality}>{instructeur.speciality}</option>
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
        <Form.Control.Feedback type="invalid">
              La spécialité est requise.
               </Form.Control.Feedback>
          </Form.Group>
          
         
          <div className="content-btn">
                  <Button className='btn-annnuler' href="/instructeurs">Annuler</Button>
                  <Button  onClick={updateInfor} disabled={!isFormValid()} className='btn-confirme'>Sauvegarder les modifications</Button>
           </div>
        </Form>
        <Snackbar autoHideDuration={2500} open={ err === "" ? false : true } onClose={()=>{ setErr("") }}  >
        <Alert variant="filled" severity="error" onClose={()=>{ setErr("") }} >
          {
            err
          }
        </Alert>
      </Snackbar>
      <Snackbar autoHideDuration={2500} open={ success === "" ? false : true } onClose={()=>{ setSuccess("") }}  >
        <Alert variant="filled" severity="success" onClose={()=>{ setSuccess("") }} >
          {
            success
          }
        </Alert>
      </Snackbar>
    </div>
  )
}

export default EditUser;
//<option defaultValue={instructeur.instructeur.speciality}>{instructeur.instructeur.speciality}</option>