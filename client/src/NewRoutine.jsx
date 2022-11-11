import { useEffect, useState } from "react";

function NewRoutine() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [publicz, setPublicz] = useState("");
  return (
    <form>
      <label>
        <input
          className="npIn"
          value={publicz}
          onChange={(e) => setGoal(e.target.value)}
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
    </form>
  );
}
export default NewRoutine;
