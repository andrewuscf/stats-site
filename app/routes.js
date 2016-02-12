//External Dependencies
//var React = require('react'),
//    ReactRouter = require('react-router'),
//    match = ReactRouter.match,
//    RouterContext = ReactRouter.RouterContext,
//    ReactDOMServer = require('react-dom/server');


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

module.exports = function (app) {

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


    //app.use(function (req, res, next) {
    //    console.log(FrondEndRoutes);
    //    match({routes: FrondEndRoutes, location: req.url}, function (error, redirectLocation, renderProps){
    //        if (error) {
    //            res.status(500).send(error.message)
    //        } else if (redirectLocation) {
    //            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    //        } else if (renderProps) {
    //            // You can also check renderProps.components or renderProps.routes for
    //            // your "not found" component or route respectively, and send a 404 as
    //            // below, if you're using a catch-all route.
    //            res.status(200).send(renderToString(React.createElement(RouterContext,renderProps)));
    //        } else {
    //            res.status(404).send('Not found')
    //        }
    //    });
    //});

    // frontend routes =========================================================
    // route to handle all angular requests
    //app.get('/', function (req, res) {
    //    res.render('app', {
    //        app: ReactDOMServer.renderToString(React.createElement(App))
    //    });
    //});

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });

};