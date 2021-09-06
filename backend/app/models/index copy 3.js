const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite-dev.db",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.publications = require("../models/publication.model.js")(
  sequelize,
  Sequelize
);
db.comments = require("../models/comment.model.js")(sequelize, Sequelize);

db.publications.hasMany(db.comments, { as: "comments" });

db.comments.belongsTo(db.publications, {
  foreignKey: "publicationId",
  as: "publication",
});

db.refreshToken = require("../models/refreshToken.model.js")(
  sequelize,
  Sequelize
);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id",
});
db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
  targetKey: "id",
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
