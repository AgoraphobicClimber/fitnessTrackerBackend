import fetchRoutines from "./helpers";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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

  return (
    <div className="routines">
      <h1> Routines</h1>
      <div className="container">
        {routines.map((routine) => {
          return (
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
          );
        })}
      </div>
    </div>
  );
}

export default Routines;
