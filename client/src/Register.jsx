import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { registerUser } from "./helpers";
import { useUsers } from "./hooks/useUsers";

export function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn, loggedIn } = useUsers();
  const [error, setError] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await registerUser(username, password);
        console.log("reg result", result);
        if (result.message) {
          console.log("register didnt work");
          setError("Username already exists");
        } else {
          setLoggedIn(true);
          setPassword("");
          setUsername("");

          navigate("/");
        }
      }}
    >
      {error ? (
        <>
          <h3>{error}</h3>
        </>
      ) : null}
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />

      <button>Submit</button>
    </form>
  );
}
