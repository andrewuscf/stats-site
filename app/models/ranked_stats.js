var mongoose = require('mongoose');

module.exports = mongoose.model('Ranked', {
    summoner_name: {
        type: String, required: true
    },
    summoner_id: {
        type: String, default: null
    }

});