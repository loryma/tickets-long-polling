function sortTickets(tickets, parameter) {
  if (parameter) {
    if (parameter === "cheapest") {
      return [...tickets].sort((a, b) => a.price - b.price).slice(0, 5);
    } else {
      return [...tickets]
        .sort(
          (a, b) =>
            a.segments[0].duration +
            a.segments[1].duration -
            (b.segments[0].duration + b.segments[1].duration)
        )
        .slice(0, 5);
    }
  } else {
    return tickets.slice(0, 5);
  }
}

export default sortTickets;
