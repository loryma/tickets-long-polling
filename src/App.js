import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import ticketsReducer from "./store/reducers/ticketsReducer";

import TicketsMainTab from "./components/TicketsMainTab/TicketsMainTab";
import TicketsList from "./components/TicketsList/TicketsList";
import Filter from "./components/Filter/Filter";

import filterTickets from "./utilities/filterTickets";
import "./App.css";
import FiltersTab from "./components/FiltersTab/FiltersTab";

const FILTERS = [
  ["all", "all"],
  ["No stops", 0],
  ["One stop", 1],
  ["Two stops", 2],
  ["Three stops", 3]
];

function App() {
  const [tickets, dispatch] = useReducer(ticketsReducer, []);
  const [filters, setFilters] = useState([]);

  const filteredTickets = filters.length
    ? filterTickets(tickets, filters)
    : tickets;

  const onFilterChange = (filter, e) => {
    const added = e.target.checked;
    if (added) {
      setFilters(state => [...filters, filter]);
    } else {
      setFilters(state => [...filters].filter(f => f !== filter));
    }
  };

  const filterList = FILTERS.map(([text, value]) => (
    <Filter
      key={text}
      text={text}
      onChange={onFilterChange.bind(this, value)}
    />
  ));

  // useEffect(() => {
  //   fetchSearchId();
  //   console.log("called fetch");
  // }, []);

  async function fetchSearchId() {
    const { data } = await axios("https://front-test.beta.aviasales.ru/search");
    console.log(data, data.searchId);

    fetchTickets(data.searchId);
  }
  async function fetchTickets(id) {
    try {
      const res = await axios.get(
        `https://front-test.beta.aviasales.ru/tickets?searchId=${id}`
      );
      console.log(res);
      if (res.status === 200 && res.data.tickets) {
        dispatch({ type: "ADD_TICKETS", tickets: res.data.tickets });

        if (!res.data.stop) {
          await fetchTickets(id);
        }
      }
    } catch (error) {
      console.log(error);
      await fetchTickets(id);
    }
  }
  return (
    <div className="App">
      <FiltersTab>{filterList}</FiltersTab>
      <TicketsMainTab>
        {/* <TicketsList tickets={filteredTickets} /> */}
      </TicketsMainTab>
    </div>
  );
}

export default App;
