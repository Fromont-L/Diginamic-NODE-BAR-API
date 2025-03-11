const express = require("express")
const {ajouterBar, modifierBar, supprimerBar, getAllBars,  getBarDetails, getBarCommandesParDate, getBarCommandesParPrix, getBarsParVille, getBarsParNom, getDegreeBiereMoyen} = require("../controllers/barController.js");
const barRouter = express.Router()
const barValidator = require("../middleware/barValidator.js")

barRouter.post("/bars", barValidator, ajouterBar)
barRouter.put("/bars/:id", modifierBar)
barRouter.delete("/bars/:id", supprimerBar)

barRouter.get("/bars/:id/commandes", getBarCommandesParDate)
barRouter.get("/bars/:id/commandes", getBarCommandesParPrix)
barRouter.get("/bars", getBarsParVille)
barRouter.get("/bars", getBarsParNom)

barRouter.get("/bars", getAllBars)
barRouter.get("/bars/:id", getBarDetails)

barRouter.get("/bars/:id/degree", getDegreeBiereMoyen)

module.exports = barRouter