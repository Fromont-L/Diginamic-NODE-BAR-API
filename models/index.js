const Bar = require("./bar");
const Biere = require("./biere");
const Commande = require("./commande");

// Relations many-to-one avec Bar
Biere.belongsTo(Bar);
Bar.hasMany(Biere);

Commande.belongsTo(Bar);
Bar.hasMany(Commande);

// Relation Many-to-many commande/bière





// Exemples :
// Player.belongsToMany(Tournament, { through: "TournamentPlayer" });
// Tournament.belongsToMany(Player, { through: "TournamentPlayer" });

// Match.belongsTo(Player);
// Player.hasMany(Match);