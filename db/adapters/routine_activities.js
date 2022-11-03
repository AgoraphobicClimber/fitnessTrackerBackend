// addActivityToRoutine
// addActivityToRoutine( routineId, activityId, count, duration )
// create a new routine_activity, and return it

const client = require("../client");

async function addActivityToRoutine({
  routine_id,
  activity_id,
  duration,
  count,
}) {
  try {
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

    return routine_activity;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(`
          SELECT *  
          FROM routine_activities
          WHERE id=${id}
        `);

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

async function updateRoutineActivity(routineActivityId, count, duration) {
  try {
    const {
      rows: [updatedRoutAct],
    } = await client.query(
      `
      UPDATE routine_activities
      SET count = $2, duration = $3
      WHERE routine_activities.id = $1
      RETURNING count, duration  
          `,
      [routineId, isPublic, name, goal]
    );
    return updatedRoutAct;
  } catch (error) {
    throw error;
  }
}

async function destoryRoutine(routine_activityId) {
  try {
    const {
      rows: [deletedRoutineActivity],
    } = await client.query(
      `
      DELETE FROM routine_activities
      WHERE routine_activities.id = $1
      RETURNING *

              `,
      [routine_activityId]
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
    const {
      rows: [routineActs],
    } = await client.query(
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

    return routineActs;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addActivityToRoutine,
  getRoutineActivityById,
  getRoutineActivitiesByRoutine,
  getRoutineActivityById,
  destoryRoutine,
};
