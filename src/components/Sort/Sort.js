import React from "react";

import classes from "./Sort.module.css";

const Sort = ({ active, onSortChange, children }) => {
  const sortClasses = [classes.Sort, active ? classes.Active : ""].join(" ");
  return (
    <div className={sortClasses} onClick={onSortChange}>
      {children}
    </div>
  );
};

export default Sort;
