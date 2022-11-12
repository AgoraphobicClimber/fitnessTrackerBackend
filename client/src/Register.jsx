import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { registerUser } from "./helpers";
import { useUsers } from "./hooks/useUsers";

export function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn, loggedIn } = useUsers();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await registerUser(username, password);
        console.log(result);
        if (result) {
          setLoggedIn(true);
          setPassword("");
          setUsername("");

          navigate("/");
        } else {
          console.log("register didnt work");
        }
      }}
    >
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        type="text"
        placeholder="Username"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        placeholder="Password"
      />

      <button>Submit</button>
    </form>
  );
}
