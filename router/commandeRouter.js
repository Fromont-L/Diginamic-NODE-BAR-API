const express = require("express");
const commandeRouter = express.Router();

const {
    ajouterCommande,
    modifierCommande,
    supprimerCommande,
    listeCommandes,
    detailCommande
} = require("../controllers/commandeController.js");

commandeRouter.post("/bars/:id_bar/commandes", ajouterCommande);
commandeRouter.put("/commandes/:id", modifierCommande);
commandeRouter.delete("/commandes/:id", supprimerCommande);
commandeRouter.get("/bars/:id_bar/commandes", listeCommandes);
commandeRouter.get("/commandes/:id", detailCommande);

module.exports = commandeRouter;