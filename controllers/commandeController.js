//const Biere = require("../models/biere");
const Commande = require("../models/commande");
const Bar = require("../models/bar");

// Ajouter une commande à un bar
const ajouterCommande = async (req, res) => {
  const { id_bar } = req.params;
  const { name, prix, date, status } = req.body;

  const bar = await Bar.findByPk(id_bar);
  if (!bar) {
    return res.status(404).json({ message: "Bar non trouvé" });
  }

  const commande = await Commande.create({ name, prix, date, status, bars_id: id_bar });
  res.status(201).json(commande);
};

// Modifier une commande d'un bar
const modifierCommande = async (req, res) => {
  const { id_commande } = req.params;
  const { name, prix, date, status } = req.body;

  const [updatedRows, updatedCommande] = await Commande.update(
    { name, prix, date, status },
    { where: { id: id_commande }, returning: true }
  );

  if (updatedRows === 0) {
    return res.status(404).json({ message: "Commande non trouvée" });
  }

  res.json(updatedCommande[0]);
};

// Supprimer une commande d'un bar
const supprimerCommande = async (req, res) => {
  const { id_commande } = req.params;

  const commande = await Commande.findByPk(id_commande);
  if (!commande) {
    return res.status(404).json({ message: "Commande non trouvée" });
  }

  await commande.destroy();
  res.json({ message: "Commande supprimée avec succès" });
};

// Liste des commandes d'un bar
const listeCommandes = async (req, res) => {
  const { id_bar } = req.params;

  const bar = await Bar.findByPk(id_bar, { include: Commande });
  if (!bar) {
    return res.status(404).json({ message: "Bar non trouvé" });
  }

  res.json(bar.Commandes);
};

// Détail d'une commande d'un bar
const detailCommande = async (req, res) => {
  const { id_commande } = req.params;

  const commande = await Commande.findByPk(id_commande);
  if (!commande) {
    return res.status(404).json({ message: "Commande non trouvée" });
  }

  res.json(commande);
};

module.exports = { ajouterCommande, modifierCommande, supprimerCommande, listeCommandes, detailCommande };

