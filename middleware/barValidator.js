const { body, validationResult } = require("express-validator");
const Bars = require("../models/bar");

const barValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom est obligatoire")
    .isString()
    .withMessage("Le nom doit être une chaîne de caractères")
    .custom(async (value) => {
      const bar = await Bars.findOne({ where: { name: value } });
      if (bar) {
        throw new Error("Le nom du bar doit être unique");
      }
    }),

  body("adresse")
    .trim()
    .notEmpty()
    .withMessage("L'adresse est obligatoire")
    .isString()
    .withMessage("L'adresse doit être une chaîne de caractères"),

  body("tel")
    .optional()
    .isString()
    .withMessage("Le numéro de téléphone doit être une chaîne de caractères"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("L'email est obligatoire")
    .isEmail()
    .withMessage("Format d'email invalide"),

  body("description")
    .optional()
    .isString()
    .withMessage("La description doit être une chaîne de caractères"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = barValidator;
