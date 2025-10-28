const KEY = "ticketapp_tickets";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch (e) {
    console.log(e);

    return [];
  }
}
function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

const VALID_STATUSES = ["open", "in_progress", "closed"];

export function listTickets() {
  return load();
}

export function getTicket(id) {
  return load().find((t) => t.id === id);
}

export function createTicket(payload) {

  if (!payload.title) throw new Error("Title is required");
  if (!VALID_STATUSES.includes(payload.status))
    throw new Error("Invalid status");
  const tickets = load();
  const ticket = {
    id: Date.now().toString(),
    title: payload.title,
    description: payload.description || "",
    status: payload.status,
    priority: payload.priority || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  tickets.unshift(ticket);
  save(tickets);
  return ticket;
}

export function updateTicket(id, patch) {
  const tickets = load();
  const idx = tickets.findIndex((t) => t.id === id);
  if (idx === -1) throw new Error("Ticket not found");
  if (patch.title === undefined || patch.title === "")
    throw new Error("Title is required");
  if (patch.status && !VALID_STATUSES.includes(patch.status))
    throw new Error("Invalid status");
  tickets[idx] = {
    ...tickets[idx],
    ...patch,
    updated_at: new Date().toISOString(),
  };
  save(tickets);
  return tickets[idx];
}

export function deleteTicket(id) {
  const tickets = load().filter((t) => t.id !== id);
  save(tickets);
  return true;
}
