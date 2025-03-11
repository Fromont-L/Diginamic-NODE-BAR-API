const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const PORT = 3000;

app.listen(PORT, () => {
  console.log("Tourne sur le port : ", PORT);
});