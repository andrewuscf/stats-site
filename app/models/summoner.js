var mongoose = require('mongoose');

module.exports = mongoose.model('Summoner', {
    name: {
        type: String, required: true
    },
    nameLowercase: String,
    summonerId: {
      type: String, default: null
    },
    region:  String,
    profileIconId: Number,
    revisionDate: Number,
    summonerLevel: Number
});