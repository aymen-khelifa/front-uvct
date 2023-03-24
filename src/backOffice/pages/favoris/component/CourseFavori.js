import { StarSharp } from '@material-ui/icons'
import { Card, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import "./CourseFavori.css"
import FavoriteIcon from '@material-ui/icons/Favorite';

function CourseFavori(props) {
  return (
    <React.Fragment key={props.id}>
        <Card className="course-card"
              hoverable
              cover={<img height={200} style={{objectFit: "cover"}} alt="example" src={props.image} />}
              bordered={false}
        >
         <Link to={'/event/'+props.id}>
         <Typography className="course-title">{props.name}</Typography>
         </Link>
            <Typography className="course-creator">{props.contentCreator}</Typography>
            <Typography className="course-stars">
                {[1,2,3,4,5].map(()=> {
                    return <StarSharp style={{color:'#F2AF12'}}/>
                })}
                {'\t'}(113 apprenants)
            </Typography>
            <Typography className="course-stars">
                28 heures au total - 21 leçons - Tous les niveaux
            </Typography>
            <div className='course-detl'>
            <Typography className="course-title">499 TND</Typography>
            <FavoriteIcon className='icon-favori'/>
            </div>
        </Card>
    </React.Fragment>
  )
}

export default CourseFavori