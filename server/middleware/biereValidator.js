const { body, validationResult } = require("express-validator");

const biereValidator = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom est obligatoire")
    .isString()
    .withMessage("Le nom doit être une chaîne de caractères"),

    body("description")
    .optional()
    .isString()
    .withMessage("La description doit être une chaîne de caractères"),

    body("degree")
    .notEmpty()
    .withMessage("Le degré est obligatoire")
    .isFloat()
    .withMessage("Le degré doit être un nombre"),

    body("prix")
    .notEmpty()
    .withMessage("Le prix est obligatoire")
    .isFloat({min : 0.01})
    .withMessage("Le prix doit être un nombre"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = biereValidator;
