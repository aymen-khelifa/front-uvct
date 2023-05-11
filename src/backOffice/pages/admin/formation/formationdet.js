import React from 'react'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import ScrollTab from '../../../components/ScrollTab/ScrollTab'
import Voirdetailfor from './voidetailfor'
import Certificat from './editfor/Certificat'
import Commentaires from './editfor/Commentaires'
import Coupons from './editfor/Coupons/Coupons'
import Curriculum from '../../formations/NewFormation/Curriculum/Curriculum'
import Etudiants from './editfor/Etudiants'
import Informations from './editfor/Informations'


function formationdet() {
   
  return (
    <div className='ajout-formation'>
     <BreadcrumbHeader item="Liste formations" link="/all-formations" active="formation"/>
     <div className='scrolltab'>
     <ScrollTab  label1="detail" label2="Informations" label3="Curriculum" label4="Coupons" 
     label5="Commentaires" label6="Certificat" label7="Étudiants"
     item1={<Voirdetailfor />} item2={<Informations />} item3={<Curriculum />} item4={<Coupons />} 
     item5={<Commentaires />} item6={<Certificat />} item7={<Etudiants />}

    />
     </div>
    </div>
  )
}

export default formationdet