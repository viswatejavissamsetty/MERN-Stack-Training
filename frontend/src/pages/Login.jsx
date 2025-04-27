import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router";

export function Login() {
  // Username
  // Password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    if (!username || !password) {
      alert("Username and password are required");
      return;
    }

    axios
      .post("http://localhost:3000/user/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        const data = res.data;
        const userId = data.userid;

        sessionStorage.setItem("userId", userId);

        navigate("/products");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }

  return (
    <div className="container">
      <form className="card" onSubmit={onSubmit}>
        <h1 className="card-title">Login</h1>

        <div className="card-body">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <p className="error-message">{errorMessage}</p>

        <div className="card-footer">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
