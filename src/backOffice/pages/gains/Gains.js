import React from 'react'
import Chart from '../../components/chart/Chart'
import {userData} from '../../components/chart/userData';
import "./Gains.css"

function Gains() {
  return (
    <div className='gains'>
    <h2>Mes gains</h2>
        <Chart data={userData} grid dataKey="Active User"/>
    </div>
  )
}

export default Gains