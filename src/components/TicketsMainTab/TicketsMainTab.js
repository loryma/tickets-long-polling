import React from "react";
import classes from "./TicketsMainTab.module.css";

const TicketsMainTab = ({ children }) => {
  return <div className={classes.TicketsMainTab}>{children}</div>;
};

export default TicketsMainTab;
