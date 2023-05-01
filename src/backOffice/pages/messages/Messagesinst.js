import React from 'react'
import { Button } from 'react-bootstrap'
import ScrollTab from '../../components/ScrollTab/ScrollTab'
import BoiteReception from './BoiteReception/BoiteReception'
import MessageEnvoyer from './MessageEnvoye/MessageEnvoyer'
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom'
import Boitereception1 from './BoiteReception/boitereceotioninst'

function Messages1() {
  return (
    <div>
      <div className='eventTitleContainer'>
        
      </div>
      <div className="scrollTab">
     <ScrollTab label1="Boite réception" //label2="Messages envoyés" 
        item1={<Boitereception1 />}
      //  item2={<MessageEnvoyer />}
    />
    </div>
    </div>
  )
}

export default Messages1