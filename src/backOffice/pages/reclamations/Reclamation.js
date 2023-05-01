import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'

import BreadcrumbHeader from '../../components/breadcrumb/BreadcrumbHeader';
import DayJS from 'react-dayjs';
import { useParams } from 'react-router-dom';
import './Reclamations.css'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios'

import { getreclamationbyid } from '../../../redux/features/recbyid';
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
const initialState = {
    message:'',
    err: '',
    success: ''
  }

function Reclamation() {
    const reclamations2 = useSelector(state => state.reclamationbyid.reclamationid)
    const dispatch = useDispatch()
    const {id} = useParams()

    
    const token = useSelector(state => state.token)

      useEffect(() => {
     
        dispatch(getreclamationbyid(id))
            
      },[dispatch])

console.log(reclamations2)

  return (
    <div className='add-admin'>
      <BreadcrumbHeader item="Mes réclamations" link="/reclamations" active="réclamation"/>
        <div className='content-admin'>
        <Link to="/reclamations">
        <ArrowBackIcon className="icon-back" />
      </Link>
        <h4>Sujet: {reclamations2.sujet}</h4>
       
        <h4>Message:</h4>
        <Form.Group className="mb-3" >
                <Form.Control as="textarea" rows={7} 
                defaultValue={reclamations2.message}
                required  disabled
              />
            </Form.Group>
            <h4>Reponse:</h4>
            <Form.Group className="mb-3" >
                <Form.Control as="textarea" rows={7} 
                defaultValue={reclamations2.reponse}
                required  disabled
              />
            </Form.Group>
        
      
        </div>
    </div>
  )
}

export default Reclamation