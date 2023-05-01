import React from 'react'
import ScrollTab from '../../components/ScrollTab/ScrollTab'
import MotdePasse from './MotDePasse/MotdePasse'
import Paiement from './Paiement/Paiement'
import Profile from './profile/Profile'
import './Parametres.css'
import EditUser from '../user/EditUser'

function Parametres() {
  return (
    <div className="parametres">
      <h1 className="title-parametres">Paramétres</h1>
        <div className="scrollTab">
          <ScrollTab label1="Paiement" label2="Mot de passe" label3="profile"
              item1={<Paiement />}
              item2={<MotdePasse />}
              //item3={<Profile />}
              item3={<EditUser />}
          />
      </div>
    </div>
  )
}
export default Parametres