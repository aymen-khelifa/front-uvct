import React from 'react'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import ScrollTab from '../../../components/ScrollTab/ScrollTab'
import EditUserAdmin from '../../user/EditUserAdmin'
import Activites from './Activites'

function Administrateur() {
   
  return (
    <div className='ajout-formation'>
     <BreadcrumbHeader item="Liste Administrteurs" link="/administrateurs" active="Admin"/>
     <div className='scrolltab'>
     <ScrollTab label1="Profile" label2="Ses activités"  
     item1={<EditUserAdmin />} item2={<Activites />} 
    />
     </div>
    </div>
  )
}

export default Administrateur