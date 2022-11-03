const { Client } = require("pg"); // imports the pg module

const dbName = "fitnessTrackerBackend";

const client = new Client({
  connectionString:
    process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
});

module.exports = client;
