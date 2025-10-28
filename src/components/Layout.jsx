import React from "react";
import { Link } from "react-router-dom";
import { getSession, clearSession } from "../utils/session";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
//   const loc = useLocation();
  const session = getSession();
  const nav = useNavigate();

  function handleLogout() {
    clearSession();
    nav("/");
  }

  return (
    <div className="app-root">
      <header className="site-header">
        <div className="container">
          <div className="brand">
            <Link to="/" aria-label="TicketApp Home">
              TicketApp
            </Link>
          </div>
          <nav className="nav">
            <Link to="/">Home</Link>
            {session?.token && <Link to="/dashboard">Dashboard</Link>}
            {session?.token && <Link to="/tickets">Tickets</Link>}
          </nav>
          <div className="auth">
            {!session?.token ? (
              <Link to="/auth/login" className="btn btn-ghost">
                Login
              </Link>
            ) : (
              <>
                <span className="user">{session.user?.email || ""}</span>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container main">{children}</main>

      <footer className="site-footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} TicketApp — accessible ticket
            management
          </p>
        </div>
      </footer>
    </div>
  );
}
