var Champion = require('../models/champion');


module.exports.getInfo = function (req, res, next) {
    Champion.find({id:req.params.championId}, function (err, champ) {
        if (champ) {
            res.data = champ[0];
            return next()
        } else {
            console.log(err);
            res.data = err;
            return next();
        }
    });
};