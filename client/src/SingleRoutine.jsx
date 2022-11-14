import { useEffect, useState } from "react";
import fetchRoutine, { deleteRoutine } from "./helpers";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUsers } from "./hooks/useUsers";

export default function SingleRoutine() {
  const { id } = useParams();
  const { users } = useUsers();

  const [individualRoutine, setIndividualRoutine] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getRoutine() {
      const routines = await fetchRoutine(id);
      const [oneRoutine] = routines.filter((routine) => {
        console.log("user is", users);
        return routine.id == id;
      });
      setIndividualRoutine(oneRoutine);
      console.log("ind rotuiensdf", individualRoutine);
    }
    getRoutine();
  }, []);

  return (
    <div className="singleRoutine">
      <h4>{individualRoutine.name}</h4>
      <h3> Goal: {individualRoutine.goal}</h3>
      <h3> Creator: {individualRoutine.creatorName}</h3>

      {users.id === individualRoutine.creator_id ? (
        <>
          <button
            onClick={() => {
              navigate(`/editroutine/${id}`);
            }}
          >
            Edit Routine{" "}
          </button>
          <button
            onClick={() => {
              deleteRoutine(id);
              navigate("/routines");
            }}
          >
            Delete Routine{" "}
          </button>
        </>
      ) : null}

      <button
        onClick={() => {
          navigate(`/routines`);
        }}
      >
        Back to Routines{" "}
      </button>
    </div>
  );
}
