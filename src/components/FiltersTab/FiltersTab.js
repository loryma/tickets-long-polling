import React from "react";

import classes from "./FiltersTab.module.css";

const FiltersTab = ({ children }) => {
  return (
    <div className={classes.FiltersTab}>
      <h2 className={classes.Header}>Stops</h2>
      {children}
    </div>
  );
};

export default FiltersTab;
