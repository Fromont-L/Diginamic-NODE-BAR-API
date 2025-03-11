const { Op, Sequelize } = require("sequelize");

const Bars = require("../models/bar");
const Bieres = require("../models/biere")
// const Commandes =("../models/commande")

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

  await Bieres.destroy({where: {bar_id : barId}});

  await Commandes.destroy({where: {bar_id : barId}})

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
    where: {bar_id : barId, 
      date: date
    },
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
    where: {bar_id : barId, 
      prix: {[Op.between]: [prixMin, prixMax]}
    },
  });
  res.json(commandes);
};

const getBarsParVille = async (req, res) => {
  const ville = req.query.ville;
  
  const bars = await Bars.findAll({
    where: {
      adresse: {
        [Op.like]: `%${ville}%`
      }
    }
  });
  res.json(bars);
};

const getBarsParNom = async (req, res) => {
  const name = req.query.name;
  
  const bars = await Bars.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`
      }
    }
  });
  res.json(bars);
};

const getDegreeBiereMoyen = async (req, res) => {
  const barId = req.params.id;
  const bar = await Bars.findByPk(barId);

  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });

  const degreeMoyen = await Bieres.findAll({
    where: { bars_id: barId },
    attributes: [[Sequelize.fn('AVG', Sequelize.col('degree')), 'degreeMoyen']],
  });

  res.json({ degreeMoyen: degreeMoyen[0]?.degreeMoyen || 0 })
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
  getDegreeBiereMoyen
};
