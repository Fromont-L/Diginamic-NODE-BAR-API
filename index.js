// CONFIG
const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

// BDD
const db = require("./config/db")
const barRouter = require("./router/barRouter.js")
const biereRouter = require("./router/biereRouter.js")
const commandeRouter = require("./router/commandeRouter.js")
const biereCommandeRouter = require("./router/biereCommandeRouter.js")

require("./models/index.js")
app.use(barRouter)
app.use(biereRouter);
app.use(commandeRouter);
app.use(biereCommandeRouter);


db.authenticate()
  .then(() => {
    console.log('Database connection established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })


const PORT = 3000;

app.listen(PORT, () => {
  console.log("Tourne sur le port : ", PORT);
});