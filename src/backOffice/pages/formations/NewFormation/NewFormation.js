import React from 'react'
import BreadcrumbHeader from '../../../components/breadcrumb/BreadcrumbHeader'
import ScrollTab from '../../../components/ScrollTab/ScrollTab'
import Certificat from './Certificat/Certificat'
import Commentaires from './Commentaires/Commentaires'
import Coupons from './Coupons/Coupons'
import Curriculum from './Curriculum/Curriculum'
import Etudiants from './Etudiants/Etudiants'
import Informations from './informations/Informations'
import '../Formation.css'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import AddIcon from '@material-ui/icons/Add';
function NewFormation() {
  const {titre1} = useParams();

  return (
    <div className='admin'>
      <div className='header-formation'>
      <BreadcrumbHeader item="Mes formations" link="/mes-formations" active={titre1}/>
            <Button className='btn-edit-formation' href={`/formation/${titre1}`}>
              <AddIcon />Modifier formation
            </Button>
      </div>
     <div className='scrolltab'>
     <ScrollTab label1="Informations" label2="Curriculum" label3="Coupons" 
     label4="Commentaires" label5="Certificat" label6="Étudiants" 
     item1={<Informations />} item2={<Curriculum />} item3={<Coupons />}
     item4={<Commentaires />} item5={<Certificat />} item6={<Etudiants />}
    />
     </div>
    </div>
  )
}

export default NewFormation