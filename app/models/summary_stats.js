var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Summary', {
    summonerId: Number,
    region: String,
    season: String,
    data: Schema.Types.Mixed
});