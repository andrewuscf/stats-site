var mongoose = require('mongoose');

module.exports = mongoose.model('Regions', {
    title:  String,
    region:  String,
    active: Boolean
});

