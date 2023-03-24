import React from 'react'
import {Button, Typography} from "antd";
import { Progress } from 'antd';
import { Divider, Popover } from '@material-ui/core';
import { Nav } from 'react-bootstrap';
import './MyCours.css'

function MyCours(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id= open ? 'simple-popover' : undefined;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose1 = () => {
      setAnchorEl(null);
    };
  return (
    <div className={'course-item'}>
        <img alt="" src={props.image}/>
        <div className={'course-info-container'}>
            <Typography className={'course-owner'}>Organisé par {props.contentCreator}</Typography>
            <Typography className={'course-name'}>{props.name}</Typography>
            <Progress percent={props.percent} status={props.status} />
        </div>
        <div className='course-action'>
        <Button aria-describedby={id} className="btn-course-action" onClick={handleClick}>⋮</Button>
                    <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose1}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                        <Nav.Link className="actionNav">Aller à la page</Nav.Link>
                        <Divider />
                        <Nav.Link className="actionNav" >Partager la formation</Nav.Link>
                        <Divider />
                        <Nav.Link className="actionNav" >Évaluer la formation</Nav.Link>
                    </Popover> 
        </div>
    </div>
  )
}
export default MyCours