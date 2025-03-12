const db = require("../config/db");
const sequelize = require("sequelize");

const Bar = db.define("Bar", {
  id: {
    type: sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  adresse: {
    type: sequelize.STRING,
    allowNull: false,
  },
  tel: {
    type: sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = Bar;

/**
 * @swagger
 * components:
 *   schemas:
 *     Bar:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the bar
 *         name:
 *           type: string
 *           description: The name of the bar
 *         adresse:
 *           type: string
 *           description: The address of the bar
 *         tel:
 *           type: string
 *           description: The phone number of the bar
 *         email:
 *           type: string
 *           description: The email of the bar
 *         description:
 *           type: string
 *           description: A description of the bar
 */
