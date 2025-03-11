const express = require("express")
const {ajouterBiere, modifierBiere, supprimerBiere, listeBieres, detailBiere} = require("../controllers/biereController");
const biereRouter = express.Router()
const biereValidator = require("../middleware/barValidator.js");

biereRouter.post("/bars/:id_bar/biere", biereValidator, ajouterBiere);
biereRouter.put("/biere/:id_biere", biereValidator, modifierBiere);
biereRouter.delete("/biere/:id_biere", supprimerBiere);
biereRouter.get("/bars/:id_bar/biere", listeBieres);
biereRouter.get("/biere/:id_biere", detailBiere);

module.exports = biereRouter;
