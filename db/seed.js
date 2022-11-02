const client = require("./client");

const dropTables = async () => {
    console.log("...dropping tables");
    await client.query(`
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routine-activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS users; 
    `);
}

const createTables = async () => {
    console.log(`...creating users table`);
    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          username VARCHAR (255) UNIQUE NOT NULL,
          password VARCHAR (255) NOT NULL
        );
      `);

    await client.query(`
    CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        creator_id INTEGER REFERENCES users(id),
        is_public BOOLEAN DEFAULT false,
        name VARCHAR(255) UNIQUE NOT NULL,
        goal TEXT NOT NULL
    );
    `);

    await client.query(`
    CREATE TABLE routine-activities (
        id	SERIAL	PRIMARY KEY,
        routine_id	INTEGER	REFERENCES routines ( id ),
        activity_id	INTEGER	REFERENCES activities ( id ),
        duration	INTEGER,	
        count	INTEGER
    );
    `);

    await client.query(`
    CREATE TABLE activities (  
        id	SERIAL	PRIMARY KEY
        name	VARCHAR(255)	UNIQUE NOT NULL
        description	TEXT	NOT NULL
    );
    `);
}

const rebuildDb = async () => {
    client.connect();
    try {
        await dropTables();
        await createTables();
    } catch (error) {
    console.error(error);
  } finally {
    client.end();
}
};

rebuildDb();