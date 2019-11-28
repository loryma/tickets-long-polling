import React, { useState, useEffect, useReducer, Suspense } from "react";
import axios from "axios";
import ticketsReducer from "./store/reducers/ticketsReducer";

import Header from "./components/Hero/Hero";

import Filter from "./components/Filter/Filter";

import filterTickets from "./utilities/filterTickets";
import sortTickets from "./utilities/sortTickets";
import FiltersTab from "./components/FiltersTab/FiltersTab";
import SortTab from "./components/SortTab/SortTab";
import TicketsMainTab from "./components/TicketsMainTab/TicketsMainTab";
import TicketsList from "./components/TicketsList/TicketsList";

import Sort from "./components/Sort/Sort";
import Spinner from "./components/Spinner/Spinner";

import "./App.css";

const FILTERS = [
  ["all", "all"],
  ["No stops", 0],
  ["One stop", 1],
  ["Two stops", 2],
  ["Three stops", 3]
];

const SORT_FILTERS = ["cheapest", "fastest"];

function App() {
  const [tickets, dispatch] = useReducer(ticketsReducer, [
    // {
    //   // Цена в рублях
    //   price: 1700,
    //   // Код авиакомпании (iata)
    //   carrier: "ffdfd",
    //   // Массив перелётов.
    //   // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
    //   segments: [
    //     {
    //       // Код города (iata)
    //       origin: "HKT",
    //       // Код города (iata)
    //       destination: "NYC",
    //       // Дата и время вылета туда
    //       date: "2019-12-17T03:24:00Z",
    //       // Массив кодов (iata) городов с пересадками
    //       stops: ["BAR", "LON"],
    //       // Общее время перелёта в минутах
    //       duration: 720
    //     },
    //     {
    //       // Код города (iata)
    //       origin: "NYC",
    //       // Код города (iata)
    //       destination: "HKT",
    //       // Дата и время вылета обратно
    //       date: "2020-12-17T03:24:00Z",
    //       // Массив кодов (iata) городов с пересадками
    //       stops: ["MON", "LON"],
    //       // Общее время перелёта в минутах
    //       duration: 680
    //     }
    //   ]
    // },
    // {
    //   // Цена в рублях
    //   price: 1000,
    //   // Код авиакомпании (iata)
    //   carrier: "ffdfd",
    //   // Массив перелётов.
    //   // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
    //   segments: [
    //     {
    //       // Код города (iata)
    //       origin: "PAR",
    //       // Код города (iata)
    //       destination: "NYC",
    //       // Дата и время вылета туда
    //       date: "2019-12-17T03:24:00Z",
    //       // Массив кодов (iata) городов с пересадками
    //       stops: ["LON"],
    //       // Общее время перелёта в минутах
    //       duration: 1720
    //     },
    //     {
    //       // Код города (iata)
    //       origin: "NYC",
    //       // Код города (iata)
    //       destination: "PAR",
    //       // Дата и время вылета обратно
    //       date: "2020-03-17T11:24:00Z",
    //       // Массив кодов (iata) городов с пересадками
    //       stops: [],
    //       // Общее время перелёта в минутах
    //       duration: 480
    //     }
    //   ]
    // }
  ]);

  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    fetchSearchId();
    console.log("called fetch");
  }, []);

  const filteredTickets = filters.length
    ? filterTickets(tickets, filters)
    : tickets;

  const sortedTickets = sortTickets(filteredTickets, sort);

  const onFilterChange = (filter, e) => {
    const added = e.target.checked;
    if (added) {
      setFilters(state => [...state, filter]);
    } else {
      setFilters(state => [...state].filter(f => f !== filter));
    }
  };

  const onSortChange = parameter => {
    setSort(state => parameter);
  };

  const filterList = FILTERS.map(([text, value]) => (
    <Filter
      key={text}
      text={text}
      onChange={onFilterChange.bind(this, value)}
    />
  ));

  const sortList = SORT_FILTERS.map(s => (
    <Sort key={s} active={s === sort} onSortChange={onSortChange.bind(this, s)}>
      {s}
    </Sort>
  ));

  async function fetchSearchId() {
    const { data } = await axios("https://front-test.beta.aviasales.ru/search");
    console.log(data, data.searchId);

    fetchTickets(data.searchId);
  }
  async function fetchTickets(id) {
    try {
      // await new Promise((resolve, reject) => setTimeout(resolve, 4000));
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
      if (error.status === 500) {
        await fetchTickets(id);
      } else {
        setTimeout(async () => {
          await fetchTickets(id);
        }, 1000);
      }
    }
  }
  return (
    <div className="App">
      <Header />
      <div className="App__content">
        <FiltersTab>{filterList}</FiltersTab>
        <TicketsMainTab>
          <SortTab>{sortList}</SortTab>
          {sortedTickets && sortedTickets.length > 0 ? (
            <TicketsList tickets={sortedTickets} />
          ) : (
            <Spinner />
          )}
        </TicketsMainTab>
      </div>
    </div>
  );
}

export default App;
