const Bars = require("../models/bar");
const Bieres = require("../models/biere");
// const Commandes =("../models/commande")

const addBar = async (req, res) => {
  const newBar = await Bars.create(req.body);
  res.status(201).json(newBar);
};

const updateBar = async (req, res) => {
  const bar = await Bars.findByPk(req.params.id);
  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });

  await bar.update(req.body);
  res.json(bar);
};

const deleteBar = async (req, res) => {
  const barId = req.params.id;
  const bar = await Bars.findByPk(barId);
  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });

  await Bieres.destroy({where: {bar_id : barId}});

  await Commandes.destroy({where: {bar_id : barId}})

  await bar.destroy();
  res.json({ message: "Bar supprimé" });
};

const getAllBars = async (req, res) => {
  const bars = await Bars.findAll();
  res.json(bars);
};

const getBarDetails = async (req, res) => {
  const bar = await Bars.findByPk(req.params.id);
  if (!bar) return res.status(404).json({ message: "Bar non trouvé" });
  res.json(bar);
};

module.exports = {
  addBar,
  updateBar,
  deleteBar,
  getAllBars,
  getBarDetails,
};
