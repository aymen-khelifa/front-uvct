import React from 'react'
import ScrollTab from '../../components/ScrollTab/ScrollTab'
import './Achats.css'
import Evenements from './evenements/Evenements'
import Formations from './formations/Formations'
import Transactions from './transactions/Transactions'



function Achats() {
    
  return (
    <div className="parametres">
    <h1 className="title-parametres">Mes achats</h1>
    <div className="scrollTab">
    <ScrollTab label1="Transactions" label2="Formations" label3="Événements"
        item1={<Transactions />}
        item2={<Formations />}
        item3={<Evenements />}

    />
    </div>
    
    </div>
  )
}

export default Achats