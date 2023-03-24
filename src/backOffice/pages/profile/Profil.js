import React, {useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import './Profil.css'
import { Button,Form} from 'react-bootstrap'
import { message } from 'antd';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import SnackbarSuccess from '../../components/Snackbar/SnackbarSuccess'
import SnackbarErr from '../../components/Snackbar/SnackbarErr'
import LeftList from '../../components/leftList/LeftList'

const key = 'updatable';
const openMessage = () => {
  message.loading({ content: 'Loading...', key });
  setTimeout(() => {
    message.success({ content: 'Loaded!', key, duration: 2 });
  }, 1000);
};
const initialState = {
    name: '',
    phone:'',
    site:'',
    description:'',
    err: '',
    success: ''
}
function Profil() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)
    const {user,isInstr} = auth
    const [data, setData] = useState(initialState)
   // const {name,site,phone,description, err, success} = data
    const {site,description, err, success} = data
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [tel, setTel] = useState(""); 
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [telError, setTelError] = useState(false);
    const handleChange = e => {

          const {name, value} = e.target

          setData({...data, [name]:value, err:'', success: ''})
      }
    const changeAvatar = async(e) => {
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
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)

        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
    const updateInfor = () => {
        try {
            axios.patch('http://localhost:5000/users/updateinfo', {
                name : name,
                //avatar: avatar ? avatar : user.avatar,
                tel: tel,
                email:email,
                //site: site ? site : user.site,
                //description: description ? description : user.description,

            }, {
              headers: {'X-Requested-With': 'XMLHttpRequest', 
              "content-type":"application/json", "Access-Control-Allow-Origin": "http://localhost:5000", 
              "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
             "withCredentials": true 
           })
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
            setOpen2(true);
        }
    }
    const handleUpdate = () => {
         updateInfor()
    }
    const isFormValid = () => {
      // add validation rules here
      return  email !== ''  && !emailError ;
    };
    const handleNameChange = (event) => {
      const { value } = event.target;
      setName(value);
      setNameError(value.length < 3);
    };
    const handleEmailChange = (event) => {
      const { value } = event.target;
      setEmail(value);
      setEmailError(value === '' || !/\S+@\S+\.\S+/.test(value));
    };
    const handleTelChange = (event) => {
      const { value } = event.target;
      setTel(value);
      setTelError(!/^\d{8}$/.test(value));
    };
  return (
    <> 
    
   
<div className="profile">
  
      <h2 className='title-profil'>Informations générales</h2>
      <div className='content-profil'>
     
       <Form className='form-profil'>
         <Form.Group>
         {loading && openMessage() }
         <div className='profile-pic-div'>
         <img src={avatar ? avatar : user?.avatar} alt="" className="avatar-img" />
           <div className="uploadBtn">
           <Form.Label htmlFor="file">
            <PhotoCameraIcon className='icon-camera'/>
           </Form.Label>
           </div>
         </div>
         <Form.Control type="file"  id="file"
              name="avatar"
              onChange={changeAvatar}
              style={{display:"none"}}
          />
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Nom complet</Form.Label>
              <Form.Control type="text" placeholder="Entrer votre nom et prénom"
                name="name"
                required
               // defaultValue={user?.name}
               onChange={handleNameChange}
                     error={nameError}
                     helperText={nameError}
              /><Form.Control.Feedback type="invalid">
              Please enter a valid name
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Adresse e-mail</Form.Label>
              <Form.Control type="email" placeholder="nom@email.com"
                name="email"
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError}
              //  defaultValue={user?.email}
               
            /><Form.Control.Feedback type="invalid">
              Please enter a valid email address
              </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" >
            <Form.Label className="label">Numéro de téléphone</Form.Label>
              <Form.Control type="text" placeholder="Entrer votre numéro de téléphone"
                name="phone"
               // defaultValue={user?.phone}
               onChange={handleTelChange}
                    error={telError}
                    helperText={telError }
            /><Form.Control.Feedback type="invalid">
              Please enter a valid telephone number
              </Form.Control.Feedback>
          </Form.Group>
          { isInstr &&
            (<>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Site web personnel</Form.Label>
                  <Form.Control type="text" placeholder="Enter votre URL"
                    name="site"
                  //  defaultValue={user?.site}
                    onChange={handleChange}
                /><Form.Control.Feedback type="invalid">
              Name is required and at least 3 character
              </Form.Control.Feedback>
             </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label className="label">Sur moi</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Ecrire ici..."
                    name="description"
                  //  defaultValue={user?.description}
                    onChange={handleChange}
                /><Form.Control.Feedback type="invalid">
              Name is required and at least 3 character
              </Form.Control.Feedback>
              </Form.Group>
            </>
            )
          }
          <div className="content-button">
                  <Button disabled={!isFormValid()} onClick={handleUpdate} className='btn-sauvg'>Sauvegarder les modifications</Button>
           </div>
        </Form>
      </div>
        <SnackbarSuccess success={success} open={open}/>
        <SnackbarErr err={err} open2={open2}/>
    </div>
    </>
  )
}

export default Profil
