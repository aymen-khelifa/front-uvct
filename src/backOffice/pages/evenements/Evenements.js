import React from 'react'
import { Button } from 'react-bootstrap'
import ScrollTab from '../../components/ScrollTab/ScrollTab'
import MesEvents from './MesEvent/MesEvents'
import AddIcon from '@material-ui/icons/Add';
import './Evenements.css'
import { Link } from 'react-router-dom';

function Evenements() {
  return (
    <div>
      <div className='eventTitleContainer'>
        <h1 className="title-event">Mes événements</h1>
        <Link to="/ajout-evenement">
        <Button className='btn-event'> <AddIcon />Événements</Button>
        </Link>
      </div>
      <div className="scrollTab">
     <ScrollTab label1="Tous" label2="Mes événements" 
        item2={<MesEvents />}
    />
      </div>
    </div>
  )
}

export default Evenements