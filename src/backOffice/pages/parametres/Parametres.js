import React from 'react'
import ScrollTab from '../../components/ScrollTab/ScrollTab'
import MotdePasse from './MotDePasse/MotdePasse'
import Paiement from './Paiement/Paiement'
import './Parametres.css'

function Parametres() {
  return (
    <div className="parametres">
      <h1 className="title-parametres">Paramétres</h1>
        <div className="scrollTab">
          <ScrollTab label1="Paiement" label2="Mot de passe" 
              item1={<Paiement />}
              item2={<MotdePasse />}
          />
      </div>
    </div>
  )
}
export default Parametres