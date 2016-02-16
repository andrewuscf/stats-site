module.exports = function (req, res, next) {
    if (res.dataSource === 'riot') {
        var lane = {
            MID: 0,
            TOP: 0,
            BOTTOM: 0,
            JUNGLE: 0
        };

        for (var i = 0; i < res.data.matches.length; i++) {
            lane[res.data.matches[i].lane] += 1
        }

        res.data.lane = lane;
    }

    return next();
};