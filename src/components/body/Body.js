import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ForgotPassword from "../../pages/auth/forgotPassword/forgotPassword";
import ResetPassword from "../../pages/auth/ResetPassword/ResetPassword";
import Home from "../../pages/home/Home";
import Home1 from "../../pages/home/Home1";
import DevenirInstructeur1 from "../../pages/auth/devenirInstructeur/DevenirInstructeur1";

import DevenirInstructeur from "../../pages/auth/devenirInstructeur/DevenirInstructeur";
import Inscrire from "../../pages/auth/inscrire/Inscrire";
import NotFound from "../utils/NotFound/NotFound";
import NotFound1 from "../utils/NotFound/NotFound1";
import NotFound2 from "../utils/NotFound/NotFound2";

import LeftList from "../../backOffice/components/leftList/LeftList";
import Profil from "../../backOffice/pages/profile/Profil";
import Formations from "../../backOffice/pages/formations/Formations";
import Parametres from "../../backOffice/pages/parametres/Parametres";
import AjoutEvent from "../../backOffice/pages/evenements/ajoutEvent/AjoutEvent";
import Achats from "../../backOffice/pages/achats/Achats";
import NewFormation from "../../backOffice/pages/formations/NewFormation/NewFormation";
import Gains from "../../backOffice/pages/gains/Gains";
import Connexion from "../../pages/auth/connexion/Connexion";
import Favoris from "../../backOffice/pages/favoris/Favoris";
import Messages from "../../backOffice/pages/messages/Messages";
import Reclamations from "../../backOffice/pages/reclamations/Reclamations";
import Instructeurs from "../../backOffice/pages/instructeurs/Instructeurs";
import ApprenantList from "../../backOffice/pages/apprenants/ApprenantList";
import CandidatAccepted from "../../backOffice/pages/instructeurs/candidatList/CandidatAccepted";
import Categories from "../../backOffice/pages/categories/Categories";
import AddAdmin from "../../backOffice/pages/administrateur/AddAdmin";
import AddCategorie from "../../backOffice/pages/categories/AddCategorie";
import FormationList from "../../backOffice/pages/formations/ListFormation/FormationList";
import AdministrateurList from "../../backOffice/pages/administrateur/AdministrateurList";
import Administrateur from "../../backOffice/pages/administrateur/Admin/Administrateur";
import ApprenantAdd from "../../backOffice/pages/apprenants/ApprenantAdd";
import InstructeurAdd from "../../backOffice/pages/instructeurs/InstructeurAdd";
import Apprenant from "../../backOffice/pages/apprenants/Apprenant/Apprenant";
import EditUser from "../../backOffice/pages/user/EditUser";
import Instructeur from "../../backOffice/pages/instructeurs/instructeur/Instructeur";
import AddFormation from "../../backOffice/pages/AddFormation/AddFormation";
import Dashbord from "../../backOffice/pages/dashbord/Dashbord";
import Panier from "../../pages/panier/Panier";
import HeaderInstructeur from "../../pages/auth/devenirInstructeur/HeaderInstructeur";
import HeaderInstructeur1 from "../../pages/auth/devenirInstructeur/HeaderInstructeur1";

