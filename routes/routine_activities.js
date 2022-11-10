const express = require("express");
const bcrypt = require("bcrypt");
const routine_activitiesRouter = require("express").Router();
const { Activities } = require("../db/adapters/activities");
const { Routine } = require("../db/adapters/routines");
const {
  RoutineActivities,
  getRoutineActivityById,
  destoryRoutineAct
} = require("../db/adapters/routine_activities");
const { JWT_SECRET } = process.env;
const { authRequired } = require("./utils");
const SALT_ROUNDS = 10;

routine_activitiesRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log("made it into route");
  try {
    const routine = await getRoutineActivityById(id);
    res.json(routine);
  } catch (error) {
    console.log(error);
  }
});

routine_activitiesRouter.post(
  "/:routineid/activities",
  async (req, res, next) => {
    const { activityId, count, duration } = req.body;
    const { routineId } = req.params;
    console.log("test");
    res.send(activityId, count, duration, routineId);

    try {
      const newRoutineActivity = RoutineActivities.addActivityToRoutine(routineId, activityId, count, duration);
      if ((routineId)&& (activityId)) {
        res.send({
          routineActivity: newRoutineActivity,
        });
      } else {
        next({
          name: "error",
          message: "can't create activity!",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

routine_activitiesRouter.delete(
  "/:routineActivityId",
  async (req, res, next) => {
    try {
      const routineact = getRoutineActivityById(req.params.routineActivityId);

      if (routineact.routine_id === req.user.id) {
        const deletedRa = destoryRoutineAct();
        res.send( { RoutineActivities: deletedRa } )
      } else {
        next(
          RoutineActivities
            ? {
                name: "UnauthorizedUserError",
                message: "You cannot delete a routine which is not yours",
              }
            : {
                name: "RoutineNotFoundError",
                message: "That routine does not exist",
              }
        );
      }
      }catch ({ name, message }) {
        next({ name, message });
      }
    }
)


module.exports = routine_activitiesRouter;
