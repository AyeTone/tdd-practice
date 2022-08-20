import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const random = Math.floor(Math.random() * 11);

  async function handleClick(e) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${random}`
      );
      setUser(data);
    } catch {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <h1>You can enter anything.</h1>
      <span className="user"> {!error && user.name} </span>

      <form>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          value={password}
        />
        <button disabled={!username || !password} onClick={handleClick}>
          {loading ? "please wait" : "Login"}
        </button>
        <span
          data-testid="error"
          style={{ visibility: error ? "visible" : "hidden" }}
        >
          Something went wrong
        </span>
      </form>
    </div>
  );
};

export default Login;
