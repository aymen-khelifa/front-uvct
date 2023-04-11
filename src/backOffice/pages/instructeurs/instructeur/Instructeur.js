import React from 'react'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import ScrollTab from '../../../components/ScrollTab/ScrollTab'
import EditUser from '../../user/EditUser'
import Voirdetails from '../../instructeurs/instructeur/Voirdetails'

function Instructeur() {
   
  return (
    <div className='ajout-formation'>
     <BreadcrumbHeader item="Liste instructeurs" link="/instructeurs" active="Instructeur"/>
     <div className='scrolltab'>
     <ScrollTab label1="details" label2="Profile"  label3="Ses activités"
     item1={<Voirdetails />} item2={<EditUser />} item3=""
    />
     </div>
    </div>
  )
}

export default Instructeur