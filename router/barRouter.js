const express = require("express")
const {ajouterBar, modifierBar, supprimerBar, listeBars,  detailBiere, getBarCommandesParDate, getBarCommandesParPrix, getBarsParVille, getBarsParNom, getDegreeBiereMoyen} = require("../controllers/barController.js");
const barRouter = express.Router()
const barValidator = require("../middleware/barValidator.js")

barRouter.post("/bars", barValidator, ajouterBar)
barRouter.put("/bars/:id", modifierBar)
barRouter.delete("/bars/:id", supprimerBar)
barRouter.get("/bars/:id", detailBiere)

barRouter.get("/bars/:id/commandes", getBarCommandesParDate)
barRouter.get("/bars/:id/commandes", getBarCommandesParPrix)

// barRouter.get("/bars", getBarsParVille)
// barRouter.get("/bars", getBarsParNom)
// barRouter.get("/bars", listeBars)
barRouter.get("/bars", (req, res, next) => {
    if (req.query.ville) {
      return getBarsParVille(req, res, next);
    } else if (req.query.name) {
      return getBarsParNom(req, res, next);
    } else {
      return listeBars(req, res, next);
    }
  });
  

barRouter.get("/bars/:id/degree", getDegreeBiereMoyen)

module.exports = barRouter