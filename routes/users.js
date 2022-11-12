const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const usersRouter = require("express").Router();
const { createUser, getUserByUsername } = require("../db/adapters/users");
const { getPublicRoutinesByUser } = require("../db/adapters/routines");

const { authRequired } = require("./utils");

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user1 = await getUserByUsername(username);
    console.log("test log", username, password);

    if (user1) {
      next({
        name: "NotNewUserError",
        message: "That username has been taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await createUser({ username, password: hashedPassword });

    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({ user });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log({ username, password });
    const user = await getUserByUsername(username);
    const validPassword = await bcrypt.compare(password, user.password);

    delete user.password;

    if (validPassword) {
      const token = jwt.sign(user, process.env.JWT_SECRET);

      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      delete user.password;

      res.send({ user });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", authRequired, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:username/routines", async (req, res, next) => {
  try {
    const { username } = req.params;
    const routines = await getPublicRoutinesByUser(username);

    res.send(routines);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      loggedIn: false,
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
