import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import BreadcrumbHeader from '../../../backOffice/components/breadcrumb/BreadcrumbHeader';
import { useParams } from 'react-router-dom';
import '../../../backOffice/pages/admin/reclamations/Reclamations.css'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios'
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

import { messagebyid } from '../../../redux/features/msgbyid';

const initialState = {
    message:'',
    err: '',
    success: ''
  }

function Msgdet() {
    const msg1 = useSelector(state => state.messagebyid.msgbyid)
    const dispatch = useDispatch()
    const {id} = useParams()

    
    const token = useSelector(state => state.token)

      useEffect(() => {
     
        dispatch(messagebyid(id))
            
      },[dispatch])

console.log(msg1)

  return (
    <div className='add-admin'>
      <BreadcrumbHeader item="Mes messages" link="/messages" active="message"/>
        <div className='content-admin'>
        <Link to="/messages">
        <ArrowBackIcon className="icon-back" />
      </Link>
        <h4>Sujet: {msg1.objectif}</h4>
       
        <h4>Message:</h4>
        <Form.Group className="mb-3" >
                <Form.Control as="textarea" rows={7} 
                defaultValue={msg1.message}
                required  disabled
              />
            </Form.Group>
            <h4>Reponse:</h4>
            <Form.Group className="mb-3" >
                <Form.Control as="textarea" rows={7} 
                defaultValue={msg1.response}
                required  disabled
              />
            </Form.Group>
        
      
        </div>
    </div>
  )
}

export default Msgdet;