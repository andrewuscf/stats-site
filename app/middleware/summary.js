var request = require('request'),
    Summary = require('../models/summary_stats'),
    Services = require('../services');


module.exports.getInfo = function (req, res, next) {

    Summary.findOne({
        summonerId: parseInt(req.params.summonerId, 10),
        region: req.query.region,
        season: req.query.season
    }, function (err, summary) {
        if (summary) {
            res.data = summary;
            res.dataSource = 'our';
            return next();
        } else {
            var url = Services.summaryBySummonerId(req.query.region, req.params.summonerId);
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
//
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

    Summary.findOneAndUpdate({
        summonerId: parseInt(req.params.summonerId, 10),
        region: req.query.region,
        season: req.query.season
    }, res.data, {new: true, upsert: true}, function (err, summary) {
        if (err) {
            return next();
        } else {
            res.data = summary;
            return next();
        }
    })

};
