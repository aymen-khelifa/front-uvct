import "./course-item.scss";
import { Typography } from "antd";
import React from "react";
import { StarSharp } from "@material-ui/icons";

export const CourseItem = ({
  _id,
  affiche,
  title,
  postedBy,
  prix,
  objectif,
}) => {
  return (
    <div key={_id} className={"course-item"}>
      <img alt={`course ${title}`} src={affiche} />
      <div className={"course-info-container"}>
        <img src={affiche} className={"course-owner-image"} />
        <Typography className={"course-name"}>{title}</Typography>
        <Typography className={"course-owner"}>{postedBy}</Typography>
        <Typography className={"course-quote"}>{objectif}</Typography>
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
    </div>
  );
};
