var request = require('request'),
    Summoner = require('../models/summoner'),
    Services = require('../services');


module.exports.getInfo = function (req, res, next) {

    Summoner.findOne({nameLowercase: req.params.name.toLowerCase()}, function (err, summoner) {
        if (summoner) {
            res.data = summoner;
            res.dataSource = 'our';
            return next();
        } else {
            var url = Services.summonerByName(req.query.region, req.params.name);
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.data = JSON.parse(body);
                    res.dataSource = 'riot';
                } else {
                    res.data = undefined;
                }
                return next();
            });
        }
    });
};

//module.exports.renew = function (req, res, next) {
//    if (req.query.renew === 'true') {
//        var url = Services.summonerByName(req.query.region, req.params.name);
//        request(url, function (error, response, body) {
//            if (!error && response.statusCode == 200) {
//                res.data = JSON.parse(body);
//                res.dataSource = 'riot';
//            } else {
//                res.data = undefined;
//            }
//            return next();
//        });
//    }
//};

module.exports.save = function (req, res, next) {
    if (res.dataSource === 'our') {
        return next();
    }

    Summoner.findOneAndUpdate({nameLowercase: req.params.name.toLowerCase()}, res.data, {
        new: true,
        upsert: true
    }, function (err, summoner) {
        if (err) {
            return next();
        } else {
            res.data = summoner;
            return next();
        }
    })

};
