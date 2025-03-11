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
    unique: true,
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
  bars_id: { 
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "Bar",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

Bar.hasMany(Biere, { foreignKey: "bars_id", as: "Bieres" });
Biere.belongsTo(Bar, { foreignKey: "bars_id", as: "Bar" });

module.exports = Biere;