import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@/styles/Login.scss";
import APIClient from "@/utils/APIClient";
import { setLogin } from "@/redux/features/authSlice";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await APIClient.post(`/auth/login`, { email, password })
      .then((res) => {
        dispatch(setLogin({ user: res.data.user, token: res.data.token }));
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="login">
      <div className="login-content">
        {error && <p className="error">{error}</p>}
        <form className="login-content-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <Link to="/register">Don't have an account? Register here</Link>
      </div>
    </div>
  );
};

export default LoginPage;
