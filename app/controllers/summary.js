module.exports = function (req, res, next) {
    if(res.dataSource === 'riot'){
        res.data = {
            summonerId: parseInt(req.params.summonerId, 10),
            region: req.query.region,
            season: req.query.season,
            data: res.data.playerStatSummaries
        };
    }

    return next()
};