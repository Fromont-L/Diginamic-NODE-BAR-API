const { Biere } = require("../models/biere");
const { validationResult } = require("express-validator");

// Ajouter une bière
const ajouterBiere = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id_bar } = req.params;
  const { name, description, degree, prix } = req.body;

  Bar.findByPk(id_bar)
    .then((bar) => {
      if (!bar) return res.status(404).json({ message: "Bar non trouvé" });
      return Biere.create({ name, description, degree, prix }).then((biere) => {
        bar.addBiere(biere);
        res.status(201).json(biere);
      });
    })
    .catch((error) => res.status(500).json(error));
};

// Modifier une bière
const modifierBiere = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id_biere = parseInt(req.params.id_biere);
  const { name, description, degree, prix } = req.body;

  Biere.update(
    { name, description, degree, prix },
    { where: { id: id_biere }, returning: true }
  )
    .then(([updatedRows, updatedBieres]) => {
      if (updatedRows === 0) {
        return res.status(404).json({ message: "Bière non trouvée" });
      }
      res.json(updatedBieres[0]);
    })
    .catch((error) => res.status(500).json(error));
};

// Supprimer une bière
const supprimerBiere = (req, res) => {
  const id_biere = parseInt(req.params.id_biere);

  Biere.findByPk(id_biere)
    .then((biere) => {
      if (!biere) return res.status(404).json({ message: "Bière non trouvée" });
      return biere.destroy().then(() => res.json({ message: "Bière supprimée avec succès" }));
    })
    .catch((error) => res.status(500).json(error));
};

// Liste des bières
const listeBieres = (req, res) => {
  const id_bar = parseInt(req.params.id_bar);

  Bar.findByPk(id_bar, { include: Biere })
    .then((bar) => {
      if (!bar) return res.status(404).json({ message: "Bar non trouvé" });
      res.json(bar.Bieres);
    })
    .catch((error) => res.status(500).json(error));
};

// Détail bière
const detailBiere = (req, res) => {
  const id_biere = parseInt(req.params.id_biere);

  Biere.findByPk(id_biere)
    .then((biere) => {
      if (!biere) return res.status(404).json({ message: "Bière non trouvée" });
      res.json(biere);
    })
    .catch((error) => res.status(500).json(error));
};

module.exports = { ajouterBiere, modifierBiere, supprimerBiere, listeBieres, detailBiere };
