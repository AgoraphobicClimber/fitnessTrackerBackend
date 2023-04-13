import fetchRoutines from "./helpers";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./componentCss/Routines.module.css"

function Routines() {
  const navigate = useNavigate();
  const [routines, SetRoutines] = useState([]);
  useEffect(() => {
    async function getRoutines() {
      const allRoutines = await fetchRoutines();
      SetRoutines(allRoutines);
    }
    getRoutines();
  }, []);
console.log(routines)
  return (
    <div className="routines">
      <h1> Routines</h1>
      <div className={styles.container}>
        {routines.map((routine) => {
          return (
            <div className={styles.post} key={routine.id}>
              <h4 className={styles.name}>{routine.name} </h4>
              <h4>Goal: {routine.goal} </h4>
              <button className={styles.button}
                onClick={() => {
                  console.log("routine id is", routine.id);
                  navigate(`/routines/${routine.id}`);
                }}
              >
                See Details{" "}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Routines;
