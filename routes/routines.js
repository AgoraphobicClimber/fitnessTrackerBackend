
const routineRouter = require("express").Router();
const { getRoutineById, getAllPublicRoutines, createRoutine, updateRoutine, destroyRoutine } = require("../db/adapters/routines");
const { authRequired } = require("./utils");

// GET /routes/routines
routineRouter.get("/", async (req, res, next) => {
  try {
    const allRoutines = await getAllPublicRoutines();

    res.send(allRoutines);
  } catch (error) {
    next(error);
  }
});

routineRouter.post("/", authRequired, async (req, res, next) => {
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
    if (newRoutine) {
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
});

routineRouter.patch(
  "/routines/:routineId",
  authRequired,
  async (req, res, next) => {
    const { routineId } = req.params;
    const { is_public, name, goal } = req.body;
    const updateFields = {};

    if (is_public) {
      updateFields.is_public = is_public;
    }

    if (name) {
      updateFields.name = name;
    }

    if (goal) {
      updateFields.goal = goal;
    }

    try {
      const originalRoutine = Routine.getRoutineById(routineId);

      if (originalRoutine.creator_id === req.user.id) {
        const updatedRoutine = Routine.updateRoutine(routineId, updateFields);
        res.send({ routine: updatedRoutine });
      } else {
        next({
          name: "UnauthorizedUserError",
          message: "You cannot update a post that is not yours",
        });
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  }
);

routineRouter.delete(
  "/routines/:routineId",
  authRequired,
  async (req, res, next) => {
    try {
      const routine = await getRoutineById(req.params.routineId);

      if (routine.creator_id === req.user.id) {
        const deletedRoutine = Routine.destroyRoutine();
        res.send({ routine: deletedRoutine });
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
  }
);

module.exports = routineRouter