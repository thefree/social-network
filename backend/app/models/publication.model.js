module.exports = (sequelize, Sequelize) => {
  const Publication = sequelize.define("publication", {
    userId: {
      type: Sequelize.NUMBER,
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
    },
  });

  return Publication;
};
