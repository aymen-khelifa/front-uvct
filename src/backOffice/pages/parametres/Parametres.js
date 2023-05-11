import React from 'react'
import ScrollTab from '../../components/ScrollTab/ScrollTab'
import MotdePasse from './MotDePasse/MotdePasse'
import Paiement from './Paiement/Paiement'
import Profile from './profile/Profile'
import './Parametres.css'
import EditUser from '../user/EditUser'
import { useSelector } from 'react-redux'
import EditUserAdmin from '../user/EditUserAdmin'
import EditUserApprenant from '../user/EditUserApprenant'

function Parametres() {
  const user = useSelector(state => state.auth.user)
  return (
    <div className="parametres">
      <h1 className="title-parametres">Paramétres</h1>
        <div className="scrollTab">
          {user.role==='instructeur' &&  <ScrollTab label1="Paiement" label2="Mot de passe" label3="profile"
              item1={<Paiement />}
              item2={<MotdePasse />}
              //item3={<Profile />}
              item3={<EditUser />}
          />}
          {user.role==='admin' && <ScrollTab label1="Paiement" label2="Mot de passe" label3="profile"
              item1={<Paiement />}
              item2={<MotdePasse />}
              //item3={<Profile />}
              item3={<EditUserAdmin />}
          />}
          {user.role==='apprenant' && <ScrollTab label1="Paiement" label2="Mot de passe" label3="profile"
              item1={<Paiement />}
              item2={<MotdePasse />}
              //item3={<Profile />}
              item3={<EditUserApprenant />}
          />}
      </div>
    </div>
  )
}
export default Parametres