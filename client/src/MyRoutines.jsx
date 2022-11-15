import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import fetchRoutines from "./helpers";

import { useUsers } from "./hooks/useUsers";

export default function MyRoutines() {
  const navigate = useNavigate();
  const [routines, SetRoutines] = useState([]);
  const { users } = useUsers();
  useEffect(() => {
    async function getRoutines() {
      const allRoutines = await fetchRoutines();
      SetRoutines(allRoutines);
    }
    getRoutines();
  }, []);

  return (
    <div className="routines">
      <h1> My Routines</h1>
      <div className="container">
        {routines.map((routine) => {
          return (
            <>
              {users.id === routine.creator_id ? (
                <div className="post" key={routine.id}>
                  <h4>{routine.name} </h4>
                  <h4>{routine.goal} </h4>
                  <button
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
