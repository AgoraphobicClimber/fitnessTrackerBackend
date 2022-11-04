const express = require("express");
const bcrypt = require("bcrypt");
const activityRouter = require("express").Router();
const { Activities } = require("../db/adapters/activities");
const { Routine } = require("../db/adapters/routines");
const { JWT_SECRET } = process.env;
const { authRequired } = require("./index");
const SALT_ROUNDS = 10;

activityRouter.get("/activities", async (req, res, next) => {
  try {
    const allActivities = await Activities.getAllActivities();

    res.send({ activity: allActivities });
  } catch (error) {
    next(error);
  }
});

activityRouter.post("/activities", authRequired, async (req, res, next) => {
  const { id, name, description } = req.body;

  const activityData = {
    id,
    name,
    description,
  };

  try {
    const newActivity = Activities.createActivity(activityData);
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
  "/activities/:activityId",
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
      const originalActivity = Activities.getActivityById(activityId);

      if (originalActivity) {
        const updatedActivity = Activities.updateActivity(
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
  "/activities/:activityId/routines",
  async (req, res, next) => {
    const { activityId } = req.params;

    try {
      const routinesWithActivity = await Routine.getPublicRoutineByActivity(
        activityId
      );

      res.send({ routine: routinesWithActivity });
    } catch (error) {
      next(error);
    }
  }
);
