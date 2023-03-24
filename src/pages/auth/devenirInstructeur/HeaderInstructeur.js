import React from 'react'
import './DevenirInstructeur.scss'
import DevenirInstructeur from './DevenirInstructeur'
import PartnerPage from "../../partner/partner-page";
import {KnowMore} from "../../partner/components/know-more/know-more";

function HeaderInstructeur() {
  return (
    <div>
        <PartnerPage/>
        <DevenirInstructeur />
        <KnowMore/>
    </div>
  )
}

export default HeaderInstructeur
