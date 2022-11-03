const client = require("../client");

async function getActivityById(activityId) {
    try {
        const {
          rows: [activity],
        } = await client.query(`
            SELECT id, name, description
            FROM activities
            WHERE id=${activityId}
          `);
    
        if (!activity) {
          return null;
        }
    
        return activity;
      } catch (error) {
        throw error;
      }
    }

async function getAllActivities() {
    try {
        const {
            rows: [activity],
        } = await client.query(
            `
            SELECT * FROM activites
            `
        )
        return activity;
    } catch (error) {
        throw error;
      }
}

async function createActivity(name, description) {
    try {
        const {
            rows: [activity],
        } = await client.query(
            `
            INSERT INTO activites(name, description) 
            VALUES($1, $2) 
            ON CONFLICT (username) DO NOTHING 
            RETURNING *;
            `, [name, description]
        );
        return activity;
    } catch (error) {
        throw error;
      }
}

async function updateActivity( activityId, name, description ) {
    try {
        const {
            rows: [updateActivity],
        } = await client.query(
            `
            UPDATE activities
            SET name = $2 AND description = $3
            WHERE activities.id = $1
            RETURNING name, description
            `, [activityId, name, description]
        );
        return updateActivity;
    } catch (error) {
        throw error;
      }
}