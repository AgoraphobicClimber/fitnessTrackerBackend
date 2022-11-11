import { useEffect, useState } from "react";
import fetchRoutine from "./helpers";
import routines from "./Routines";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SingleRoutine() {
  const { id } = useParams();
  //   const { token, user } = useAuth();
  const [individualRoutine, setIndividualRoutine] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getRoutine() {
      const routines = await fetchRoutine(id);
      const [oneRoutine] = routines.filter((routine) => {
        return routine.id == id;
      });
      setIndividualRoutine(oneRoutine);
    }
    getRoutine();
  }, []);

  return (
    <div className="singleRoutine">
      <h4>{individualRoutine.name}</h4>
      <h3> Goal: {individualRoutine.goal}</h3>
      <h3> Creator: {individualRoutine.creatorName}</h3>
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
