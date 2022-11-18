const routine_activitiesRouter = require("express").Router();

const {
  RoutineActivities,
  getRoutineActivityById,
  destoryRoutineAct,
  addActivityToRoutine,
  updateRoutineActivity,
} = require("../db/adapters/routine_activities");

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
    const { activity_id, count, duration } = req.body;
    const { routineid } = req.params;
    console.log("test");

    try {
      console.log("line 30", routineid, activity_id, duration, count);
      const newRoutineActivity = addActivityToRoutine(
        routineid,
        activity_id,
        duration,
        count
      );
      if (routineid && activity_id) {
        console.log("both ids", routineid, activity_id, duration, count);
        res.send({
          routineActivity: newRoutineActivity,
        });
      } else {
        console.log("next");
        next({
          name: "error",
          message: "can't add activity!",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

// routine_activitiesRouter.delete(
//   "/:routineActivityId",
//   async (req, res, next) => {
//     try {
//       const routineact = getRoutineActivityById(req.params.routineActivityId);

//       if (routineact.routine_id === req.user.id) {
//         const deletedRa = destoryRoutineAct();
//         res.send( { RoutineActivities: deletedRa } )
//       } else {
//         next(
//           RoutineActivities
//             ? {
//                 name: "UnauthorizedUserError",
//                 message: "You cannot delete a routine which is not yours",
//               }
//             : {
//                 name: "RoutineNotFoundError",
//                 message: "That routine does not exist",
//               }
//         );
//       }
//       }catch ({ name, message }) {
//         next({ name, message });
//       }
//     }
// )

routine_activitiesRouter.delete(
  "/:routineid/:activityid",
  async (req, res, next) => {
    try {
      const deletedRa = destoryRoutineAct(
        req.params.routineid,
        req.params.activityid
      );
      res.send({ RoutineActivities: deletedRa });

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
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

routine_activitiesRouter.patch(
  "/:routineId/:activityId",
  async (req, res, next) => {
    const { routineId } = req.params;
    const { activityId } = req.params;
    const { count, duration } = req.body;
    const updateFields = {};

    if (count) {
      updateFields.count = count;
    }

    if (duration) {
      updateFields.duration = duration;
    }

    try {
      const updatedRoutAct = updateRoutineActivity(
        routineId,
        activityId,
        updateFields.count,
        updateFields.duration
      );
      res.send({ routAct: updatedRoutAct });
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

module.exports = routine_activitiesRouter;
