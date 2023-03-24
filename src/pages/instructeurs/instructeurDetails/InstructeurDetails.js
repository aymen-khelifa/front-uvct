import { Typography } from 'antd'
import React from 'react'
import { QuickNavigation } from '../../../components/quick-navigation/quick-navigation'
import './InstructeurDetails.scss'
import {EventCard} from "../../events/components/event-card/event-card";
import {eventsScaffolding} from "../../events/allEvents/AllEvents";

function InstructeurDetails() {
  return (
    <div className={'instructor-details'}>
        <QuickNavigation />
        <div className='instructor-details-container'>
            <img src="./images/Instruteur1.png" alt="" className='instructorImageContainer'></img>
            <div className='info-instr'>
                <Typography className={"normal-text"}>Abdelrahman Omar Né en Égypte en 1983, il a vécu et étudié dans des universités égyptiennes, en plus d'études externes auprès de certains organismes et universités internationaux.</Typography>
                <Typography className={"normal-text"}>Il a été formé par des experts dans le domaine de la gestion d'entreprise de l'intérieur et de l'extérieur du Moyen-Orient, et j'ai géré un certain nombre d'entreprises et d'organisations dans de nombreuses industries nationales et internationales, en plus de travailler comme conférencier dans les domaines de l'administration et des compétences générales. programmes. Il a de nombreux assistants qui travaillent avec lui dans divers domaines de la gestion et du développement corporatif. Il a formé des centaines de milliers de jeunes et diplômés qui recherchent de meilleures opportunités pour développer leurs domaines professionnels et personnels et sont de nombreuses nationalités en plus de la représentation de nombreux organismes et entreprises aux États-Unis et au Royaume-Uni.</Typography>
                <Typography className={'titles'}>Qu'en est-il des expériences dans le domaine de la formation</Typography>
                <Typography className={'normal-text'}>Mon domaine est les solutions d'affaires et le développement corporatif et personnel,
                        La gestion n'est pas un luxe, mais c'est une composante essentielle de la gestion des établissements,
                        des entreprises, des particuliers et des pays. Je travaille dans les solutions d'affaires.
                        C'est en tant que prestataire de services et en explorant les problèmes des entreprises et en travaillant pour leur trouver
                        des solutions. Gestion d'entreprise dans tout et n'importe quoi. Business Solutions en tant que fournisseur de services,
                        explorant les problèmes des entreprises et travaillant à leur trouver des solutions. De plus, il doit répondre au marché du
                        travail et aux défis existants. J'ai dirigé de nombreuses entreprises dans des postes de haute direction en tant que décideur
                        pour de nombreuses entreprises nationales et internationales ou multinationales pendant plus de 17 ans dans un monde Business.
                        Administration Avec un travail de conférencier et de conférencier dans le domaine de l'administration des affaires, des ressources
                        humaines, marketing, ventes et gestion des installations spécialisées dans le développement des individus, qui sont des programmes
                        de compétences générales. Des dizaines de milliers de personnes ont été formées dans le monde arabe et au Moyen-Orient dans de
                        nombreux collèges, instituts et universités spécialisés dans la formation de nombreuses entreprises locales et internationales pour
                        résoudre de nombreux problèmes d'entreprises et de crises et définir des politiques et procédures pour ces entreprises.
                        Il existe de nombreux assistants dans les domaines des solutions d'affaires, avec le domaine de la formation technique,
                        professionnelle et académique. instituts et universités spécialisés dans la formation de nombreuses entreprises locales et
                        internationales pour résoudre de nombreux problèmes d'entreprises et de crises et définir des politiques et des procédures
                        pour ces entreprises. Il existe de nombreux assistants dans les domaines des solutions d'affaires, avec le domaine de la formation
                        technique, professionnelle et académique. instituts et universités spécialisés dans la formation de nombreuses entreprises locales
                        et internationales pour résoudre de nombreux problèmes d'entreprises et de crises et définir des politiques et des procédures pour
                        ces entreprises. Il existe de nombreux assistants dans les domaines des solutions d'affaires, avec le domaine de la formation technique, professionnelle et académique.</Typography>
                    <Typography className={'titles'}>Prestations de service</Typography>
                    <Typography className={'normal-text'}>
                        <Typography className={'sub-titles'}>Marketing pour vos produits Publicité</Typography>
                        et promotion / Créer des demandes / Système marketing complet / Étude de marché / Système de promotion / Marché cible et segmentation / Positionnement du produit
                        <Typography className={'sub-titles'}>Gestion des ventes </Typography>
                        Augmenter les ventes /Méthode de vente /Véhicules de communication (Ventes /promotion, Vente personnelle, /Publicité, Relations publiques, /Événements, parrainage, Direct /Marketing, Réseaux sociaux) /Plan d'appels commerciaux /Processus d'appels commerciaux /Techniques de négociation et traitement des objections
                        <Typography className={'sub-titles'}>Guide des procédures de gestion de l'entreprise</Typography>
                        Manuel complet / Du fournisseur à la satisfaction et au service client Gestion des ressources humaines Planification stratégique des ressources humaines. /Analyse du poste et description du poste. /Recrutement et sélection. /La formation et le développement. /Avantages et compensation. /Droit du travail.
                        <Typography className={'sub-titles'}>Gestion de la chaîne d'approvisionnement et logistique </Typography>
                        Gestion de la demande/Gestion des stocks/Gestion des entrepôts/Gestion des achats/Gestion des transports Administration des affaires Comment la gestion de l'entreprise / Piliers de gestion, gestion stratégique. /La comptabilité comme base de la prise de décision. /Mise en place de stratégies de marketing mix. /Gestion des performances. /Niveau de service /Compétences en leadership (délégation, coaching et travail d'équipe) /Résolution de problèmes et prise de décision efficace. /Agenda & To do List /Organigramme /Coaching pour de meilleurs résultats Formation et developpement Le processus de socialisation. /Orientation des employés. /Formation des employés /Développement des employés. /Évaluation des besoins en formation /Développement organisationnel. /Évaluation du programme de formation Gestion des performances Gestion de la performance et évaluation de la performance /Le processus de gestion de la performance /Participants à la gestion de la performance /Objectifs de la gestion de la performance /Évaluation et évaluation de la performance</Typography>
            </div>
        </div>
        <Typography className={'formations-list'}>Liste des formations proposées</Typography>
         {/* <div className={'flex-row'}>
            {
                eventsScaffolding.slice(0,3).map(element=> {
                    return(
                        <EventCard {...element} />
                    )
                })
            }
        </div>   */}
    </div>
  )
}

export default InstructeurDetails ; 
