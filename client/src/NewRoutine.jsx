import { useEffect, useState } from "react";
import { createRoutine } from "./helpers";
import { useNavigate } from "react-router-dom";
import styles from "./componentCss/Createroutine.module.css";

function NewRoutine() {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [publicz, setPublicz] = useState("");
  const navigate = useNavigate();
  return (
    <div className={styles.form}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createRoutine(publicz, name, goal);
          navigate("/routines");
        }}
      >
        <label>
          <input
            className={styles.setpublic}
            value={publicz}
            onChange={() => setPublicz(!publicz)}
            type="checkbox"
            placeholder="Public?"
          />{" "}
          Make Routine Public?
        </label>
        <input
          className={styles.setname}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <input
          className={styles.setgoal}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          type="text"
          placeholder="Goal"
        />

        <button type="submit" className={styles.button}>
          Create
        </button>
      </form>
    </div>
  );
}
export default NewRoutine;
