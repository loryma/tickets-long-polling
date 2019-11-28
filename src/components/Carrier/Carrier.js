import React from "react";
import classes from "./Carrier.module.css";

const Carrier = ({ carrier }) => {
  return (
    <div className={classes.Carrier}>
      <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="carrier" />
    </div>
  );
};

export default Carrier;