import { AllEvents } from "../../pages/events/allEvents/AllEvents";
import { EventDetails } from "../../pages/events/eventDetails/event-details";
import UpdateCategorie from "../../backOffice/pages/categories/UpdateCategorie";
import SousCategorie from "../../backOffice/pages/categories/SousCategorie";
import AddSousCategorie from "../../backOffice/pages/categories/AddSousCategorie";
import UpdateSousCategorie from "../../backOffice/pages/categories/UpdateSousCategorie";
import PartnerPage from "../../pages/partner/partner-page";
import AddReclamation from "../../backOffice/pages/reclamations/AddReclamation";
import Reclamation from "../../backOffice/pages/reclamations/Reclamation";
import Reclamations1 from "../../backOffice/pages/admin/reclamations/Reclamations";
import Reclamation1 from "../../backOffice/pages/admin/reclamations/Reclamation";
import MesEvents from "../../backOffice/pages/evenements/MesEvent/MesEvents";
import Evenements from "../../backOffice/pages/admin/events/Evenements";
import Formations1 from "../../backOffice/pages/admin/formation/Formations";
import Footer from "../footer/footer";
import { Instructeurs1 } from "../../pages/instructeurs/Instructeurs";
import InstructeurDetails from "../../pages/instructeurs/instructeurDetails/InstructeurDetails";
import UpdateEvent from "../../backOffice/pages/evenements/updateEvent/UpdateEvent";
import Candidat from "../../backOffice/pages/instructeurs/candidat/Candidat";
import { CoursPage } from "../../pages/cours/cours";
import { CourseDetails } from "../../pages/cours/course-details/course-details";
import { CourseVideos } from "../../pages/cours/course-videos/course-videos";
import Activationpage from "../../pages/auth/inscrire/Activationpage"
// CSS FILES 
import "./Body.css";
import AddMessage from "../../backOffice/pages/messages/addMessage/AddMessage";


