var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Matchs', {
    matchId:    Number,
    summonerId: Number,
    region:     String,
    totalGames: Number,
    matches:    [Schema.Types.Mixed],
    lane:       Schema.Types.Mixed
});

