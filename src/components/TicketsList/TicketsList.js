import React from "react";
import Ticket from "../Ticket/Ticket";

const TicketsList = ({ tickets }) => {
  const list = tickets.map(ticket => <Ticket {...ticket} />);
  return list;
};

export default TicketsList;
