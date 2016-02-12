var request = require('request'),
    Matchs = require('../models/matchList'),
    Services = require('../services');


module.exports.getInfo = function (req, res, next) {

    Matchs.findOne({summonerId: parseInt(req.params.summonerId, 10)}, function (err, matchList) {
        if (matchList) {
            res.data = matchList;
            res.dataSource = 'our';
            return next();
        } else {
            var url = Services.matchsBySummonerId(req.query.region, req.params.summonerId);
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

    Matchs.findOneAndUpdate({summonerId: parseInt(req.params.summonerId, 10)}, res.data, {
        new: true,
        upsert: true
    }, function (err, matchs) {
        if (err) {
            return next();
        } else {
            res.data = matchs;
            return next();
        }
    })

};
