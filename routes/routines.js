const routineRouter = require("express").Router();
const {
  getRoutineById,
  getAllPublicRoutines,
  createRoutine,
  updateRoutine,
  destoryRoutine,
  getAllRoutines
} = require("../db/adapters/routines");
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
routineRouter.get("/myroutines",async (req,res,next)=>{
  try {
    const allRoutines = await getAllRoutines()
    res.send(allRoutines)
  } catch (error) {
    next(error)
  }
})

routineRouter.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const Routine = await getRoutineById(id);

    res.send(Routine);
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
    const newRoutine = createRoutine(routineData);
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

routineRouter.patch("/:routineId", authRequired, async (req, res, next) => {
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
    const originalRoutine = getRoutineById(routineId);

    // if (originalRoutine.creator_id === req.user.id) {
    const updatedRoutine = updateRoutine(
      routineId,
      updateFields.is_public,
      updateFields.name,
      updateFields.goal
    );
    res.send({ routine: updatedRoutine });
    // } else {
    //   next({
    //     name: "UnauthorizedUserError",
    //     message: "You cannot update a post that is not yours",
    //   });
    // }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routineRouter.delete("/:routineId", authRequired, async (req, res, next) => {
  const { routineId } = req.params;

  try {
    const routine = await getRoutineById(routineId);

    if (routine.creator_id === req.user.id) {
      const deletedRoutine = destoryRoutine(routineId);
      console.log("past destroy routine");
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
});




module.exports = routineRouter;
