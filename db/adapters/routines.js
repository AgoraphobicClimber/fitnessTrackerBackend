const client = require("../client");

//getRoutineById should use left join to pull in the correct activity id that matches the routine id

async function createRoutine({ creator_id, is_public, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routines( creator_id, is_public, name, goal) 
        VALUES($1, $2, $3, $4) 
        RETURNING *;
      `,
      [creator_id, is_public, name, goal]
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
        SELECT routines.*,
        
        CASE WHEN ra.routine_id is NULL THEN '[]' ::json
              ELSE
              JSON_AGG(
                JSON_BUILD_OBJECT(
                  'id', activities.id,
                  'name', activities.name,
                  'description', activities.description,
                  'count', ra.count,
                  'duration', ra.duration
                )
              ) END AS activities
                FROM routines
                LEFT JOIN routine_activities AS ra
                  ON routines.id = ra.routine_id
                LEFT JOIN activities
                  ON ra.activity_id= activities.id
                  WHERE routines.id=$1
                GROUP BY routines.id, ra.routine_id


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
    const { rows } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName",
      CASE WHEN ra."routine_id" is NULL THEN'[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'count', ra.count,
        'duration', ra.duration
        )
      ) END AS activities
      FROM routines	
      LEFT JOIN routine_activities AS ra
        ON routines.id = ra."routine_id"
      LEFT JOIN activities 
        ON ra."activity_id" = activities.id
      JOIN users
        ON routines."creator_id" = users.id	
      GROUP BY routines.id, ra."routine_id", users.username
              
            `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName",
      CASE WHEN ra."routine_id" is NULL THEN'[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'count', ra.count,
        'duration', ra.duration
        )
      ) END AS activities
      FROM routines	
      LEFT JOIN routine_activities AS ra
        ON routines.id = ra."routine_id"
      LEFT JOIN activities 
        ON ra."activity_id" = activities.id
      JOIN users
        ON routines."creator_id" = users.id	
        WHERE routines.is_public = true
      GROUP BY routines.id, ra."routine_id", users.username
            `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser(username) {
  try {
    const { rows } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName",
      CASE WHEN ra."routine_id" is NULL THEN'[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'count', ra.count,
        'duration', ra.duration
        )
      ) END AS activities
      FROM routines	
      LEFT JOIN routine_activities AS ra
        ON routines.id = ra."routine_id"
      LEFT JOIN activities 
        ON ra."activity_id" = activities.id
      JOIN users
        ON routines."creator_id" = users.id	
        WHERE users.username='$1'
        GROUP BY routines.id, ra."routine_id", users.username
           
            `,
      [username]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser(username) {
  try {
    const { rows } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName",
      CASE WHEN ra."routine_id" is NULL THEN'[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
        'id', activities.id,
        'name', activities.name,
        'description', activities.description,
        'count', ra.count,
        'duration', ra.duration
        )
      ) END AS activities
      FROM routines	
      LEFT JOIN routine_activities AS ra
        ON routines.id = ra."routine_id"
      LEFT JOIN activities 
        ON ra."activity_id" = activities.id
      JOIN users
        ON routines."creator_id" = users.id	
        WHERE users.username=$1 AND routines.is_public = true
        GROUP BY routines.id, ra."routine_id", users.username

            `,
      [username]
    );
    return rows;
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
      SELECT routines.*, users.username AS "creatorName",
      CASE WHEN ra."routine_id" is NULL THEN '[]' ::json
      ELSE
      JSON_AGG(
          JSON_BUILD_OBJECT(
          'id', activities.id,
          'name', activities.name,
          'description', activities.description,
          'count', ra.count,
          'duration', ra.duration
      )
     ) END AS activities
     FROM routines 
     LEFT JOIN routine_activities AS ra
     ON routines.id=ra.routine_id
     LEFT JOIN activities
     ON activities.id=ra.activity_id
     JOIN users
     ON routines.creator_id=users.id
     WHERE activities.id = $1 AND routines.is_public = true
     GROUP BY routines.id, ra.routine_id, users.username;

            `,
      [activityId]
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
      SET is_public = $2, name = $3, goal = $4
      WHERE routines.id = $1
      RETURNING is_public, name, goal   
        `,
      [routineId, isPublic, name, goal]
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
            DELETE FROM routine_activities
            WHERE routine_activities.routine_id = $1
            RETURNING *
            `,
      [routineId]
    );

    const {
      rows: [deletedRoutine],
    } = await client.query(
      `
            DELETE FROM routines
            WHERE routines.id = $1
            RETURNING *
            `,
      [routineId]
    );

    return deletedRoutine;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createRoutine,
  getPublicRoutineByActivity,
  getAllRoutines,
  getPublicRoutinesByUser,
  updateRoutine,
  getAllRoutinesByUser,
  getRoutineById,
  destoryRoutine,
  getAllPublicRoutines,
};
