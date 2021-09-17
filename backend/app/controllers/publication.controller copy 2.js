const { user } = require("../models");
const db = require("../models");
const Publication = db.publications;
const User = db.user;
const Op = db.Sequelize.Op;
const { authJwt } = require("../middleware");

// Create and Save a new Publications
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Publication
  const publication = {
    title: req.body.title,
    description: req.body.description,
    // imageUrl: req.body.myfile,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    published: req.body.published ? req.body.published : false,
    userId: req.body.userId,
  };

  // Save Publications in the database
  Publication.create(publication)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Publication.",
      });
    });
};

// Retrieve all Publications from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Publication.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Publication.",
      });
    });
};

// Retrieve all Publications from the database.
exports.findAllByUser = (req, res) => {
  const userid = req.userId;
  var isModOrAdm = undefined;
  var role = "";
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // const userid = authJwt.isModOrAdm ? "" : req.userId;

  function setRole(lerole) {
    // console.log("FUNC_1 setRole", role);
    role = lerole;
    return role;
    // console.log("FUNC_2 setRole", role);
  }

  isModOrAdm = User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          setRole(roles[i].name);
          // return;

          console.log("TEST_ROLE_MOD: ", roles[i].name);
          console.log("TEST_ROLE_MOD_2 :", setRole(roles[i].name));
          return setRole(roles[i].name);

          // return true;
        }

        if (roles[i].name === "admin") {
          setRole(roles[i].name);
          // return;

          console.log("TEST_ROLE_ADM: ", roles[i].name);
          console.log("TEST_ROLE_MOD_2: ", setRole(roles[i].name));
          return setRole(roles[i].name);

          // return true;
        }
      }
    });
  });

  // isModOrAdm.then((result) => console.log("IS_MOD_OR_ADM", result));

  isModOrAdm.then(function (result) {
    console.log("IS_MOD_OR_ADM", result); // "Some User token"
  });

  console.log("IS_ROLE", role);

  if (isModOrAdm) {
    Publication.findAll({
      include: { model: User, as: "user" },
      where: condition,
      // where: {
      //   [Op.and]: [condition, { userId: userid }],
      // },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log("Probème sur isModOrAdm");
      });
    // } else if (userid) {
  }

  // if (!isModOrAdm) {
  if (!isModOrAdm) {
    Publication.findAll({
      include: { model: User, as: "user" },
      // where: condition,
      where: {
        [Op.and]: [condition, { userId: userid }],
      },
    })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log("Probème sur NOT isModOrAdm");
      });
  }
};

// Find a single Publications with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Publication.findByPk(id, { include: { model: User, as: "user" } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Publication with id=" + id,
      });
    });
};

exports.findByPk = (req, res) => {
  const id = req.params.id;

  // Publication.findByPk(id, { include: ["comments"] });
  Publication.findByPk(id, { include: ["comments", "user"] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Publication with id=" + id,
      });
    });
};

// Update a Publications by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Publication.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Publication was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Publication with id=${id}. Maybe Publication was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Publication with id=" + id,
      });
    });
};

// Delete a Publications with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Publication.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Publication was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Publication with id=${id}. Maybe Publication was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Publication with id=" + id,
      });
    });
};

// Delete all Publications from the database.
exports.deleteAll = (req, res) => {
  Publication.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Publication were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Publications.",
      });
    });
};

// find all published Publications
exports.findAllPublished = (req, res) => {
  Publication.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Publications.",
      });
    });
};
