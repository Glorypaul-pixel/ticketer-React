import React, { useState } from "react";
import { listTickets, deleteTicket } from "../../services/tickets";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function StatusBadge({ status }) {
  const LABEL = {
    open: ["Open", "status-open"],
    in_progress: ["In Progress", "status-progress"],
    closed: ["Closed", "status-closed"],
  };
  const [label, cls] = LABEL[status] || ["Unknown", ""];
  return <span className={`badge ${cls}`}>{label}</span>;
}

export default function Tickets() {
  const nav = useNavigate();
  const [tickets, setTickets] = useState(listTickets());

  function handleDelete(id) {
    if (!confirm("Delete this ticket? This action cannot be undone.")) return;
    try {
      deleteTicket(id);
      setTickets(listTickets());
      toast.success("Ticket deleted");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete ticket. Please retry.");
    }
  }

  return (
    <div>
      <div className="row between">
        <h2>Tickets</h2>
        <div>
          <Link to="/tickets/new" className="btn">
            Create Ticket
          </Link>
        </div>
      </div>

      <div className="grid tickets">
        {tickets.length === 0 && (
          <div className="card">No tickets yet. Create one.</div>
        )}
        {tickets.map((t) => (
          <div key={t.id} className="card ticket-card">
            <div className="ticket-header">
              <h3>{t.title}</h3>
              <StatusBadge status={t.status} />
            </div>
            <p className="muted">{t.description || <em>No description</em>}</p>
            <div className="ticket-actions">
              <button
                className="btn btn-sm"
                onClick={() => nav(`/tickets/${t.id}/edit`)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(t.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
