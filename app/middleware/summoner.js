var request = require('request'),
    Summoner = require('../models/summoner'),
    credentials = require('../config/keys');

module.exports.ourstats = function (req, res, next) {
    if (req.query.renew === 'true') {
        return next()
    }

    Summoner.findOne({nameLowercase: req.params.name.toLowerCase()}, function (err, summoner) {
        if (summoner) {
            res.data = summoner;
            res.dataSource = 'internal';
            return next()
        } else {
            return next()
        }
    });

};

/**
 *  External Loader
 */

module.exports.external = function (req, res, next) {
    if (res.dataSource === 'internal') {
        return next()
    }

    var url = externalSources.summonerByName(credentials.apiKey, req.query.region, req.params.name)

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.data = JSON.parse(body);
            res.dataSource = 'external'
        } else {
            res.data = undefined;
        }
        return next()
    })
};


/**
 *  Summoner Save
 */

module.exports.save = function (req, res, next) {
    if (res.dataSource === 'internal') {
        return next()
    }

    Summoner.findOneAndUpdate({name: req.params.name.toLowerCase()}, res.data, {
        new: true,
        upsert: true
    }, function (err, summoner) {
        if (err) {
            return next()
        } else {
            res.data = summoner
            return next()
        }
    })

};
