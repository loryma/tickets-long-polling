# Aviasales React app

**features**

- filter tickets by number of stops
- sort tickets price, duration of flight

**Implementation details**

- Tickets are fetched from server with long polling
- After every request next one is made until server returns json with `true` stop property
- axios is used to make HTTP requests
- requests initiated on page load within `useEffect` hook
- fetched tickets are appended to previosly fetches tickets using `useReducer` hook
