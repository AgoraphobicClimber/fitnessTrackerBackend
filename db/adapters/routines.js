const { Client } = require("pg");

const client = new Client("postgres://localhost:5432/fitnessTrackerBackend");

//getRoutineById should use left join to pull in the correct activity id that matches the routine id 

async function getRoutineById(id) {
    try {
        const {
          rows: [routine],
        } = await client.query(
          `
        SELECT *
        FROM routines
        WHERE id=$1;
        `,
          [id]
        );

        if (!routine) {
          throw {
            name: "RoutineNotFoundError",
            message: "Could not find a routine with that Id",
          };
        }
        const { rows: activities } = await client.query(
            `
          SELECT activities.*
          FROM activities
          JOIN routine_activities ON activities.id=routine_activites."activityId"
          WHERE routine_activites."routineId"=$1;
        `,
            [id]
          );
   return routine 
} catch (error) {
    throw error;
  }
}

async function getRoutineWithoutActivities() {
    try {
        const { rows: [routine] } = await client.query (
            `
            SELECT * FROM routines

            `
        );
        return routine;
    }catch (error) {
        throw error;
      }
}

async function getAllRoutines() {
    try {
        const { rows: [routine] } = await client.query (
            `
            SELECT * FROM routines
            `
        );

        const { rows: activities } = await client.query (
            `
            SELECT activities.*
            FROM activities 
            JOIN routine_activities ON activities.id=routine_activites."activityId"
            `
        );
        return routine; 
    }catch (error) {
        throw error;
      }
}

async function getAllPublicRoutines() {
    try {
        const { rows: [routine] } = await client.query(
            `
            SELECT * FROM routines
            WHERE routines.is_public = true
            `
        );
        const { rows: activities } = await client.query(
            `
            SELECT activities.*
            FROM activities
            JOIN routine_activities ON activities.id=routine_activites."activityId"
            `
        );
    return routine;
    } catch (error) {
        throw error;
      }
}

async function getAllRoutinesByUser(username) {
    try {
        const { rows: [routine] } = await client.query(
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
        )

        const {rows: users } = await client.query(
            `
            SELECT users.*
            FROM users
            INNER JOIN user.id ON 
            `
        )
    } catch (error) {
        throw error;
      }
}

