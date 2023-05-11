/*import React, {useState,ChangeEvent } from 'react'     


import { Button,Form} from 'react-bootstrap';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './DevenirInstructeur.scss'
import {Typography} from "antd";
import {arrow} from "../../../assets";
import { Snackbar, Alert} from "@mui/material";


function DevenirInstructeur() {
    const [user, setUser] = useState(initialState)
    //const {name, email, speciality,message,phone,err, success} = user
    const navigate = useNavigate();
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
 
  
  const [cv, setCV] = useState("");
  const [msg, setmessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [tel, setTel] = useState("");
  const [telError, setTelError] = useState(false);
  const [err , setErr] = useState("");
  const [success , setSuccess] = useState("");
  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [speciality, setspeciality] = useState("");
  const [specialityError, setspecialityError] = useState(false);

  
    // const [file, setFile] = useState(false);


 
    function FileUploadSingle() {
        const [file, setFile] = useState<File>();
    }      
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };
    
    
    const handleSubmit = async e => {console.log('aa');
        e.preventDefault() ; 
      
      
        try {console.log('bbb');
        axios({
            method: 'post',
            url: 'https://httpbin.org/post',
            data: file,
            //file: file,
            headers: {
              'Content-Type': file.type,
              'Content-Length': file.size.toString(),
            },
          })
        } catch (err) {
          setErr('erreur');//setTimeout(()=>{navigate("/")},2000);
        }
    }
  
  
    
    /*const handleFileChange=(event)=>{
      const { value } = event.target.files[0];
      setCV(value);
    };
    
  return (
      <div className={'devenir-instructeur-container flex-row '} >
          <Typography className={'become-instructor'}>Inscrivez-vous pour devenir instructeur</Typography>
          <img src={arrow} className={'arrow'} alt={'arrow'}/>
    <div className='devInst' >
      
        <Form >
        
      
      <Form.Group  controlId="formBasicEmail" >
      <Form.Label className='labelForm'>Votre CV</Form.Label>
        <Form.Control type="file"
        onChange={handleFileChange}  accept=".pdf"
                    
                    //isInvalid={cvError}
         />
          <Form.Control.Feedback type="invalid">
          fichier is obligatoire
               </Form.Control.Feedback>
        
      </Form.Group>
     
      
      <div className="d-grid gap-2">
      <Button className='btn-devInst' type="submit" size="lg"  onClick={handleSubmit}>
        Envoyer
      </Button>
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
</div>
  )
}

export default DevenirInstructeur*/
import { Button,Form} from 'react-bootstrap';

import {Typography} from "antd";

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Snackbar, Alert} from "@mui/material";

const FormaAddFormateur = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const {activationCode} =useParams()
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [message, setMessage] = useState("");
  const [speciality, setspeciality] = useState("");
  const [cv, setCv] = useState("");
  const [preview, setPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const[selectedFile,setImage]=useState("");


 /* const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setCv(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };*/

 /* const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedFile= e.target.files
    setImage(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    let formData =  new FormData()
    formData.append('file', selectedFile)


    try {console.log('aaa')
      const response=await axios.patch(`http://localhost:5000/users/devenirinstructeur/${activationCode}`, {
       
      formData,
        
      },{
           headers: {'X-Requested-With': 'XMLHttpRequest', 
           "content-type":"multipart/form-data", "Access-Control-Allow-Origin": "http://localhost:5000", 
           "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
          "withCredentials": true 
        })
        if (response.data.message==='cv ajouté')
        {setSuccess('cv ajouté...attendez notre reponse sur le boite Mail'); //setTimeout(()=>{navigate("/")},1000);
      }
      
      if (response.data.message==='No File Uploaded')
        {setErr('cv est obligatoire');}
        if (response.data.message==='type de fichier invalide(pdf)')
        {setErr('type de fichier invalide(pdf)');}
       
        else{setErr("erreur");}
        //SkeletonImage(res.data.url)
      //setTimeout(() => navigate("/formateurs"), 2000);
    } catch (error) {
      setErr(true);
      console.error(error);
    }
  };*/
  const changeAffiche = async(e) => {
    e.preventDefault()
    try {
      const image= e.target.files[0]
      setImage(image);
      setPreview(URL.createObjectURL(image));

     
      let formData =  new FormData()
      formData.append('file', image)

     
        const res = await axios.patch(`http://localhost:5000/users/devenirinstructeur/${activationCode}`, formData, {
          headers: {'X-Requested-With': 'XMLHttpRequest', 
         "content-type":"multipart/form-data", "Access-Control-Allow-Origin": "http://localhost:5000", 
         "Access-control-request-methods":"POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS"}, 
        "withCredentials": true ,// Authorization: token
     });
     setSuccess('cv ajoutée!');

     setTimeout(()=>{navigate("/")},2000)
    // SkeletonImage(res.data.url)
     //window.location.reload()
     

       
        
    } catch (err) {
        //setAffiche({...data, err: err.response.data.msg , success: ''})
      //  setOpen2(true);
    }
  }

  return (
    <div className={'devenir-instructeur-container flex-row '} style={{width:'90%',marginTop:'4%',marginLeft:'50px'}}>
    <Typography className={'become-instructor'}>ajouter votre CV (obligatoire)</Typography>
       
       <div className='devInst' >

        <Form  >
  

        <div>
        <label htmlFor="cv">CV :</label>
        <input type="file" id="cv" name="cv" onChange={changeAffiche} 

        />
      </div>



          {/*  <div className="d-grid gap-2" style={{marginTop:'20px'}}>
               <Button className='btn-devInst' type="submit" size="lg"  //onChange={changeAffiche}
               >
               Envoyer
              </Button>
                </div>*/}
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
</div>
  );
};

export default FormaAddFormateur;

