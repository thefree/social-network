const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  // console.log("REQUEST_HEADERS", req.headers);
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    });
  });
};

const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!",
      });
    });
  });
};

const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    });
  });
};

// const isModOrAdm = (req, res, next) => {
isModOrAdm = (req, userid) => {
  console.log("IS_MODADM_FUNC ENTER:", userid);
  // var response = "user";

  User.findByPk(userid)
    .then((user) => {
      user.getRoles().then((roles) => {
        let response = "";
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "moderator") {
            // next();
            // return true;
            let response = "";
            console.log("USER ROLES:", roles[i].name);
            req.role = roles[i].name;
            response = roles[i].name;
            return response;
            // return response;
          }

          if (roles[i].name === "admin") {
            // next();
            // return true;
            let response = "";
            console.log("USER ROLES:", roles[i].name);
            req.role = roles[i].name;

            response = roles[i].name;
            return response;
            // return response;
            // return "FRITZ";
          }
        }
        // return false;
        return response;
      });
    })
    .catch((err) => {
      console.log("IS_MODADM_FUNC pas de user:", userid);
    });
  // return response;
  // return req.role;
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
  isModOrAdm,
};
module.exports = authJwt;
