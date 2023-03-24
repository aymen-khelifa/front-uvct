import React from 'react';
import { Nav} from 'react-bootstrap';
import './Menu.css';

function Menu(props) {
  return (
    <Nav.Link href={props.lien} className='nav-menu-link' style={{color:"white"}}>{props.menu}</Nav.Link> 
    )
}

export default Menu