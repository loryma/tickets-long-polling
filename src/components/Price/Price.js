import React from "react";
import classes from "./Price.module.css";

const Price = ({ price }) => {
  return <div className={classes.Price}>{price} USD</div>;
};

export default Price;
