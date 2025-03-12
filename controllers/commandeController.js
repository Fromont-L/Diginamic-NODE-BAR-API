const Commande = require("../models/commande");
const Bar = require("../models/bar");
const Bieres = require("../models/biere");

const PDFDocument = require('pdfkit');
const fs = require('fs');

// Ajouter une commande à un bar
const ajouterCommande = async (req, res) => {
  const { id_bar } = req.params;
  const { name, prix, date, status } = req.body;

  const bar = await Bar.findByPk(id_bar);
  if (!bar) {
    return res.status(404).json({ message: "Bar non trouvé" });
  }

  const commande = await Commande.create({ name, prix, date, status, BarId: id_bar });
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

// Avancées 2:

const pdfCommande = async (req, res) => {
  const commandeId = req.params.id;
  const commande = await Commande.findByPk(commandeId, {
    include: [{
      model: Bieres,
      through: 'CommandeBiere'
    }]
  });

  if (!commande) return res.status(404).json({ message: "Commande non trouvée" });

  const doc = new PDFDocument();
  const filename = `commande_${commandeId}.pdf`;
  const filepath = `./public/pdfs/${filename}`;

  const stream = fs.createWriteStream(filepath);
  doc.pipe(stream);

  doc.text(`Détails de la commande #${commandeId}`, { align: 'center' });
  doc.moveDown();
  doc.text(`Date: ${commande.date}`);
  doc.text(`Status: ${commande.status}`);
  doc.text(`Prix: ${commande.prix} €`);
  doc.moveDown();
  doc.text('Bières:');

  commande.Bieres.forEach(biere => {
    doc.text(`- ${biere.name}: ${biere.degree}°, ${biere.prix} €`);
  });

  doc.end();

  stream.on('finish', () => {
    res.download(filepath, filename, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).json({ message: 'Erreur lors du téléchargement du fichier' });
      }
      fs.unlink(filepath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('Error deleting file:', unlinkErr);
        }
      });
    });
  });

  stream.on('error', (err) => {
    console.error('Error creating PDF:', err);
    res.status(500).json({ message: 'Erreur lors de la création du PDF' });
  });
};


module.exports = { ajouterCommande, modifierCommande, supprimerCommande, listeCommandes, detailCommande, pdfCommande };