import {Button, Card, Typography} from "antd";
import React from "react"
import {ShoppingCart} from "@material-ui/icons";
import './event-card.scss'
import '../../allEvents/AllEvents.scss'
import {Link} from "react-router-dom";

export const EventCard = ({_id, affiche, dateStart, enLigne, title, postedBy}) => {
 return (
     <React.Fragment key={_id}>
        <Card className={`event-card`}
              hoverable
              cover={<img height={224} style={{objectFit: "cover"}} alt="example" src={affiche} />}
              bordered={false}
        >
            <Typography className={'event-date-type-text'}>{dateStart.substr(0,10)} - {enLigne? 'on ligne': 'sur site'}{'\n'}</Typography>
            <Typography className={'title'}>{title}</Typography>
            <Typography className={'content-creator'}>{postedBy}</Typography>
            <div className={'card-footer'}>
                <Link to={'/event/'+_id}>
                    <Button className={'event-details-info'}>Plus d'information</Button>
                </Link>
                <Button icon={<ShoppingCart/>} className={'price-details-info'}/>
            </div>
        </Card>
    </React.Fragment>
 )
}
