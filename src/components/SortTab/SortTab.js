import React from "react";
import classes from "./SortTab.module.css";

const SortTab = ({ children }) => {
  return <div className={classes.SortTab}>{children}</div>;
};

export default SortTab;
