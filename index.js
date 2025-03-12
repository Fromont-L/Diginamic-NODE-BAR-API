// CONFIG
const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const { swaggerUi, specs } = require('./config/swaggerConfig.js');

// BDD
const db = require("./config/db")
require("./models/index.js")

db.authenticate()
  .then(() => {
    console.log('Database connection established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

// ROUTES
const barRouter = require("./router/barRouter.js")
const biereRouter = require("./router/biereRouter.js")
const commandeRouter = require("./router/commandeRouter.js")
const biereCommandeRouter = require("./router/biereCommandeRouter.js")
app.use(barRouter)
app.use(biereRouter);
app.use(commandeRouter);
app.use(biereCommandeRouter);


// SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});