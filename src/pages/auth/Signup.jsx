import React, { useState } from "react";
import { signup } from "../../services/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  function validate() {
    const e = {};
    if (!email) e.email = "Email is required";
    if (!password) e.password = "Password is required";
    if (password && password.length < 8)
      e.password = "Password must be at least 8 characters";
    if (password !== confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!validate()) return;
    try {
      signup({ email, password });
      toast.success("Account created — logged in");
      nav("/dashboard");
    } catch (err) {
      if (err.code === "USER_EXISTS")
        toast.error("A user with that email already exists");
      else toast.error("Failed to create account");
    }
  }

  return (
    <div className="auth-card">
      <h2>Sign up</h2>
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

        <label>
          Confirm Password
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            aria-invalid={!!errors.confirm}
          />
          {errors.confirm && <div className="error">{errors.confirm}</div>}
        </label>

        <button className="btn" type="submit">
          Create account
        </button>
        <p>
          Already have an account? <Link to="/auth/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
