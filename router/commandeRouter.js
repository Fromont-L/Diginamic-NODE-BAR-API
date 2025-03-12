const express = require("express");
const commandeRouter = express.Router();

const {

    ajouterCommande,
    modifierCommande,
    supprimerCommande,
    listeCommandes,
    detailCommande,
    pdfCommande
} = require("../controllers/commandeController.js");

commandeRouter.post("/bars/:id_bar/commandes", ajouterCommande);
commandeRouter.put("/commandes/:id", modifierCommande);
commandeRouter.delete("/commandes/:id", supprimerCommande);
commandeRouter.get("/bars/:id_bar/commandes", listeCommandes);
commandeRouter.get("/commandes/:id", detailCommande);

commandeRouter.get("/commandes/details/:id", pdfCommande);


module.exports = commandeRouter;

