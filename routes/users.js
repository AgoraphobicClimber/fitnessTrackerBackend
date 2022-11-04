const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { User } = require("../db/adapters/users");
const { Routines } = require("../db/adapters/routines");
const SALT_ROUNDS = 10;
const { JWT_SECRET } = process.env;
const authRequired = require("./utils");

authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.createUser({ username, password: hashedPassword });

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

authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log({ username, password });
    const user = await User.getUserByUsername(username);
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

authRouter.get("/me", authRequired, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

authRouter.get("/users/:username/routines", async (req, res, next) => {
  try {
    const { username } = req.params;
    const routines = Routines.getPublicRoutinesByUser(username);

    res.send(routines);
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
