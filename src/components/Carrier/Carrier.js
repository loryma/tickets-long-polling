import React from "react";

const Carrier = ({ carrier }) => {
  return (
    <div>
      <img src={`https://pics.avs.io/99/36/${carrier}.png`} alt="carrier" />
    </div>
  );
};

export default Carrier;
