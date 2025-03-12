const { Op, Sequelize } = require("sequelize");

const Bars = require("../models/bar");
const Bieres = require("../models/biere");
const Commandes = require("../models/commande");

const ajouterBar = async (req, res) => {
  const newBar = await Bars.create(req.body);
  res.status(201).json(newBar);
};

const modifierBar = async (req, res) => {
  const bar = await Bars.findByPk(req.params.id);
  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });

  await bar.update(req.body);
  res.json(bar);
};

const supprimerBar = async (req, res) => {
  const barId = req.params.id;
  const bar = await Bars.findByPk(barId);
  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });

  await Bieres.destroy({ where: { BarId: barId } });

  await Commandes.destroy({ where: { BarId: barId } });

  await bar.destroy();
  res.json({ message: "Bar supprimé" });
};

const listeBars = async (req, res) => {
  const bars = await Bars.findAll();
  res.json(bars);
};

const detailBiere = async (req, res) => {
  const bar = await Bars.findByPk(req.params.id);
  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });
  res.json(bar);
};

// Avancées :

const getBarCommandesParDate = async (req, res) => {
  const barId = req.params.id;
  const bar = await Bars.findByPk(barId);
  const date = req.query.date;

  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });

  const commandes = await Commandes.findAll({
    where: { BarId: barId, date: date },
  });
  res.json(commandes);
};

const getBarCommandesParPrix = async (req, res) => {
  const barId = req.params.id;
  const bar = await Bars.findByPk(barId);
  const prixMin = req.query.prix_min;
  const prixMax = req.query.prix_max;

  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });
  const commandes = await Commandes.findAll({
    where: { BarId: barId, prix: { [Op.between]: [prixMin, prixMax] } },
  });
  res.json(commandes);
};

const getBarsParVille = async (req, res) => {
  const ville = req.query.ville;

  const bars = await Bars.findAll({
    where: {
      adresse: {
        [Op.like]: `%${ville}%`,
      },
    },
  });
  res.json(bars);
};

const getBarsParNom = async (req, res) => {
  const name = req.query.name;

  const bars = await Bars.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
    },
  });
  res.json(bars);
};

const getDegreeBiereMoyen = async (req, res) => {
  const barId = req.params.id;
  const bar = await Bars.findByPk(barId);
  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });

  const bieres = await Bieres.findAll({
    where: { BarId: barId }
  });
  
  let degreeMoyen = 0;
  if (bieres.length > 0) {
    const somme = bieres.reduce((total, biere) => total + biere.degree, 0);
    degreeMoyen = somme / bieres.length;
  }
  res.json({ degreeMoyen: degreeMoyen });
};

// Avancées 2 :

const getDegreeBiereMoyenParPrix = async (req, res) => {
  const barId = req.params.id;
  const prix_min = parseFloat(req.query.prix_min);
  const prix_max = parseFloat(req.query.prix_max);

  const bar = await Bars.findByPk(barId);
  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });

  const bieres = await Bieres.findAll({
    where: {
      BarId: barId,
      prix: { [Op.between]: [prix_min, prix_max] }
    }
  });

  let degreeMoyen = 0;
  if (bieres.length > 0) {
    const somme = bieres.reduce((total, biere) => total + biere.degree, 0);
    degreeMoyen = somme / bieres.length;
  }

  res.json({ degreeMoyen: degreeMoyen });
};


const getDegreeBiereMoyenParDate = async (req, res) => {
  const barId = req.params.id;
  const { date } = req.query;

  const bar = await Bars.findByPk(barId);
  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });

  const commandes = await Commandes.findAll({
    where: { 
      BarId: barId,
      date: date
    },
    include: [{
      model: Bieres,
      through: 'CommandeBiere' 
    }]
  });
  
  let bieres = [];
  commandes.forEach(commande => {
    if (commande.Bieres && commande.Bieres.length > 0) {
      bieres = [...bieres, ...commande.Bieres];
    }
  });

  let degreeMoyen = 0;
  if (bieres.length > 0) {
    const somme = bieres.reduce((total, biere) => total + biere.degree, 0);
    degreeMoyen = somme / bieres.length;
  }

  res.json({ degreeMoyen: degreeMoyen });
};


const getCommandesFiltrees = async (req, res) => {
  const barId = req.params.id; 
  const { date, prix_min, prix_max, status, name } = req.query;

  const bar = await Bars.findByPk(barId);
  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });

  const filters = { BarId: barId };
  if (date) filters.date = date;
  if (prix_min && prix_max) filters.prix = { [Op.between]: [prix_min, prix_max] };
  if (status) filters.status = status;
  if (name) filters.name = { [Op.like]: `%${name}%` };

  const commandes = await Commandes.findAll({ where: filters });
  res.json(commandes);
};

const getBieresTriees = async (req, res) => {
  const barId = req.params.id_bar;
  const { sort = 'asc', limit, offset, degree_min, degree_max, prix_min, prix_max } = req.query;

  const bar = await Bars.findByPk(barId);
  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });

  const filters = { BarId: barId };
  if (degree_min && degree_max) filters.degree = { [Op.between]: [degree_min, degree_max] };
  if (prix_min && prix_max) filters.prix = { [Op.between]: [prix_min, prix_max] };

  const bieres = await Bieres.findAndCountAll({
    where: filters,
    order: [['name', sort]],
    limit: limit ? parseInt(limit) : undefined,
    offset: offset ? parseInt(offset) : undefined,
  });

  res.json(bieres);
};


module.exports = {
  ajouterBar,
  modifierBar,
  supprimerBar,
  listeBars,
  detailBiere,
  getBarCommandesParDate,
  getBarCommandesParPrix,
  getBarsParVille,
  getBarsParNom,
  getDegreeBiereMoyen,
  getDegreeBiereMoyenParPrix,
  getDegreeBiereMoyenParDate,
  getCommandesFiltrees,
  getBieresTriees,
};
