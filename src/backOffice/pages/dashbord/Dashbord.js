import React from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import {userData} from '../../components/chart/userData';
import './Dashbord.css'

function Dashbord() {
  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart data={userData} title="Nombre d'utilisateurs actifs" grid dataKey="Active User"/>
      <div className='homeWidgets'>
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}

export default Dashbord