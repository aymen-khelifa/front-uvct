import {Select} from "antd";
import React, {useEffect, useState} from 'react'
import "./AllEvents.scss"
import {ArrowDropDown, SearchOutlined} from "@material-ui/icons";
import {QuickNavigation} from "../../../components/quick-navigation/quick-navigation";
import {EventCard} from "../components/event-card/event-card";
import axios from "axios";
import {ChangeEvent} from "react";

export const AllEvents = () => {
    const [data, setData] =  useState([])
    const [search, setSearch] =  useState('')

    useEffect(()=> {
        axios({url: 'http://localhost:5000/events', method:'GET'})
            .then(response => {
                console.log(response.data.event)
                setData(response.data.event)
            })
    }, [])

    const handleSearchContent = (event) => {
        setSearch(event.target.value)
    }
 return(
     <div className={'events-container'}>
         <QuickNavigation/>
         <div className={'filter-container'}>
             <div className={'search-input-container'}>
                 <input onChange={handleSearchContent} className={"search-input"} placeholder="Rechercher des événements" />
                 <div className={'search-input-icon'}>
                     <SearchOutlined/>
                 </div>
             </div>
             <div className={'search-dropdown-container'}>
                     <Select
                         placeholder={'N’importe quel jour'}
                         className={'search-dropdown'}
                         suffixIcon={<ArrowDropDown fontSize={'large'} style={{color:'#334155'}}/>}
                     >
                         <Select.Option value={10}>Ten</Select.Option>
                         <Select.Option value={20}>Twenty</Select.Option>
                         <Select.Option value={30}>Thirty</Select.Option>
                     </Select>
             </div>
         </div>
         <div className={'all-events-container'} >
             {
             data.filter(item=> item.title.toLowerCase().includes(search.toLowerCase().trim())).map((event)=> {
                 return(
                    <EventCard {...event} />
                 )
             })
         }
         </div>
     </div>
 )
}

type event = {
    id: string|number,
    name: string,
    image: string,
    eventType: "Online"| "On site",
    contentCreator: string,
    date: string
}

export const eventsScaffolding : event[] = [
    {
        id: 1,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=1",
        eventType: "Online",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    },
    {
        id: 2,
        name: "JavaScript from zero to hero",
        image: "https://picsum.photos/200/300?random=2",
        eventType: "On site",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)

    },
    {
        id: 3,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=3",
        eventType: "Online",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    },
    {
        id: 4,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=4",
        eventType: "On site",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    },
    {
        id: 5,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=5",
        eventType: "Online",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    },
    {
        id: 6,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=6",
        eventType: "Online",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    },
    {
        id: 7,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=7",
        eventType: "Online",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    },
    {
        id: 8,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=8",
        eventType: "Online",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    },
    {
        id: 9,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=9",
        eventType: "Online",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    },
    {
        id:10,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=10",
        eventType: "Online",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    },
    {
        id: 11,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=11",
        eventType: "Online",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    },
    {
        id : 12,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=12",
        eventType: "Online",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    },
    {
        id: 13,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=13",
        eventType: "Online",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    },
    {
        id:14,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=14",
        eventType: "Online",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    },
    {
        id:15,
        name: "Selling from A to Z",
        image: "https://picsum.photos/200/300?random=15 ",
        eventType: "Online",
        contentCreator: "Ahmed Sbai",
        date: new Date().toISOString().substring(0,10)
    }
]
