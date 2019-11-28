# Aviasales React app

Deployed at https://tickets-long-polling.netlify.com/

[![Netlify Status](https://api.netlify.com/api/v1/badges/f7a4f930-607a-44a1-82bf-4c8fb75e4e34/deploy-status)](https://app.netlify.com/sites/tickets-long-polling/deploys)

**features**

- filter tickets by number of stops
- sort tickets price, duration of flight

**Implementation details**

- Tickets are fetched from server with long polling
- After every request next one is made until server returns json with `true` stop property
- axios is used to make HTTP requests
- requests initiated on page load within `useEffect` hook
- fetched tickets are appended to previosly fetches tickets using `useReducer` hook
