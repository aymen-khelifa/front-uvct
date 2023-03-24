import React from "react";
import "./comment-component.scss";
import { Typography } from "antd";
import { StarSharp } from "@mui/icons-material";

export const CommentComponent = ({ name }) => {
  return (
    <div className={"comment-component"}>
      <img className={"avatar"} src={"https://i.pravatar.cc/300"} alt={name} />
      <div className={"info-container"}>
        <Typography className={"user-name"}>Mercy Chinasa A.</Typography>
        <Typography>
          {[1, 2, 3, 4, 5].map(() => {
            return <StarSharp style={{ color: "#8D1630" }} />;
          })}
          <Typography.Text className={"comment-date"}>
            {"\t"} il ya 2 semaines
          </Typography.Text>
        </Typography>
        <Typography className={"comment-text"}>
          Chaque section du cours était détaillée et intéressante. Le quiz m'a
          également permis de m'assurer que j'ai réellement appris de chaque
          section et ce qui est le plus étonnant, c'est que je peux reprendre là
          où je suis parti à mon propre rythme. Mis à part la partie
          auto-évaluation, toutes les autres choses avaient du sens.
        </Typography>
      </div>
    </div>
  );
};
