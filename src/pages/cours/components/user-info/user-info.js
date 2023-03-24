import React from "react";
import './user-info.scss'
import {Typography} from "antd";
import {Group, MenuBookOutlined} from "@mui/icons-material";

export const UserInfo = () => {
  return(
      <div className={'user-info'}>
          <img src={'https://i.pravatar.cc/300'} className={'user-avatar'} alt={'avatar'}/>
          <div className={'info-container'}>
              <Typography className={'job-title'}>Business & développement personel</Typography>
              <Typography className={'name'}>Omar Abdelrahman</Typography>
              <Typography className={'nbr-courses'}><MenuBookOutlined /> 6 cours </Typography>
              <Typography className={'nbr-courses'}><Group />12 115 apprenants</Typography>
          </div>
      </div>
  )
}
