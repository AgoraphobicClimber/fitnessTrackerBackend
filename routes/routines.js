const express = require("express");
const bcrypt = require("bcrypt");
const routineRouter = require("express").Router();
const { Routine, getRoutineById } = require("../db/adapters/routines");
const { JWT_SECRET } = process.env; 
const { authRequired } = require("./index")
const SALT_ROUNDS = 10;

routineRouter.get("/routines", async (req, res, next) => {
  try {
    const allRoutines = await Routine.getAllPublicRoutines(); 

    res.send({ routine: allRoutines} )
  } catch (error) {
    next(error);
  }
})

routineRouter.post("/routines", authRequired, async (req, res, next) => {
    const { id } = req.user;
    const { is_public, name, goal } = req.body;

    const routineData = {
        creator_id: id,
        is_public,
        name,
        goal,
    };

    try {
        const newRoutine = Routine.createRoutine(routineData);
        if(newRoutine) {
            res.send({
               routine: newRoutine,
              });
        } else {
            next({
              name: "error",
              message: "can't create routine!",
            });
          }
    } catch ({ name, message }) {
        next({ name, message });
      }
})

routineRouter.patch("/routines/:routineId", authRequired, async (req, res, next) => {
    const { routineId } = req.params;
    const { is_public, name, goal } = req.body;
    const updateFields = {};

    if (is_public) {
        updateFields.is_public = is_public;
    }

    if(name) {
        updateFields.name = name;
    }

    if(goal) {
        updateFields.goal = goal; 
    }

    try {
        const getRoutine = Routine.getRoutineById(routineId);

        if(getRoutine.creator_id === req.user.id) {
            const updatedRoutine = Routine.updateRoutine();
            res.send({ routine: updatedRoutine} );
        } else {
            next({
              name: "UnauthorizedUserError",
              message: "You cannot update a post that is not yours",
        });

    }
    } catch ({ name, message }) {
    next({ name, message });
  }
})

routineRouter.delete("/routines/:routineId", authRequired, async (req, res, next) => {
    try {
        const routine = await getRoutineById(req.params.routineId); 

        if (routine.creator.id === req.user.id) {
            const deletedRoutine = Routine.destroyRoutine();
            res.send({ routine: deletedRoutine })
        } else {
            next(
                routine
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
          } catch ({ name, message }) {
            next({ name, message });
          }
        });