import React from 'react'
import ScrollTab from '../../../components/ScrollTab/ScrollTab'
import ArchiveFormation from './accepterFormation'
import Formation from './Formation'
function Formations1() {
  return (
    <div>
      <div className='eventTitleContainer'>
        <h3 className="title-event">liste des formations</h3>
      </div>
      <div className="scrollTab">
        <ScrollTab label1="Formations" label2="liste d'attente" 
            item1={<Formation />}
            item2={<ArchiveFormation />}
        />
      </div>
    </div>
  )
}

export default Formations1