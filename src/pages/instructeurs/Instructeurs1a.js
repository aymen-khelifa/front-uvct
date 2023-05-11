import {Select} from "antd";
import React ,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {getInstructeur, userSelectors} from '../../redux/features/usersSlice'

import {ArrowDropDown, SearchOutlined} from "@material-ui/icons";
import {QuickNavigation} from "../../components/quick-navigation/quick-navigation";
import InstructeurCard from "./components/instructeurCard";
import './instructors.scss'
import {Avatar, Typography} from 'antd';
import './components/instructeurCard.scss'
import {Link} from "react-router-dom";
import {MenuBookOutlined} from "@mui/icons-material";
  const Instructeurs1a = () => {

    const users = useSelector(state => state.user.instructeurs)
    const dispatch = useDispatch()
    useEffect(() => {
       
              
                  dispatch(getInstructeur())
              
       
        },[dispatch])
console.log(users)



 return(
     <div className={'instructors-container'} style={{width: '120%',marginTop: '-3.5%',backgroundColor:'#FFFFFF'}}>
         <QuickNavigation/>
         <div className={'filter-container'} style={{marginLeft: '10%'}} >
             <div className={'search-input-container'}>
                 <input className={"search-input"} placeholder="Rechercher des instructeurs" />
                 <div className={'search-input-icon'}>
                     <SearchOutlined/>
                 </div>
             </div>
             <div className={'search-dropdown-container'}>
                     <Select
                         placeholder={'N’importe quel catégorie'}
                         className={'search-dropdown'}
                         suffixIcon={<ArrowDropDown fontSize={'large'} style={{color:'#334155'}}/>}
                     >
                         <Select.Option value={10}>Marketing</Select.Option>
                         <Select.Option value={20}>Dévéloppement web</Select.Option>
                         <Select.Option value={30}>Dévéloppement mobile</Select.Option>
                         <Select.Option value={30}>Musique</Select.Option>
                         <Select.Option value={30}>Informatique</Select.Option>
                     </Select>
             </div>


         </div>
         <div className={'all-instructors-container'} style={{marginLeft:'10%'}} >
             {
                users.map((user)=> {
                     return(
                         <Link to="/instructeurDet">
                       <div className='instructeurCard'>
                       <img shape={'square'} className={'avatar'} alt="image" src={user?.url1}/>
                             <div className={'info-container'}> 
                             <h6 className={'name'}>{user?.name}</h6>
                         <h6 className={'job-title'}>{user?.speciality}</h6>
                        
                         <h6 className={'nbr-courses-applicants'}><MenuBookOutlined /> </h6>
                         <h6 className={'nbr-courses-applicants'}>12 115 apprenants</h6>
          </div>
        </div>
      </Link>
                     )
                 })
             }
         </div>
     </div>
 )
}

export default Instructeurs1a




