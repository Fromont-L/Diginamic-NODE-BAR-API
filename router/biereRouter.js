const {ajouterBiere, modifierBiere, supprimerBiere, listeBieres, detailBiere} = require("../controller/biereController");
const router = express.Router();
const { body, param } = require("express-validator");

const validateBiere = [
    body("name").notEmpty().withMessage("Nom obligatoire").isString(),
];

router.post("/bars/:id_bar/biere", validateBiere, ajouterBiere);
router.put("/biere/:id_biere", validateBiere, modifierBiere);
router.delete("/biere/:id_biere", supprimerBiere);
router.get("/bars/:id_bar/biere", listeBieres);
router.get("/biere/:id_biere", detailBiere);

module.exports = router;
