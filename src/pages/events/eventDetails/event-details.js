import {QuickNavigation} from "../../../components/quick-navigation/quick-navigation";
import {Button, Typography} from "antd";
import './event-details.scss'
import {UserInfoComponent} from "../components/user-info-component/user-info-component";
import {AccessTime, TravelExplore} from "@mui/icons-material";
import SimilarEvents from "../components/similar-events/similar-events";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export const EventDetails = () => {
    const {id} =  useParams()
    const [eventDetails, setEventDetails] =  useState({})

    useEffect(()=> {
        axios({url: `http://localhost:5000/event/${id}`})
            .then(response => {
                setEventDetails(response.data)
                console.log(response.data)
            })
            .catch()
    }, [id])

  return(
      <div className={'event-container'}>
          <div style={{background: "white", width: '100%'}}>
              <QuickNavigation />
              <div className={'event-details'}>
                  <Typography className={'date'}>{new Date(eventDetails.dateDebut).toLocaleString()}</Typography>
                  <Typography className={'title'}>{eventDetails.titre}</Typography>
                  <UserInfoComponent postedBy={eventDetails.postedBy} />
              </div>
          </div>
          <div className={'details-container'}>
              <div className={'event-details-container'}>
                  <img className={'instructor-image'} alt={'affiche evenement'}
                       src={eventDetails.affiche}/>
                  <Typography className={'event-title'}>Détails</Typography>
                  <Typography.Paragraph className={'event-description'}>Ceci est un événement en ligne.<br/>
                      Les participants peuvent être situés n'importe où dans le monde !
                        <br/>
                        <br/>
                      {eventDetails.gratuit? 'Cet événement est gratuit!': `Cet evenement est à ${eventDetails.prix}TND`}
                      <br/>
                      <br/>
                      {eventDetails.details}
                      <br/>
                      <br/>
                          Merci de venir avec vos questions
                  </Typography.Paragraph>
              </div>
              <div className={'event-time-actions-container'}>
                  <div className={'event-time-card'}>
                      <div className={'flex-row'}>
                          <AccessTime />
                          <Typography className={'date-time'}>{new Date(eventDetails.dateDebut).toLocaleString()} jusqu'au {'\t'}
                               {new Date(eventDetails.dateFin).toLocaleString()}
                          </Typography>
                      </div>
                      <div className={'flex-row'}>
                          <TravelExplore />
                          <Typography className={'date-time'}>Événement {eventDetails.enLigne?'en ligne \n Lien visible pour les participants': 'sur place'}
                          </Typography>
                      </div>
                  </div>
                  <div className={'event-time-button'}>
                      <Button className={'event-time-button-share'} onClick={()=> {
                          navigator.share({text: eventDetails.titre, url: window.location})
                      }}>Partager</Button>
                      <Button className={'event-time-button-booking'}>Réserver</Button>
                  </div>
              </div>
          </div>
          <div>
              <div className={'divider'}/>
                <SimilarEvents/>
          </div>
      </div>
  )
}
