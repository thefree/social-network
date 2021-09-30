const db = require("../models");
const User = db.user;
const PublicationCtrl = require("../controllers/publication.controller");
const CommentCtrl = require("../controllers/comment.controller");

const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userWithPub = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, { include: ["publications"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

exports.userBoard = (req, res) => {
  // res.status(200).send("User Content.");
  res.status(200).send("OK");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving User List.",
      });
    });
};
// DELETE BY USER HIMSELF !
exports.deleteUser = (req, res) => {
  const id = req.userId;

  PublicationCtrl.deleteAllByUser(req, res);

  CommentCtrl.deleteAllByUser(req, res);

  CommentCtrl.deleteAllPubIsNull();

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
// DELETE BY ADMIN OR MODERATOR
exports.deleteUserById = (req, res) => {
  const id = req.params.id;
  PublicationCtrl.deleteAllByUserID(req, res);

  CommentCtrl.deleteAllByUserID(req, res);

  CommentCtrl.deleteAllPubIsNull();

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};
