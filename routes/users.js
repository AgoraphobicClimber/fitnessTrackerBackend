
const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { createUser, getUserByUsername } = require("../db/adapters/users");
const { getPublicRoutinesByUser } = require("../db/adapters/routines");
const SALT_ROUNDS = 10;
const { JWT_SECRET } = process.env;
const { authRequired } = require("./utils");

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("test log", username, password)

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({ username, password: hashedPassword });
console.log(user)
    delete user.password;

    const token = jwt.sign(user, JWT_SECRET);

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
    console.log(user);
    const validPassword = await bcrypt.compare(password, user.password);

    delete user.password;

    if (validPassword) {
      const token = jwt.sign(user, JWT_SECRET);

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

module.exports = usersRouter;
