import { Typography } from "antd";
import "./rating-component.scss";
import { StarSharp } from "@material-ui/icons";

export const RatingComponent = () => {
  return (
    <div className={"rating-component"}>
      <div>
        <Typography className={"total-rating"}>4.5</Typography>
        <Typography>
          {[1, 2, 3, 4, 5].map(() => {
            return <StarSharp style={{ color: "#8D1630" }} />;
          })}{" "}
          <Typography.Text className={"total-rating-count"}>
            ({ratingBars.reduce((a, b) => a + b)})
          </Typography.Text>
        </Typography>
      </div>
      <div style={{ paddingLeft: 55 }}>
        {ratingBars.map((bar, index) => {
          return (
            <div
              style={{
                flexDirection: "row",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Typography>{index + 1}</Typography>
              <div
                style={{
                  width: 400,
                  height: 16,
                  position: "relative",
                  backgroundColor: "#CCCCCC",
                  marginInline: 10,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    height: 16,
                    width: `${
                      (bar * 100) / ratingBars.reduce((a, b) => a + b)
                    }%`,
                    backgroundColor: "#8D1630",
                  }}
                />
              </div>
              <Typography>{bar}</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ratingBars = [30, 20, 50, 20, 100];
