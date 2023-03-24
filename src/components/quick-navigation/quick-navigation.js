import {Typography} from "antd";
import './quick-navigation.scss'
import {Link} from "react-router-dom";
import {Fragment} from "react";

export const QuickNavigation = ({inverted =false}) => {
    // you can pass inverted to make the text color white
  return(
      <div className={'quick-navigation'}>
          <div className={'container'}>
              {
                  routes.map((route, index)=> {
                      return (
                          <Fragment key={index}> 
                           <Link to={route.route}>
                              <Typography style={{color: inverted && 'white'}} className={'text'}>{route.name}</Typography>
                           </Link>
                          </Fragment>

                      )
                  })
              }
          </div>

      </div>
  )
}

const routes = [
    {name: "Accueil", route: "/"},
    {name: "Cours", route: "/cours"},
    {name: "Instructeurs", route: "/allInstructeurs"},
    {name: "Événements", route: "/events"},
    {name: "Offres", route: "/"},
    {name: "À propos", route: "/"},
    {name: "Blog", route: "/"},
    {name: "Contact", route: "/"},
]
