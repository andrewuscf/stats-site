var mongoose = require('mongoose');

module.exports = mongoose.model('Champion', {
    id:  Number,
    name:  String,
    title: String,
    key: String
});

