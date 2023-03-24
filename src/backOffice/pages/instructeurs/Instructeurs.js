import React from 'react'
import ScrollTab from '../../components/ScrollTab/ScrollTab'
import './Instructeurs.css'
import InstructeurList from './instructeursList/InstructeurList'
import CandidatList from './candidatList/candidatList'
import { Button } from 'antd'

function Instructeurs() {
  return (
    <div className="instructeur">
    <div className="header-instructeur">
        <h1 className='title-instructeur'>Liste instructeurs</h1>
        <Button className='btn-add-instructeur' href='/ajouter-instructeur'>
        <img src="images/add-square.png" className="add-icon" alt=""/>Instructeurs</Button>
      </div>
    <div className="scrollTab">
    <ScrollTab label1="Instructeurs" label2="Candidats" 
        item1={<InstructeurList />}
        item2={<CandidatList />}
       />
    </div>
    
    </div>
  )
}

export default Instructeurs