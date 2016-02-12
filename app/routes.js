var summonerController = require('./controllers/summoner'),
    summonerMiddleware = require('./middleware/summoner'),

    summaryController = require('./controllers/summary'),
    summaryMiddleware = require('./middleware/summary'),

    matchsController = require('./controllers/matchs'),
    matchsMiddleware = require('./middleware/matchs');



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
    // handle things like api calls
    // authentication routes

    // sample api route
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

    app.get('/api/matchs/:summonerId',
        initMiddleware,
        matchsMiddleware.getInfo,
        matchsController,
        matchsMiddleware.save,
        responseToJson
    );

    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });

};