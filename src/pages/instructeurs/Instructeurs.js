import {Select} from "antd";
import React from 'react'
import {ArrowDropDown, SearchOutlined} from "@material-ui/icons";
import {QuickNavigation} from "../../components/quick-navigation/quick-navigation";
import InstructeurCard from "./components/instructeurCard";
import './instructors.scss'

export const Instructeurs1 = () => {
 return(
     <div className={'instructors-container'}>
         <QuickNavigation/>
         <div className={'filter-container'} >
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
         <div className={'all-instructors-container'} >
             {
                 [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(()=> {
                     return(
                         <InstructeurCard />
                     )
                 })
             }
         </div>
     </div>
 )
}



