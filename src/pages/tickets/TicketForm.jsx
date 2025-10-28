import  { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast'
import {
  createTicket,
  updateTicket,
  getTicket,
} from "../../services/tickets";

const VALID_STATUSES = ["open", "in_progress", "closed"];

export default function TicketForm({ editMode = false }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState("");
  const [errors, setErrors] = useState({});
  const nav = useNavigate();
  const { id } = useParams();

  // ✅ Only run when editing an existing ticket
  useEffect(() => {
    if (editMode && id) {
      const ticket = getTicket(id);
      if (ticket) {
        setTitle(ticket.title);
        setDescription(ticket.description || "");
        setStatus(ticket.status);
        setPriority(ticket.priority || "");
      }
    }
  }, [editMode, id]);

  function validate() {
    const e = {};
    if (!title || title.trim() === "") e.title = "Title is required";
    if (!VALID_STATUSES.includes(status)) e.status = "Invalid status";
    if (description && description.length > 2000)
      e.description = "Description too long";
    if (
      priority &&
      !(
        ["low", "medium", "high"].includes(priority) ||
        (!isNaN(Number(priority)) &&
          Number(priority) >= 1 &&
          Number(priority) <= 5)
      )
    )
      e.priority = "Invalid priority";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    try {
      if (editMode) {
        updateTicket(id, {
          title: title.trim(),
          description: description.trim(),
          status,
          priority: priority || null,
        });
        toast.success("Ticket updated");
      } else {
        createTicket({
          title: title.trim(),
          description: description.trim(),
          status,
          priority: priority || null,
        });
        toast.success("Ticket created");
      }
      nav("/tickets");
    } catch (err) {
      toast.error(err.message || "Failed to save ticket");
    }
  }

  return (
    <div className="card form-card">
      <h2>{editMode ? "Edit Ticket" : "Create Ticket"}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={!!errors.title}
          />
          {errors.title && <div className="error">{errors.title}</div>}
        </label>

        <label>
          Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-invalid={!!errors.status}
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          {errors.status && <div className="error">{errors.status}</div>}
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
          />
          {errors.description && (
            <div className="error">{errors.description}</div>
          )}
        </label>

        <label>
          Priority (low, medium, high or 1–5)
          <input
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
          {errors.priority && <div className="error">{errors.priority}</div>}
        </label>

        <div className="row">
          <button className="btn" type="submit">
            Save
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => nav("/tickets")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
