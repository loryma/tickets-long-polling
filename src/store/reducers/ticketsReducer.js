function ticketsReducer(state, action) {
  switch (action.type) {
    case "ADD_TICKETS":
      return [...state, ...action.tickets];
    default:
      return state;
  }
}

export default ticketsReducer;
