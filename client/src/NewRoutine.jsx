import { useEffect, useState } from "react";
import { createRoutine } from "./helpers";
import { useNavigate } from "react-router-dom";

function NewRoutine() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [publicz, setPublicz] = useState("");
  const navigate = useNavigate();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await createRoutine(publicz, name, goal);
        navigate("/routines");
      }}
    >
      <label>
        <input
          className="npIn"
          value={publicz}
          onChange={() => setPublicz(!publicz)}
          type="checkbox"
          placeholder="Public?"
        />{" "}
        Make Routine Public?
      </label>
      <input
        className="npIn"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Name"
      />
      <input
        className="npIn"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        type="text"
        placeholder="Goal"
      />

      <input
        className="npIn"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        type="text"
        placeholder="Goal"
      />

      <button type="submit">Create</button>
    </form>
  );
}
export default NewRoutine;
