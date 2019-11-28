import React from "react";
import classes from "./TicketData.module.css";

const TicketData = ({ header, data }) => {
  return (
    <div>
      <div className={classes.Title}>{header}</div>
      <div className={classes.Data}>{data}</div>
    </div>
  );
};

export default TicketData;
