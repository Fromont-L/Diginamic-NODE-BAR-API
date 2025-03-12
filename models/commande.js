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
        validate: { 
            isBefore: {
            args: new Date().toISOString(),
            msg: "La date ne peux pas être supérieure à aujourd'hui",
            }
        }
    },
    status: {
        type: sequelize.ENUM('brouillon', 'en cours', 'terminée'),
        allowNull: false,
    }
});

// Interdiction de modifier une commande terminée
Commande.beforeUpdate(async (commande, options) => {
    const commandeExistante = await Commande.findByPk(commande.id);
    if (commandeExistante.status === "terminée") {
      throw new Error("Une commande terminée ne peut pas être modifiée");
    }
});

module.exports = Commande;