function Body() {
  const auth = useSelector((state) => state.auth); 
  const { isLogged, isAdmin, isInstr, isSuperAdmin,loginUser } = auth ;

  



  return (
    <section className={`${isLogged ? "body" : ""} ${isAdmin ? "body" : ""}`}>
        <>
      <LeftList>  
          <Routes>
         
            <Route  path="/profile" element={ <Profil /> } /> 
            <Route path="/mes-formations" element={ <Formations />} />
            <Route path="/mes-evenements" element={<MesEvents />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/ajout-evenement" element={<AjoutEvent />} />
            <Route path="/events/:id" element={<UpdateEvent />} />
            <Route path="/parametres" element={<Parametres />} />
            <Route path="/mes-achats" element={<Achats />} />
            <Route path="/mes-gains" element={ <Gains /> }/>
            <Route path="/new-formation/:titre1" element={isLogged ? <NewFormation /> : <NotFound2 />} />
            <Route path="/maFormation/:titre1" element={<NewFormation />} />
            <Route path="/apprenants" element={<ApprenantList /> }/>
           

            
            <Route
              path="/apprenant/:id"
              element={ <Apprenant /> }
            />
          <Route
              path="/user/:id"
              element={ <EditUser />}
            />
            <Route
              path="/admin/:id"
              element={
                <Administrateur /> 
              }
            />
            <Route
              path="/ajout-apprenant"
              element={
              loginUser.role==='admin' ? <ApprenantAdd /> : <NotFound />
              }
            />
            <Route
              path="/formations"
              element={
                isAdmin || isSuperAdmin ? <FormationList /> : <NotFound />
              }
            />
            <Route
              path="/all-formations"
              element={isAdmin || isSuperAdmin ? <Formations1 /> : <NotFound />}
            />
            <Route
              path="/instructeurs"
              element={
                 <Instructeurs />
              }
            />
            <Route
              path="/administrateurs"
              element={ <AdministrateurList /> }
            />
            <Route
              path="/addAdmin"
              element={ <AddAdmin /> }
            />
            <Route 
              path="/instructeur/:id" //voir details
              element={loginUser.role==='apprenant'  ?  <Instructeur /> : <NotFound />}
            />
            <Route
              path="/ajouter-instructeur"
              element={loginUser.role==='admin'  ? <InstructeurAdd /> : <NotFound />}
            />
            <Route
              path="/candidat/:id"
              element={<Candidat />}//voir details
            />
            <Route
              path="/tableau-bord"
              element={ <Dashbord />}
            />
            <Route
              path="/categories"
              element={isSuperAdmin ? <Categories /> : <NotFound />}
            />
            <Route
              path="/addcategorie"
              element={isSuperAdmin ? <AddCategorie /> : <NotFound />}
            />
            <Route path="/mes-favoris" element={<Favoris />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/newMessage" element={<AddMessage />} />
            <Route path="/reclamations" element={<Reclamations />} />
           
        
          
            <Route
             // path="/user/acceptInstr/:token"
             path="/user/acceptInstr/:id"
              element={<CandidatAccepted />}
            />
            <Route path="/formation/:titre1" element={<AddFormation />} />
            <Route path="/categorie/:id" element={<UpdateCategorie />} />
            <Route
              path="/categorie/sousCategories/:id"
              element={<SousCategorie />}
            />
            <Route
              path="/addSousCategorie/:id"
              element={<AddSousCategorie />}
            />
            <Route
              path="/sousCategorie/:id"
              element={<UpdateSousCategorie />}
            />
            <Route path="/add-reclamation" element={<AddReclamation />} />
            <Route path="/reclamation/:id" element={<Reclamation />} />
            <Route path="/all-reclamation" element={<Reclamations1 />} />
            <Route path="/reclamationdt/:id" element={<Reclamation1 />} />
            <Route path="/" element={isLogged ?  <Home /> : <Home1 /> } />
            <Route path="/DevenirInstructeur" element={isLogged ? <DevenirInstructeur /> : <DevenirInstructeur1 />} />
            <Route
              path="/devenir-instructeur"
              element={isLogged ? <HeaderInstructeur /> : <HeaderInstructeur1 />}
            />
          </Routes>
        
          </LeftList>
            </>
        <>
          <Routes>
          <Route path="/activationpage/:activationCode" element={<Activationpage /> } />
            <Route path="/ResetPassword/:activationCode" element={<ResetPassword /> } />
            {/*<Route path="/DevenirInstructeur" element={<DevenirInstructeur /> } />
            <Route
              path="/devenir-instructeur"
              element={<HeaderInstructeur />}
            />*/}
           
            <Route
              path="/connexion"
              element={isLogged ?  <NotFound1 />  : <Connexion />}
            />
            
            <Route
              path="/inscrire"
              element={isLogged ? <NotFound1 /> : <Inscrire />}
            />
            <Route
              path="/forgot_password"
              element={isLogged ? <NotFound1 /> : <ForgotPassword />}
            />
          
            <Route path="/panier" element={<Panier />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/cours" element={<CoursPage />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/cours/:id" element={<CourseDetails />} />
            <Route path="/cours/:id/videos" element={<CourseVideos />} />
            <Route path="/partner" element={<PartnerPage />} />
            <Route path="/allInstructeurs" element={<Instructeurs1 />} />
            <Route path="/instructeurDet" element={<InstructeurDetails />} />
            <Route path="/aaaa" element={<EditUser />} />
          </Routes>
          
          <Footer />
          
         {/* <Routes> <Route path="/" element={ <Home />} /> </Routes>*/}
          
        </>

        
    </section>
  );
}

export default Body;
//isAdmin || isSuperAdmin ? <Instructeurs /> : <NotFound />


//element={isSuperAdmin ? <AdministrateurList /> : <NotFound />}



//              element={isSuperAdmin ? <AddAdmin /> : <NotFound />}
/*path="/ajouter-instructeur"
              element={
                isAdmin || isSuperAdmin ? <InstructeurAdd /> : <NotFound />
              }*/

              /* element={
                isAdmin || isSuperAdmin ? <Instructeurs /> : <NotFound />
              }*/


             /* <Route
              path="/ajout-apprenant"
              element={
                isAdmin || isSuperAdmin ? <ApprenantAdd /> : <NotFound />
              }
            />*/

            /*<Route path="/apprenants" element={isAdmin || isSuperAdmin ? <ApprenantList /> : <NotFound />}/>*/

          /*  <Route
              path="/candidat/:id"
              element={isAdmin || isSuperAdmin ? <Candidat /> : <NotFound />}
            />
            
             <Route
              path="/admin/:id"
              element={
                isAdmin || isSuperAdmin ? <Administrateur /> : <NotFound />
              }
            />
            
             <Route
              path="/instructeur/:id" //voir details
              element={isAdmin || isSuperAdmin ? <Instructeur /> : <NotFound />}
            />*/
            /*<Route
              path="/user/:id"
              element={isAdmin || isSuperAdmin ? <EditUser /> : <NotFound />}
            />*/
            
          /*  <Route
              path="/apprenant/:id"
              element={isAdmin || isSuperAdmin ? <Apprenant /> : <NotFound />}
            */