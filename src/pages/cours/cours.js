import "./cours.scss";
import { QuickNavigation } from "../../components/quick-navigation/quick-navigation";
import { ArrowDropDown, SearchOutlined } from "@material-ui/icons";
import { Pagination, Select } from "antd";
import React, { useEffect, useState } from "react";
import { CourseItem } from "./components/course-item";
import axios from "axios";

export const CoursPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({ url: "http://localhost:5000/formations", method: "GET" })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch();
  }, []);

  return (
    <div className={"cours-page"}>
      <QuickNavigation />
      <div className={"filter-container"}>
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
      <div className={"courses-container"}>
        {data.map((course) => {
          return <CourseItem {...course} />;
        })}
      </div>
      <div className={"pagination-container"}>
        <Pagination
          size={"default"}
          className={"pagination"}
          total={data.length}
        />
      </div>
    </div>
  );
};
