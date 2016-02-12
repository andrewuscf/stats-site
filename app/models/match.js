var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Match', {
    matchId:  Number,
    region:  String,
    data:    Schema.Types.Mixed
});

