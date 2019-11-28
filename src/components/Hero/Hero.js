import React from "react";
import Logo from "./Logo.svg";
import classes from "./Hero.module.css";

const Hero = () => {
  return (
    <div className={classes.Hero}>
      <img src={Logo} alt="logo" />
    </div>
  );
};

export default Hero;
