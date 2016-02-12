module.exports = function (req, res, next) {
    if (res.dataSource === 'riot') {
        res.data = {
            matchId: parseInt(req.params.matchId, 10),
            region: req.query.region,
            data: res.data
        };
    }
    return next()
};