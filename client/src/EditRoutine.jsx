import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { editRoutine, addActToRoutine, fetchActivities } from "./helpers";
import { useState, useEffect } from "react";

export function EditRoutine() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [publicz, setPublicz] = useState("");
  const [actId, setActId] = useState("");
  const [dur, setDur] = useState("");
  const [count, setCount] = useState("");

  const [activities, setActivities] = useState([]);
  useEffect(() => {
    async function getActivities() {
      const allActivities = await fetchActivities();
      setActivities(allActivities);
    }
    getActivities();
  }, []);

  const navigate = useNavigate();

  return (
  <div>
     <h2> Edit Your Routine</h2>
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
    <h2> Add an Activity</h2>
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      const actId = e.target[0].value
      console.log({actId,id,dur,count})

      
   const result = await addActToRoutine(id, actId, dur, count);
      navigate(`/myroutines`);
    }}
  >
    <select>
    {activities?.map((activity) => {
      return (
       
        <option value={activity.id}>
          {activity.name}
        </option>
     
       );
      })}
    </select>

    <label>
    </label>

    <input
      className="npIn"
      value={dur}
      onChange={(e) => setDur(e.target.value)}
      type="text"
      placeholder="Duration"
    />
    <input 
    className="npIn"
    value={count}
    onChange={(e) => setCount(e.target.value)}
    type="text"
    placeholder="Count"
    />

    <button type="submit">Add</button>
  </form>
  </div>
);
}
