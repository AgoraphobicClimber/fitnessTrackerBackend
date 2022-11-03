const client = require("../client")

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
                LEFT JOIN routine_activities AS ra
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
                LEFT JOIN routine_activities AS ra
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
                LEFT JOIN routine_activities AS ra
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
            WHERE users.username=$1;
            INNER JOIN users ON users.id = routines.creator_id
            CASE WHEN ra."routineID" is NULL THEN '[]' :json
            ELSE
            JSON_AGG(
                'id'. activites.id,
                'name', activities.name,
                'description', activities.description,
                'count', ra.count,
                'duration', ra.duration
            )
           ) END AS activities
           FROM routines
           LEFT JOIN routine_activities AS ra
             ON routines.id = ra."routineID"
           LEFT JOIN activities
             ON ra."activityId"= activities.id
           GROUP BY routines.id, ra."routineID",
            
            `, [username]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser(username) {
    try {
        const {
            rows: [routine], 
        } = await client.query(
            `
            SELECT * FROM routines
            WHERE users.username=$1 AND routines.is_public = true;
            INNER JOIN users ON users.id = routines.creator_id
            CASE WHEN ra."routineID" is NULL THEN '[]' :json
            ELSE
            JSON_AGG(
                'id'. activites.id,
                'name', activities.name,
                'description', activities.description,
                'count', ra.count,
                'duration', ra.duration
            )
           ) END AS activities
           FROM routines
           LEFT JOIN routine_activities AS ra
             ON routines.id = ra."routineID"
           LEFT JOIN activities
             ON ra."activityId"= activities.id
           GROUP BY routines.id, ra."routineID",

            `, [username]
        );
        return routine;
    } catch (error) {
        throw error;
      }
}

async function getPublicRoutineByActivity(activityId) {
    try {
        const {
            rows: [routine],
        } = await client.query(
            `
            SELECT * FROM activities
            WHERE activities.id = $1; 
            INNER JOIN routines ON routine.id = activities.id
            CASE WHEN ra."routineID" is NULL THEN '[]' :json
            ELSE
            JSON_AGG(
                'id'. activites.id,
                'name', activities.name,
                'description', activities.description,
                'count', ra.count,
                'duration', ra.duration
            )
           ) END AS activities
           LEFT JOIN activities
           ON ra."activityId"= activities.id
           FROM routines
           LEFT JOIN routine_activities AS ra
             ON routines.id = ra."routineID"
           GROUP BY routines.id, ra."routineID",
            `, [activityId]
        );
        return routine;
    } catch (error) {
        throw error;
      }
}

async function updateRoutine(routineId, isPublic, name, goal) {
   try {
    const {
        rows: [updatedRoutine], 
    } = await client.query(
        `
        UPDATE routines
        SET isPublic = $2 AND name = $3 AND goal = $4; 
        WHERE routines.id = $1; 
        RETURNING isPublic, name, goal  
        `, [routineId, isPublic, name, goal]
    );
    return updatedRoutine; 
   } catch (error) {
    throw error;
  }
}

async function destoryRoutine(routineId) {
    try {
       await client.query(
            `
            DELETE FROM routine_activites
            WHERE routine_activites.routine_id = $1
            RETURNING *
            `, [routineId]
        )

        const {
            rows: [deletedRoutine],
        } = await client.query(
            `
            DELETE FROM routine
            WHERE routines.id = $1
            RETURNING *
            `, [routineId]
        )
    

        return deletedRoutine;
    } catch (error) {
        throw error;
      }
}

module.exports = { createRoutine, getAllRoutines };
