import { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  function validate() {
    const e = {};
    if (!email) e.email = "Email is required";
    if (!password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    try {
      login({ email, password });
      toast.success("Logged in");
      nav("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials. Please check email and password.");
    }
  }

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!errors.password}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </label>

        <button className="btn" type="submit">
          Login
        </button>
        <p>
          Don't have an account? <Link to="/auth/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
