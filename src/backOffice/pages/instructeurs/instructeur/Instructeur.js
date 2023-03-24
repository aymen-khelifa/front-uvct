import React from 'react'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import ScrollTab from '../../../components/ScrollTab/ScrollTab'
import EditUser from '../../user/EditUser'


function Instructeur() {
   
  return (
    <div className='ajout-formation'>
     <BreadcrumbHeader item="Liste instructeurs" link="/instructeurs" active="Instructeur"/>
     <div className='scrolltab'>
     <ScrollTab label1="Profile" label2="Ses activités"  
     item1={<EditUser />} item2=""
    />
     </div>
    </div>
  )
}

export default Instructeur