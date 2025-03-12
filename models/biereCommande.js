const db = require("../config/db");
const sequelize = require("sequelize");
const Biere = require("./biere");
const Commande = require("./commande");

const BiereCommande = db.define("BiereCommande", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  biere_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Biere,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  commande_id: {
    type: sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Commande,
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

// Définition des relations
Biere.belongsToMany(Commande, { through: BiereCommande, foreignKey: "BiereId" });
Commande.belongsToMany(Biere, { through: BiereCommande, foreignKey: "CommandeId" });

module.exports = BiereCommande;