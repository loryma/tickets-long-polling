import React from "react";
import classes from "./Filter.module.css";

const Filter = ({ onChange, text, checked }) => {
  return (
    <label className={classes.Filter}>
      <div className={classes.CheckboxWrapper}>
        <input
          className={classes.Checkbox}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <span className={classes.Checkmark}></span>
      </div>

      <span className={classes.Text}>{text}</span>
    </label>
  );
};

export default Filter;
