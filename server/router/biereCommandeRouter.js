const express = require("express");
const router = express.Router();
const { ajouterBiereACommande, supprimerBiereDeCommande, ListeBieresDeCommande } = require("../controllers/biereCommandeController");

// Ajouter une bière à une commande
router.post("/commandes/:id/biere/:id_biere", ajouterBiereACommande);

// Supprimer une bière d'une commande
router.delete("/commandes/:id/biere/:id_biere", supprimerBiereDeCommande);

router.get("/commandes/:id/biere",ListeBieresDeCommande);


module.exports = router;