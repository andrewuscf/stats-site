var request = require('request'),
    Match = require('../models/match'),
    Services = require('../services');


module.exports.getInfo = function (req, res, next) {
    if (req.query.renew === 'true') {
        return next()
    }

    Match.findOne({matchId: parseInt(req.params.matchId, 10)}, function (err, match) {
        if (match) {
            res.data = match;
            res.dataSource = 'our';
            return next()
        } else {
            var url = Services.matchById(req.query.region, req.params.matchId);

            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.data = JSON.parse(body);
                    res.dataSource = 'riot'
                } else {
                    res.data = undefined;
                }
                return next()
            });
        }
    });

};


//module.exports.renew = function (req, res, next) {
//    if (res.dataSource === 'internal') {
//        return next()
//    }
//
//    var url = externalSources.matchById(credentials.apiKey, req.query.region, req.params.matchId)
//
//    request(url, function (error, response, body) {
//        if (!error && response.statusCode == 200) {
//            res.data = JSON.parse(body);
//            res.dataSource = 'external'
//        } else {
//            res.data = undefined;
//        }
//        return next()
//    })
//};


module.exports.save = function (req, res, next) {
    if (res.dataSource === 'our') {
        return next()
    }

    Match.findOneAndUpdate({matchId: parseInt(req.params.matchId, 10)}, res.data, {
        new: true,
        upsert: true
    }, function (err, match) {
        if (err) {
            return next()
        } else {
            res.data = match;
            return next()
        }
    })

};