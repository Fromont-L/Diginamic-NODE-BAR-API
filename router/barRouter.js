const express = require("express")
const {addBar,updateBar, deleteBar, getAllBars,  getBarDetails} = require("../controllers/barController.js");
const barRouter = express.Router()
const barValidator = require("../middleware/barValidator.js")

barRouter.post("/bars", barValidator, addBar)
barRouter.put("/bars/:id", updateBar)
barRouter.delete("/bars/:id", deleteBar)
barRouter.get("/bars", getAllBars)
barRouter.get("/bars/:id", getBarDetails)

module.exports = barRouter