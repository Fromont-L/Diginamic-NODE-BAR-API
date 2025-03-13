const BiereCommande = require("../models/biereCommande");
const Biere = require("../models/biere");
const Commande = require("../models/commande");

// Ajouter une bière à une commande
const ajouterBiereACommande = async (req, res) => {
  const { id, id_biere } = req.params;

  const commande = await Commande.findByPk(id);
  if (!commande) {
    return res.status(404).json({ message: "Commande non trouvée" });
  }

  const biere = await Biere.findByPk(id_biere);
  if (!biere) {
    return res.status(404).json({ message: "Bière non trouvée" });
  }

  const biereCommande = await BiereCommande.create({
    BiereId: id_biere,
    CommandeId: id,
  });

  res.status(201).json(biereCommande);
};

// Supprimer une bière d'une commande
const supprimerBiereDeCommande = async (req, res) => {
  const { id, id_biere } = req.params;

  const biereCommande = await BiereCommande.findOne({
    where: { BiereId: id_biere, CommandeId: id },
  });

  if (!biereCommande) {
    return res.status(404).json({ message: "Association bière-commande non trouvée" });
  }

  await biereCommande.destroy();
  res.json({ message: "Bière supprimée de la commande avec succès" });
};

module.exports = { ajouterBiereACommande, supprimerBiereDeCommande };