module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("comment", {
    userId: {
      type: DataTypes.NUMBER,
    },
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
      defaultValue: true,
    },
  });

  return Comment;
};
