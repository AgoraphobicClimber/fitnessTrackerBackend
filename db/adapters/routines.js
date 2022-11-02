const { Client } = require("pg");

const client = new Client("postgres://localhost:5432/fitnessTrackerBackend");

//getRoutineById should use left join to pull in the correct activity id that matches the routine id

async function createRoutine({ id, creator_id, is_public, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routines(id, creator_id, is_public, name, goal) 
        VALUES($1, $2, $3, $4, $5) 
        RETURNING *;
      `,
      [id, creator_id, is_public, name, goal]
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        SELECT routines.*
        WHERE routines.id=$1;
        CASE WHEN ra."routineID" is NULL THEN '[]' ::json
              ELSE
              JSON_AGG(
                JSON_BUILD_OBJECT(
                  'id'. activites.id,
                  'name', activities.name,
                  'description', activities.description,
                  'count', ra.count,
                  'duration', ra.duration
                )
              ) END AS activities
                FROM routines
                LEFT JOUN routine_activities AS ra
                  ON routines.id = ra."routineID"
                LEFT JOIN activities
                  ON ra."activityId"= activities.id
                GROUP BY routines.id, ra."routineID",


        `,
      [id]
    );

    if (!routine) {
      throw {
        name: "RoutineNotFoundError",
        message: "Could not find a routine with that Id",
      };
    }
    // const { rows: activities } = await client.query(
    //     `
    //   SELECT activities.*
    //   FROM activities
    //   JOIN routine_activities ON activities.id=routine_activites."activityId"
    //   WHERE routine_activites."routineId"=$1;
    // `,
    //     [id]
    //   );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutineWithoutActivities() {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
            SELECT * FROM routines
            

            `
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
            SELECT routines.*, users.username AS "creatorName",
              CASE WHEN ra."routineID" is NULL THEN '[]' ::json
              ELSE
              JSON_AGG(
                JSON_BUILD_OBJECT(
                  'id'. activites.id,
                  'name', activities.name,
                  'description', activities.description,
                  'count', ra.count,
                  'duration', ra.duration
                )
              ) END AS activities
                FROM routines
                LEFT JOUN routine_activities AS ra
                  ON routines.id = ra."routineID"
                LEFT JOIN activities
                  ON ra."activityId"= activities.id
                JOIN users
                  ON routines."creatorId" = users.id
                GROUP BY routines.id, ra."routineID", users.username
              
              
            `
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
            SELECT * FROM routines,
            WHERE routines.is_public = true,
            CASE WHEN ra."routineID" is NULL THEN '[]' ::json
              ELSE
              JSON_AGG(
                JSON_BUILD_OBJECT(
                  'id'. activites.id,
                  'name', activities.name,
                  'description', activities.description,
                  'count', ra.count,
                  'duration', ra.duration
                )
              ) END AS activities
                FROM routines
                LEFT JOUN routine_activities AS ra
                  ON routines.id = ra."routineID"
                LEFT JOIN activities
                  ON ra."activityId"= activities.id
                GROUP BY routines.id, ra."routineID",
            `
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser(username) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
            SELECT * FROM routines
            where routines.is_public = true
            `
    );

    const { rows: activities } = await client.query(
      `
            SELECT activities.*
            FROM activities
            JOIN routine_activities ON activities.id=routine_activites."activityId"
            `
    );

    const { rows: users } = await client.query(
      `
            SELECT users.*
            FROM users
            INNER JOIN user.id ON 
            `
    );
  } catch (error) {
    throw error;
  }
}

module.exports = { createRoutine, getAllRoutines };
