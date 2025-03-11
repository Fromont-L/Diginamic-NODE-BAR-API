const express = require("express")
const {addBar,updateBar, deleteBar, getAllBars,  getBarDetails} = require("../controller/barController.js");
const barRouter = express.Router()

barRouter.post("/bars", addBar)
barRouter.put("/bars/:id", updateBar)
barRouter.delete("/bars/:id", deleteBar)
barRouter.get("/bars", getAllBars)
barRouter.get("/bars/:id", getBarDetails)

module.exports = barRouter