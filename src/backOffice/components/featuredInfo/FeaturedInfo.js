import React from 'react';
import './FeaturedInfo.css';
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

export default function FeaturedInfo() {
  return (
    <div className='featured'>
        <div className='featuredItems'>
            <div className='featuredTitleContent'>
                <span className='featuredTitle'>REVENU</span>
                <MonetizationOnIcon className='featuredIcon'/>
            </div>
        <div className='featuredNumberContainer'>
            <span className='featuredNumber'>13,456</span>
            <span className='featuredPercentUp'>43%</span>
            <TrendingUpIcon className='trendingUpIcon'/>
        </div>
        <span className='featuredSousTitle'>Par rapport au mois précédent</span>
    </div>
        <div className='featuredItems'>
            <div className='featuredTitleContent'>
                <span className='featuredTitle'>PROFIT</span>
                <ShowChartIcon className='featuredIcon'/>
            </div>
            <div className='featuredNumberContainer'>
                <span className='featuredNumber'>4,145</span>
                <span className='featuredPercentUp'>5%</span>
                <TrendingUpIcon className='trendingUpIcon'/>
        </div>
        <span className='featuredSousTitle'>Par rapport au mois précédent</span>
    </div>
        <div className='featuredItems'>
            <div className='featuredTitleContent'>
                <span className='featuredTitle'>COUPONS USAGE </span>
                <AttachMoneyIcon className='featuredIcon'/>
            </div>
            <div className='featuredNumberContainer'>
                <span className='featuredNumber'>251</span>
                <span className='featuredPercentUp'>18%</span>
                <TrendingUpIcon className='trendingUpIcon'/>
            </div>
            <span className='featuredSousTitle'>Par rapport au mois précédent</span>
        </div>
        <div className='featuredItems'>
            <div className='featuredTitleContent'>
                <span className='featuredTitle'>NOUVEAUX APPRENANTS</span>
                <GroupAddIcon className='featuredIcon'/>
            </div>
            <div className='featuredNumberContainer'>
                <span className='featuredNumber'>188</span>
                <span className='featuredPercentDown'>-30%</span>
                <TrendingDownIcon className='trendingDownIcon'/>
            </div>
            <span className='featuredSousTitle'>Par rapport au mois précédent</span>
        </div>
   </div>
  )
}
