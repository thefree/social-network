module.exports = (sequelize, Sequelize) => {
  const Publication = sequelize.define("publication", {
    userId: {
      type: Sequelize.NUMBER,
    },
    name: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    imageUrl: {
      type: Sequelize.STRING,
    },
    likes: {
      type: Sequelize.NUMBER,
    },
    dislikes: {
      type: Sequelize.NUMBER,
    },
    published: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return Publication;
};
