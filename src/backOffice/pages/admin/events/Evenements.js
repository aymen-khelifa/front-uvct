import React from 'react'
import { Button } from 'react-bootstrap'
import ScrollTab from '../../../components/ScrollTab/ScrollTab'
import './Evenements.css'
import MesEvents from '../../evenements/MesEvent/MesEvents'
import TousEvent from './tousEvent/TousEvent'
import ArchiveEvent from './archive/archiveEvent'
import AddIcon from '@material-ui/icons/Add';

function Evenements() {
  return (
    <div>
      <div className='eventTitleContainer'>
        <h1 className="title-event">Mes événements</h1>
        <a href="/ajout-evenement">
        <Button className='btn-event'> <AddIcon /> Événements</Button>
        </a>
      </div>
      <div className="scrollTab">
        <ScrollTab label1="Tous" label2="Mes événements" label3="Archives" 
            item1={<TousEvent />}
            item2={<MesEvents />}
            item3={<ArchiveEvent />}
          />
      </div>
    </div>
  )
}

export default Evenements