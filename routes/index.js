const express = require("express");
const apiRouter = express.Router();
const { getUserById } = require("../db/adapters/users");

apiRouter.get("/health", (req, res) => {
  res.send("made man");
});

const usersRouter = require("./users");
apiRouter.use('/users',usersRouter);

const routineRouter = require("./routines")
apiRouter.use('/routines',routineRouter)

const activityRouter = require("./activities")
apiRouter.use('/activities', activityRouter)

const routine_activitiesRouter = require("./routine_activities");
apiRouter.use('/routine_activities', routine_activitiesRouter);


module.exports = apiRouter;
