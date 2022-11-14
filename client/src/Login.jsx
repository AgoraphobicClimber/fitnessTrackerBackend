import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loginUser } from "./helpers";
import { useUsers } from "./hooks/useUsers";

export function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loggedIn, setLoggedIn } = useUsers();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await loginUser(username, password);
          console.log("login result", result);

          if (result.user) {
            setPassword("");
            setUsername("");
            setLoggedIn(true);
            console.log("logged in from login", loggedIn);
            navigate("/");
          } else {
            console.log("result was not success");
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
    </div>
  );
}
