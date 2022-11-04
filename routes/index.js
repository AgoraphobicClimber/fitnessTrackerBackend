const express = require("express");
const apiRouter = express.Router();
const { getUserById } = require("../db/adapters/users");

apiRouter.get("/health", (req, res) => {
  res.send("made man");
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const routine_activitiesRouter = require("./routine_activities");
apiRouter.use("/routine_activities", routine_activitiesRouter);

// const tagsRouter = require("./tags");
// apiRouter.use("/tags", tagsRouter);

module.exports = apiRouter;
