import React from 'react'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import ScrollTab from '../../../components/ScrollTab/ScrollTab'
import EditUser from '../../user/EditUser'
import Activites from './Activites'

function Administrateur() {
   
  return (
    <div className='ajout-formation'>
     <BreadcrumbHeader item="Liste Administrteurs" link="/administrateurs" active="Admin"/>
     <div className='scrolltab'>
     <ScrollTab label1="Profile" label2="Ses activités"  
     item1={<EditUser />} item2={<Activites />} 
    />
     </div>
    </div>
  )
}

export default Administrateur