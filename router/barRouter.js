const express = require("express")
const {ajouterBar, modifierBar, supprimerBar, listeBars,  detailBiere, getBarCommandesParDate, getBarCommandesParPrix, getBarsParVille, getBarsParNom, getDegreeBiereMoyen, getDegreeBiereMoyenParPrix, getDegreeBiereMoyenParDate, getCommandesFiltrees, getBieresTriees} = require("../controllers/barController.js");
const barRouter = express.Router()
const barValidator = require("../middleware/barValidator.js")

barRouter.post("/bars", barValidator, ajouterBar)
barRouter.put("/bars/:id", modifierBar)
barRouter.delete("/bars/:id", supprimerBar)
barRouter.get("/bars/:id", detailBiere)


// Avancées :

barRouter.get("/bars", (req, res, next) => {
    if (req.query.ville) {
        return getBarsParVille(req, res, next);
    } else if (req.query.name) {
        return getBarsParNom(req, res, next);
    } else {
        return listeBars(req, res, next);
    }
});

barRouter.get("/bars/:id/degree", (req, res, next) => {
    if (req.query.prix_min && req.query.prix_max) {
        return getDegreeBiereMoyenParPrix(req, res, next);
    } else if (req.query.date) {
        return getDegreeBiereMoyenParDate(req, res, next);
    } else {
        return getDegreeBiereMoyen(req, res, next);
    }
});

barRouter.get("/bars/:id/commandes", (req, res, next) => {
    if (req.query.prix_min && req.query.prix_max) {
      return getBarCommandesParPrix(req, res, next);
    } else if (req.query.date) {
      return getBarCommandesParDate(req, res, next);
    } else {
      return getCommandesFiltrees(req, res, next);
    }
});

barRouter.get("/bars/:id/biere", getBieresTriees);


module.exports = barRouter