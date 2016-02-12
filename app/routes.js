var summonerController = require('./controllers/summoner'),
    summonerMiddleware = require('./middleware/summoner'),

    summaryController = require('./controllers/summary'),
    summaryMiddleware = require('./middleware/summary'),

    matchListController = require('./controllers/matchList'),
    matchListMiddleware = require('./middleware/matchList'),


    matchController = require('./controllers/match'),
    matchMiddleware = require('./middleware/match');



var initMiddleware = function (req, res, next) {
    res.data = {};
    res.dataSource = undefined;
    return next();
};

var responseToJson = function (req, res, next) {
    res.json(res.data);
};

module.exports = function(app) {

    // server routes ===========================================================
    app.get('/api/summoner/:name',
        initMiddleware,
        summonerMiddleware.getInfo,
        summonerController,
        summonerMiddleware.save,
        responseToJson
    );

    app.get('/api/summary/:summonerId',
        initMiddleware,
        summaryMiddleware.getInfo,
        summaryController,
        summaryMiddleware.save,
        responseToJson
    );

    app.get('/api/matchlist/:summonerId',
        initMiddleware,
        matchListMiddleware.getInfo,
        matchListController,
        matchListMiddleware.save,
        responseToJson
    );

    app.get('/api/match/:matchId',
        initMiddleware,
        matchMiddleware.getInfo,
        matchController,
        matchMiddleware.save,
        responseToJson
    );

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });

};