

const activityRouter = require("express").Router();
const { getAllActivities, createActivity, getActivityById, updateActivity } = require("../db/adapters/activities")
const { getPublicRoutineByActivity } = require("../db/adapters/routines");
const { authRequired } = require("./utils");

activityRouter.get("/", async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();

    res.send(allActivities);
  } catch (error) {
    next(error);
  }
});

activityRouter.post("/", authRequired, async (req, res, next) => {
  const { id, name, description } = req.body;

  const activityData = {
    id,
    name,
    description,
  };

  try {
    const newActivity = createActivity(activityData);
    if (newActivity) {
      res.send({
        activity: newActivity,
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
});

activityRouter.patch(
  "/:activityId",
  authRequired,
  async (req, res, next) => {
    const { activityId } = req.params;
    const { name, description } = req.body;
    const updateFields = {};

    if (name) {
      updateFields.name = name;
    }

    if (description) {
      updateFields.description = description;
    }

    try {
      const originalActivity = getActivityById(activityId);

      if (originalActivity) {
        const updatedActivity = updateActivity(
          activityId,
          updateFields
        );
        res.send({ activity: updatedActivity });
      } else {
        next({
          name: "UnauthorizedUserError",
          message: "You cannot update an activity that doesn't exist",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

activityRouter.get(
  "/:activityId/routines",
  async (req, res, next) => {
    const { activityId } = req.params;

    try {
      const routinesWithActivity = await getPublicRoutineByActivity(
        activityId
      );

      res.send(routinesWithActivity);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = activityRouter;