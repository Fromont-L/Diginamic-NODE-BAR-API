const db = require("../config/db");
const sequelize = require("sequelize");

const Commande = db.define("Commande", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prix: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0
    },
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('en cours', 'terminée'),
    allowNull: false,
  }
});

module.exports = Commande;