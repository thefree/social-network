module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    name: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.STRING,
    },
    publicationID: {
      type: DataTypes.NUMBER,
    },
    likes: {
      type: DataTypes.NUMBER,
    },
    dislikes: {
      type: DataTypes.NUMBER,
    },
    published: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Comment;
};
