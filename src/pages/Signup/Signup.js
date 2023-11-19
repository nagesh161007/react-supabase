import React, { useState, useEffect } from "react";
import supabase from "../../utils/supabase";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import "./Signup.css";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const passwordsMatch = password === retypePassword && password !== "";

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    const { user, error } = await supabase.auth.signUp(
      {
        email,
        password
      },
      {
        data: {
          username
        }
      }
    );

    if (error) {
      setError(error.message);
    } else {
      navigate("/");
      console.log("Signed up user:", user);
      // You can redirect or perform further actions here
    }
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSignup}>
        <div className="form-title">THRIFT EXCHANGE</div>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <label htmlFor="retype-password">Retype Password</label>
        <input
          id="retype-password"
          type="password"
          value={retypePassword}
          onChange={(e) => setRetypePassword(e.target.value)}
          placeholder="Retype Password"
          required
        />

        <Button
          type="primary"
          className="signup-form-button"
          disabled={!passwordsMatch}
        >
          Sign Up
        </Button>
        {error && <p>{error}</p>}
        <div className="alternative-option">
          Already have an cccount <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
