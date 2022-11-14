import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { editRoutine } from "./helpers";
import { useState } from "react";

export function EditRoutine() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [publicz, setPublicz] = useState("");
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const result = await editRoutine(id, publicz, name, goal);
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

      <button type="submit">Create</button>
    </form>
  );
}
