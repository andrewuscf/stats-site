var Regions = require('../models/regions');


module.exports.getInfo = function (req, res, next) {
    Regions.find({active:true}, function (err, regions) {
        if (regions) {
            res.data = regions;
            return next()
        } else {
            res.data = err;
            return next();
        }
    });
};