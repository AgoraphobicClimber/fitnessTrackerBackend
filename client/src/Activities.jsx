import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createActivity, fetchActivities } from "./helpers";
import { useUsers } from "./hooks/useUsers";

export default function Activities() {
  const { loggedIn, users } = useUsers();
  const navigate = useNavigate();
  const [activities, SetActivities] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    async function getActivities() {
      const allActivities = await fetchActivities();
      SetActivities(allActivities);
    }
    getActivities();
  }, []);

  return (
    <>
      {loggedIn ? (
        <>
          <h3>Create a New Activity</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const result = await createActivity(name, description);
              navigate("/activities");
              setName("");
              setDescription("");
            }}
          >
            <input
              className="npIn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <input
              className="npIn"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
            />

            <button type="submit">Create</button>
          </form>
        </>
      ) : null}

      <div className="activities">
        <h1> Activities </h1>
        <div className="container">
          {activities.map((activity) => {
            return (
              <div className="activity" key={activity.id}>
                <h4>{activity.name} </h4>
                <h4>{activity.description} </h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
