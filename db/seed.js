const client = require("./client");
const { createRoutine } = require("./adapters/routines");
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require("./adapters/users");
const { createActivity } = require("./adapters/activities");
const { addActivityToRoutine } = require("./adapters/routine_activities");

const {
  users,
  activities,
  routines,
  routine_activities,
} = require("./seedData.js");

const dropTables = async () => {
  console.log("...dropping tables");
  await client.query(`
  DROP TABLE IF EXISTS routine_activities;    
  DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS users; 
      
    `);
};

const createTables = async () => {
  console.log(`...creating users table`);
  await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR (255) UNIQUE NOT NULL,
          password VARCHAR (255) NOT NULL
        );
      `);
  console.log(`...creating routine table`);
  await client.query(`
    CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        creator_id INTEGER REFERENCES users(id),
        is_public BOOLEAN DEFAULT false,
        name VARCHAR(255) UNIQUE NOT NULL,
        goal TEXT NOT NULL
    );
    `);

  console.log(`...creating act table`);
  await client.query(`
    CREATE TABLE activities (  
        id	SERIAL	PRIMARY KEY,
        name	VARCHAR(255)	UNIQUE NOT NULL,
        description	TEXT	NOT NULL
    );
    `);
  console.log(`...creating routine_act table`);
  await client.query(`
    CREATE TABLE routine_activities(
      id	SERIAL	PRIMARY KEY,
      routine_id	INTEGER	REFERENCES routines ( id ),  
      activity_id	INTEGER	REFERENCES activities ( id ),
        duration	INTEGER,	
        count	INTEGER
    );
    `);
};

const seedDb = async () => {
  console.log(`...seeding users`);
  for (const user of users) {
    await createUser(user);
  }
  console.log(`...seeding routines`);
  for (const routine of routines) {
    await createRoutine(routine);
    console.log("seeded routines");
  }
  console.log("...seeding activities", activities);
  for (const activity of activities) {
    await createActivity(activity);
    console.log("seeded activities");
  }

  console.log("...seeding rout_acts", routine_activities);
  for (const routine_activity of routine_activities) {
    await addActivityToRoutine(routine_activity);
    console.log("seeded rout_acts");
  }
};
const rebuildDb = async () => {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await seedDb();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};

rebuildDb();
