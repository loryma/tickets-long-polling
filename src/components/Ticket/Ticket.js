import React from "react";
import Price from "../Price/Price";
import Carrier from "../Carrier/Carrier";
import TicketData from "../TicketData/TicketData";

import classes from "./Ticket.module.css";

const Ticket = ({ price, carrier, segments }) => {
  const toOrigDest = `${segments[0].origin} - ${segments[0].destination}`;
  const fromOrigDest = `${segments[1].origin} - ${segments[1].destination}`;

  const toTime = `${getTime(segments[0].date)} - ${getArrivalTime(
    segments[0].date,
    segments[0].duration
  )}`;
  const fromTime = `${getTime(segments[1].date)} - ${getArrivalTime(
    segments[1].date,
    segments[1].duration
  )}`;

  const toDuration = `${segments[0].duration}`;
  const fromDuration = `${segments[1].duration}`;

  const toStopsCount = segments[0].stops.length;
  const fromStopsCount = segments[1].stops.length;

  const toStopsNumber = `${toStopsCount} stop${toStopsCount > 1 ? "s" : ""}`;
  const fromStopsNumber = `${fromStopsCount} stop${
    fromStopsCount > 1 ? "s" : ""
  }`;

  const toStops = getStops(segments[0].stops);
  const fromStops = getStops(segments[1].stops);

  function getTime(date) {
    const time = date.match(/T(\d{2}):(\d{2})/);
    return time[1] + ":" + time[2];
  }

  function getArrivalTime(date, duration) {
    let time = new Date(date);

    time.setMinutes(time.getMinutes() + Number(duration));

    const arrival = time.toJSON().match(/T(\d{2}):(\d{2})/);

    return arrival[1] + ":" + arrival[2];
  }

  function getStops(stops) {
    return stops.length
      ? stops.reduce((acc, stop) => acc + ", " + stop)
      : "None";
  }

  return (
    <div className={classes.Ticket}>
      <div className={classes.Header}>
        <Price price={price} />
        <Carrier carrier={carrier} />
      </div>
      <div className={classes.Content}>
        <TicketData header={toOrigDest} data={toTime} />
        <TicketData header="duration" data={toDuration} />
        <TicketData header={toStopsNumber} data={toStops} />
        <TicketData header={fromOrigDest} data={fromTime} />
        <TicketData header="duration" data={fromDuration} />
        <TicketData header={fromStopsNumber} data={fromStops} />
      </div>
    </div>
  );
};

export default Ticket;
