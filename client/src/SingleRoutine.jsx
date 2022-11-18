import { useEffect, useState } from "react";
import { fetchRoutine, deleteRoutine, deleteRoutAct } from "./helpers";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUsers } from "./hooks/useUsers";
import styles from "./componentCss/SingleRoutine.module.css";

export default function SingleRoutine() {
  const { id } = useParams();
  const { users } = useUsers();

  const [individualRoutine, setIndividualRoutine] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getRoutine() {
      const routine = await fetchRoutine(id);
      setIndividualRoutine(routine);
      console.log("routine", routine);
    }
    getRoutine();
  }, []);

  return (
    <div>
      <h1> Routine Description: </h1>
      <div className={styles.singleroutine}>
        {console.log("ind routine", individualRoutine)}
        <div className={styles.header}>
          <h4 className={styles.routname}>{individualRoutine.name}</h4>
          <h3> Goal: {individualRoutine.goal}</h3>
        </div>
        <h3>
          {" "}
          <div className={styles.acthead}>Activities: </div>
          {individualRoutine.activities?.map((activity) => {
            return (
              <div className={styles.container} key={activity.id}>
                <h4 className={styles.actname}>{activity.name} </h4>
                <h4>{activity.description} </h4>
                <h4>Count:{activity.count} </h4>
                <h4>Duration:{activity.duration} </h4>
                {users.id === individualRoutine.creator_id ? (
                  <button className={styles.button}
                    onClick={() => {
                      deleteRoutAct(individualRoutine.id, activity.id);
                      navigate(`/myroutines`);
                    }}
                  >
                    Remove Activity
                  </button>
                ) : null}
              </div>
            );
          })}
        </h3>
        <h3 className={styles.creator}>
          {" "}
          Creator: {individualRoutine.creatorName}
        </h3>

        {users.id === individualRoutine.creator_id ? (
          <>
            <button className={styles.button}
              onClick={() => {
                navigate(`/editroutine/${id}`);
              }}
            >
              Edit Routine{" "}
            </button>
            <button className={styles.button}
              onClick={() => {
                deleteRoutine(id);
                navigate("/routines");
              }}
            >
              Delete Routine{" "}
            </button>
          </>
        ) : null}

        <button className={styles.button}
          onClick={() => {
            navigate(`/routines`);
          }}
        >
          Back to Routines{" "}
        </button>
      </div>
    </div>
  );
}
