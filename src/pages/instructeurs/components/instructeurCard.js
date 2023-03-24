import React from 'react';
import {Avatar, Typography} from 'antd';
import './instructeurCard.scss'
import {Link} from "react-router-dom";
import {MenuBookOutlined} from "@mui/icons-material";

function InstructeurCard() {
  return (
      <Link to="/instructeurDet">
        <div className='instructeurCard'>
          <Avatar shape={'square'} className={'avatar'} src="https://joeschmoe.io/api/v1/random" />
          <div className={'info-container'}>
            <Typography className={'job-title'}>Ingénieur logiciel</Typography>
            <Typography className={'name'}>Giana Korsgaard</Typography>
            <Typography className={'nbr-courses-applicants'}><MenuBookOutlined /> 2 cours </Typography>
            <Typography className={'nbr-courses-applicants'}>12 115 apprenants</Typography>
          </div>
        </div>
      </Link>
)
}

export default InstructeurCard
