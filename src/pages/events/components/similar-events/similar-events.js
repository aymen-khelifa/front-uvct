import React from 'react';
import {eventsScaffolding} from "../../allEvents/AllEvents";
import {EventCard} from "../event-card/event-card";
import './similar-events.scss'
import {Typography} from "antd";
import {Link} from "react-router-dom";

const SimilarEvents = () => {
    return (
        <div className={'similar-events'}>
            <div className={'flex-row align-items-center title-see-all-container'}>
                <Typography className={'title'}>Autres événements similaires</Typography>
                <Link to={'/events'}>
                    <Typography className={'see-all'}>Voir tout</Typography>
                </Link>
            </div>
        <div className={'similar-events-cards'}>
            {
                eventsScaffolding.slice(0,3).map((event)=> {
                    return(
                        <EventCard {...event} />
                    )
                })
            }
        </div>
        </div>
    );
}

export default SimilarEvents;