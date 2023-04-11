import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { Button,Form} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import './profilee.css'


import { Snackbar, Alert} from "@mui/material";
import { dispatchGetUser, fetchUser } from '../../../../redux/actions/authAction'
      

function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {isapprenant,loginUser,user,isInstr,isAdmin} = auth
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback] = useState(false)
    const dispatch = useDispatch()
    const {id} = useParams()
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);
   
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [tel, setTel] = useState("");
    const [telError, setTelError] = useState(false);
    const [err , setErr] = useState("");
    const [success , setSuccess] = useState("");
    const [speciality, setspeciality] = useState("");
    const [specialityError, setspecialityError] = useState(false);
    const [genre, setGenre] = useState("");


       /* useEffect(() => {
          fetchUser(token,id).then(res =>{
                dispatch(dispatchGetUser(res))
            })
        },[token,id, dispatch, callback])
        console.log(id)*/
   /*     const changeAvatar = async(e) => {
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

               
               
                
            } catch (err) {
               
               

            }
        }*/
   
        const updateInfor = () => {
            try {
                axios.patch(`http://localhost:5000/users/editprofileapprenant/${id}`, {
                    name: name ,
                    avatar: avatar ,
                    tel: tel ,
                    email: email ,
                    speciality:speciality,
                    genre:genre,

                },{
                    headers: {Authorization: token}
                })

              
                window.location.reload(false);
            } catch (err) {
             
            }
        }

 /*   const updatePassword = () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 6 characters.", success: ''})

        if(!isMatch(password, cf_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            axios.post('/user/reset', {password},{
                headers: {Authorization: token}
            })

            setData({...data, err: '' , success: "Updated Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || avatar || phone || speciality || email) updateInfor()
        if(password) updatePassword()
    }*/
    const handlegenreChange = (event) => {
        const { value } = event.target;
        setGenre(value);
      };
    const isFormValid = () => {
      // add validation rules here
      return  email !== ''  && name !== '' && tel !== '' && !emailError && 
       !nameError && !telError ;
    };
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
    

  return (
      <div className='content-user'>
       <h3 className='title-photo'>Photo de profile</h3>
       <Form className='form-profil'>
       <Form.Group className="mb-3">
         <div className='profile-pic-div'>
         <img src={ user.avatar} alt="" className="avatar-img" />
           <div className="uploadBtn">
           <Form.Label htmlFor="file"> 
            <PhotoCameraIcon className='icon-camera'/>
           </Form.Label>
           </div>
         </div>
         <Form.Control type="file"  id="file"
              name="avatar"
              //defaultValue={instructeur.avatar}
             // onChange={changeAvatar}
              style={{display:"none"}}
          />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Nom complet</Form.Label>
              <Form.Control type="text" placeholder="saisir votre nom" 
                name="name" 
                required 
                
                onChange={handleNameChange}
                    isInvalid={nameError}                            
                    /><Form.Control.Feedback type="invalid">
              Name is required and at least 3 character
               </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Adresse e-mail</Form.Label>
              <Form.Control type="email" placeholder="nom@email.com"
                name="email" 
               onChange={handleEmailChange}
            isInvalid={emailError} 
             />
              <Form.Control.Feedback type="invalid">
              saisir un  email addresse valide
               </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Numéro de téléphone</Form.Label>
              <Form.Control type="text" placeholder="saisir votre numéro de téléphone"
                name="phone" 
              onChange={handleTelChange}
                    
                    isInvalid={telError}
         />
          <Form.Control.Feedback type="invalid">
          saisir un numero de  telephone valide
               </Form.Control.Feedback>
          </Form.Group>
          { isAdmin &&
            (
          <Form.Group className="mb-3" >
                <Form.Label className="label">Genre</Form.Label>
                  <Form.Select type="text" placeholder="" 
                    name="tele" 
                    //value={tel}
                    onChange={handlegenreChange} 
                  >
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
              genre est obligatoire
               </Form.Control.Feedback>
            </Form.Group>
            )
          }
         
          { loginUser.role==='instructeur' &&
            (<>
                <Form.Group className="mb-3" >
            <Form.Label className="label">Spécialité</Form.Label>
            <Form.Select
              name="speciality"
              required placeholder="choisir votre specialité"
              onChange={handleSpecialityChange}
                isInvalid={specialityError}>
             
             {/*<option defaultValue={user.speciality}>{user.speciality}</option>*/}
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
              <Form.Group className="mb-3" >
                <Form.Label className="label">Site web personnel</Form.Label>
                  <Form.Control type="text" placeholder="Enter votre URL"
                    name="site"
                  //  defaultValue={user?.site}
                   // onChange={handleChange}
                /><Form.Control.Feedback type="invalid">
              Name is required and at least 3 character
              </Form.Control.Feedback>
             </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Sur moi</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Ecrire ici..."
                    name="description"
                  //  defaultValue={user?.description}
                  //  onChange={handleChange}
                /><Form.Control.Feedback type="invalid">
              Name is required and at least 3 character
              </Form.Control.Feedback>
              </Form.Group>
            </>
            )
              }
          
          
          <div className="content-btn">
                
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

export default Profile;