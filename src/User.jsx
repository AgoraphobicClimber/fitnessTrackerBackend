import { useUsers } from "./hooks/useUsers";
import { fetchRoutine, deleteRoutine } from "./helpers";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"

const User = () => {
    const loggedIn = useUsers();
    const [userrout, setUserRout] = useState([]);

    useEffect(() => {
        async function loadUserPosts() {
            const result = await fetchRoutine(id);
            console.log("result", result)
            const userRoutines = result.data.routines
            console.log("userposts", userRoutines);
            setUserRout(userRoutines);
        }

        loadUserPosts();
    }, []);

    return (
        <div>
             <h1>Your Routines</h1>
            {userrout.map((routine) => {
                    return (
                        <div>
                            <h2>{routine.name}</h2>

                            <button
                                onClick={async () => {
                                    const deletedRout = await deleteRoutine();
                                    if (deletedRout.success) {
                                        const currentRout = userrout.filter((singleRout) => {
                                            return singleRout._id !== routine._id;
                                        });

                                        setUserRout(currentRout);
                                    }
                                }}
                            >
                                Delete
                            </button>

                            <button
                                onClick={async () => {
                                    
                                }}
                                >
                                Edit Post
                            </button>
                        </div>
                    );
                }
            )}
        </div>
    )}

    export default User;
