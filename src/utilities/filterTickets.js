function filterTickets(tickets, filters) {
  if (filters.includes("all")) {
    return tickets;
  }

  const filteredTickets = tickets.filter(ticket => {
    let fits = false;
    const [to, from] = ticket.segments;
    const maxStops =
      to.stops.length > from.stops.length ? to.stops.length : from.stops.length;
    filters.forEach(filter => {
      fits = fits || maxStops === filter;
    });
    return fits;
  });

  return filteredTickets;
}
export default filterTickets;
