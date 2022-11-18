import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  fetchAllRoutines } from "./helpers";

import { useUsers } from "./hooks/useUsers";
import styles from "./componentCss/Myroutines.module.css"

export default function MyRoutines() {
  const navigate = useNavigate();
  const [routines, SetRoutines] = useState([]);
  const { users } = useUsers();
  useEffect(() => {
    async function getRoutines() {
      const allRoutines = await fetchAllRoutines();
      SetRoutines(allRoutines)
    }
    getRoutines();
  }, []);

  return (
    <div>
      <h1 className={styles.header}> My Routines</h1>
      <div className="container">
        {routines.map((routine) => {
          return (
            <>
              {users.id === routine.creator_id ? (
                <div className={styles.post} key={routine.id}>
                  <h4>{routine.name} </h4>
                  <h4>{routine.goal} </h4>
                  <button className={styles.button}
                    onClick={() => {
                      console.log("routine id is", routine.id);
                      navigate(`/routines/${routine.id}`);
                    }}
                  >
                    See Details{" "}
                  </button>
                </div>
              ) : null}
            </>
          );
        })}
      </div>
    </div>
  );
}
