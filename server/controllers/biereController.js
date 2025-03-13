const Biere = require("../models/biere");
const Bar = require("../models/bar");

// Ajouter une bière

  const ajouterBiere = async (req, res) => {
    const { id_bar } = req.params;
    const { name, description, degree, prix } = req.body;

    const bar = await Bar.findByPk(id_bar);
    if (!bar) {
      return res.status(404).json({ message: "Bar non trouvé" });
    }

    const biere = await Biere.create({ name, description, degree, prix, BarId: id_bar });
    res.status(201).json(biere);
  
};


// Modifier une bière
const modifierBiere = async (req, res) => {
  const { id_biere } = req.params;
  const { name, description, degree, prix } = req.body;

  const [updatedRows, updatedBieres] = await Biere.update(
    { name, description, degree, prix },
    { where: { id: id_biere }, returning: true }
  );

  if (updatedRows === 0) {
    return res.status(404).json({ message: "Bière non trouvée" });
  }

  res.json(updatedBieres[0]);
};


// Supprimer une bière
const supprimerBiere = async (req, res) => {
  const { id_biere } = req.params;

  const biere = await Biere.findByPk(id_biere);
  if (!biere) {
    return res.status(404).json({ message: "Bière non trouvée" });
  }

  await biere.destroy();
  res.json({ message: "Bière supprimée avec succès" });
};

// Liste des bières d'un bar
const listeBieres = async (req, res) => {
  const { id_bar } = req.params;

  const bar = await Bar.findByPk(id_bar, { include: Biere });
  if (!bar) {
    return res.status(404).json({ message: "Bar non trouvé" });
  }

  res.json(bar.Bieres);
};

// Détail d'une bière
const detailBiere = async (req, res) => {
  const { id_biere } = req.params;

  const biere = await Biere.findByPk(id_biere);
  if (!biere) {
    return res.status(404).json({ message: "Bière non trouvée" });
  }

  res.json(biere);
}; 

module.exports = { ajouterBiere, modifierBiere, supprimerBiere, listeBieres, detailBiere };
