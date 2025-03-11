const db = require("../config/db");
const sequelize = require("sequelize");

const Commande = db.define("Commande", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  prix: {
    type: sequelize.FLOAT,
    validate: {
      min: 0
    },
    allowNull: false,
  },
  date: {
    type: sequelize.DATE,
    allowNull: false,
  },
  status: {
    type: sequelize.ENUM('en cours', 'terminée'),
    allowNull: false,
  }
});

module.exports = Commande;