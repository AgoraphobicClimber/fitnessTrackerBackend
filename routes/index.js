const express = require("express");
const apiRouter = express.Router();
const { getUserById } = require("./adapters/users")
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authRequired = (req, res, next) => {
  const token = req.signedCookies.token;
  console.log("Cookie Token:", token);
  try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    console.log("REQ.USER: ", req.user);
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "You are def not authorized.",
    });
    return;
  }
  next();
};

apiRouter.use(async (req, res, next) => {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");
  
    if (!auth) {
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
  
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
  
        if (id) {
          req.user = await getUserById(id);
          next();
        }
      } catch ({ name }) {
        next({ name });
      }
    } else {
      next({
        name: "AuthorizationHeaderError",
        message: `Authorization token must start with ${prefix}`,
      });
    }
  });

const healthRouter = require("./health");
apiRouter.use("/health", healthRouter);

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const tagsRouter = require("./tags");
apiRouter.use("/tags", tagsRouter);

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = apiRouter, { authRequired };