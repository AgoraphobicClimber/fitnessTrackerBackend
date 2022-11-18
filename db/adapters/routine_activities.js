// addActivityToRoutine
// addActivityToRoutine( routineId, activityId, count, duration )
// create a new routine_activity, and return it

const client = require("../client");

async function addActivityToRoutine(routine_id, activity_id, duration, count) {
  try {
    console.log("try works", routine_id, activity_id, duration, count);
    const {
      rows: [routine_activity],
    } = await client.query(
      `
      INSERT INTO routine_activities( routine_id, activity_id, duration, count)
      VALUES ($1, $2, $3, $4)
      RETURNING *;  
          `,
      [routine_id, activity_id, duration, count]
    );
    console.log("query works", routine_activity);

    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivityById(routine_id, activity_id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
          SELECT *  
          FROM routine_activities
          WHERE routine_activities.routine_id = $1 AND routine_activity.activities_id = $2
        `[(routine_id, activity_id)]
    );

    if (!routine_activity) {
      return null;
    }

    return routine_activity;
  } catch (error) {
    throw error;
  }
}

// updateRoutineActivity

// updateRoutineActivity(routineActivityId, count, duration)
// Find the routine_activity with id equal to the passed in routineActivityId
// Update the count or duration as necessary

async function updateRoutineActivity(routine_id, activity_id, count, duration) {
  try {
    const {
      rows: [updatedRoutAct],
    } = await client.query(
      `
      UPDATE routine_activities
      SET count = $3, duration = $4
      WHERE routine_activities.routine_id = $1 AND routine_activities.activity_id = $2
      RETURNING count, duration  
          `,
      [routine_id, activity_id, count, duration]
    );
    return updatedRoutAct;
  } catch (error) {
    throw error;
  }
}

async function destoryRoutineAct(routine_id, activity_id) {
  try {
    const {
      rows: [deletedRoutineActivity],
    } = await client.query(
      `
      DELETE FROM routine_activities
      WHERE routine_activities.routine_id = $1 AND routine_activities.activity_id = $2
      RETURNING *

              `,
      [routine_id, activity_id]
    );

    return deletedRoutineActivity;
  } catch (error) {
    throw error;
  }
}

// getRoutineActivitiesByRoutine

// getRoutineActivitiesByRoutine(routineId)
// select and return an array of all routine_activity records

async function getRoutineActivitiesByRoutine(routineId) {
  try {
    const { rows } = await client.query(
      `
          SELECT * FROM routine_activities
          WHERE routine_activities.routine_id = $1
          CASE WHEN ra."routineID" is NULL THEN '[]' :json
          ELSE
          JSON_AGG(
              'id'. routine_activties.id,
              'name', routine_activities.routine_id,
              'description', routine_activities.activities_id,
              'duration', routine_activies.duration
              'count', routine_activies.count,   
          )
          GROUP BY routine_activities."routineID",
          
                  `,
      [routineId]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addActivityToRoutine,
  getRoutineActivityById,
  getRoutineActivitiesByRoutine,
  getRoutineActivityById,
  destoryRoutineAct,
  updateRoutineActivity,
};
