import { Link } from "react-router-dom";
import HeroImg from "../assets/hero-wave.svg"
export default function Landing() {
  return (
    <section className="hero">
      <div className="hero-inner container">
        <div className="hero-content">
          <h1>TicketApp</h1>
          <p className="tagline">
            Manage support tickets with speed — create, track, and resolve.
          </p>
          <div className="cta">
            <Link to="/auth/login" className="btn">
              Login
            </Link>
            <Link to="/auth/signup" className="btn btn-outline">
              Get Started
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-hidden>
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <img src={HeroImg} alt="wave" className="hero-wave" />
        </div>
      </div>

      <div className="features container">
        <div className="card">
          <h3>Fast Ticketing</h3>
          <p>
            Quickly create and assign tickets with validation and status
            tracking.
          </p>
        </div>
        <div className="card">
          <h3>Secure Sessions</h3>
          <p>Auth simulated with secure session tokens in localStorage.</p>
        </div>
        <div className="card">
          <h3>Accessible</h3>
          <p>
            Built with semantic HTML, visible focus, and color contrast in mind.
          </p>
        </div>
      </div>
    </section>
  );
}
