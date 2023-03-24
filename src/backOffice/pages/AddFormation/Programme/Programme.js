import React ,{useState} from 'react'
import { Button } from 'react-bootstrap'
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import AfficheSection from './AfficheSection';
import AddSection from './AddSection';

   
function Programme() {
    const [show, setShow] = useState(true);

  return (
    <div>
        <h3>Programme</h3>
        <p className='paragraphe'>Pour donner forme à votre cours, créez des sections,
         des sessions  et des exercices pratiques <br />(quiz, exercices de codage et exercices).</p>
        <p className='paragraphe'>Si vous prévoyez de rendre votre cours gratuit,
        la longueur totale de son contenu vidéo doit être inférieure à 2 heures.</p>
         <AfficheSection />
        {
          !show && (
            <div className='content-chapitre'>
              <CloseIcon onClick={ () => setShow(!show)} className="icon-add"/>
              <AddSection className="icon-prog"/>
            </div>
          )} 
        <Button className='btn-confirme' onClick={() => setShow(!show)} ><AddIcon />Ajouter section</Button>
    </div>
  )
}

export default Programme