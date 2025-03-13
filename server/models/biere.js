const db = require("../config/db");
const sequelize = require("sequelize");

const Biere = db.define("Biere", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: sequelize.STRING,
    allowNull: true,
  },
  degree: {
    type: sequelize.FLOAT,
    allowNull: true,
  },
  prix: {
    type: sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Biere;