import "./cours.scss";
import { QuickNavigation } from "../../components/quick-navigation/quick-navigation";
import { ArrowDropDown, SearchOutlined } from "@material-ui/icons";
import { Pagination, Select } from "antd";
import React, { useEffect, useState } from "react";
import { CourseItem } from "./components/course-item";
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux'
import {getformations} from '../../redux/features/formationSlice'
import { Typography } from "antd";
import { StarSharp } from "@material-ui/icons";

 const CoursPage1 = () => {
  //const [data, setData] = useState([]);
  const formations = useSelector((state) => state.formation.formatiozn)
  const [callback, setCallback] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
                 
    dispatch(getformations())

},[dispatch]) ; 

  return (
    <div className={"cours-page"}>
      <QuickNavigation />
      <div className={"filter-container"} style={{marginLeft:'-31%'}}>
        <div className={"search-input-container"}>
          <input
            className={"search-input"}
            placeholder="Rechercher des événements"
          />
          <div className={"search-input-icon"}>
            <SearchOutlined />
          </div>
        </div>
        <div className={"search-dropdown-container"}>
          <Select
            placeholder={"N’importe quel jour"}
            className={"search-dropdown"}
            suffixIcon={
              <ArrowDropDown fontSize={"large"} style={{ color: "#334155" }} />
            }
          >
            <Select.Option value={10}>Ten</Select.Option>
            <Select.Option value={20}>Twenty</Select.Option>
            <Select.Option value={30}>Thirty</Select.Option>
          </Select>
        </div>
       
      </div>
      <div className={"courses-container"} style={{}}>
        {formations.map((formation) => {
          return  (<div key={formation?.uuid} className={"course-item"}>
      <img alt={`course ${formation?.title}`} src={formation?.url} />
      <div className={"course-info-container"}>
        <img src={formation?.user.url1} className={"course-owner-image"} />
        <Typography className={"course-name"}>{formation?.categorie}</Typography>
        <Typography className={"course-owner"}>{formation?.user.name}</Typography>
        <Typography className={"course-quote"}>{formation?.objectif}</Typography>
        <Typography className={"course-stars"}>
          {[1, 2, 3, 4, 5].map(() => {
            return <StarSharp style={{ color: "#F2AF12" }} />;
          })}
          {"\t"}(113 apprenants)
        </Typography>
        <Typography className={"course-stars"}>
          28 heures au total - 21 leçons - Tous les niveaux
        </Typography>
      </div>
    </div>)
        })}
      </div>
      <div className={"pagination-container"}>
        <Pagination
          size={"default"}
          className={"pagination"}
          total={formations.length}
        />
      </div>
    </div>
  );
};
export default CoursPage1;

