import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createActivity, fetchActivities } from "./helpers";
import { useUsers } from "./hooks/useUsers";
import styles from "./componentCss/Activities.module.css"

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
        <div className={styles.container}>
          <h3 className={styles.createheader}>Create a New Activity</h3>
          <form className={styles.form}
            onSubmit={async (e) => {
              // e.preventDefault();
              const result = await createActivity(name, description);
              navigate("/activities");
              setName("");
              setDescription("");
            }}
          >
            <input className={styles.input}
        
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <input className={styles.input}
  
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
            />

            <button  className={styles.button} type="submit">Create</button>
          </form>
          </div>
        </>
      ) : null}

      <div className="activities">
        <h1> Activities </h1>
        <div className={styles.actcontainer}>
          {activities.map((activity) => {
            return (
              <div className={styles.activity} key={activity.id}>
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
