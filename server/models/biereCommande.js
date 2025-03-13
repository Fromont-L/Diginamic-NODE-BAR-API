const db = require("../config/db");
const sequelize = require("sequelize");

const BiereCommande = db.define("BiereCommande", {
  BiereId: {
    type: sequelize.INTEGER,
    references: { model: "Bieres", key: "id" },
  },
  CommandeId: {
    type: sequelize.INTEGER,
    references: { model: "Commandes", key: "id" },
  },
}, {onDelete: "CASCADE"});

module.exports = BiereCommande;