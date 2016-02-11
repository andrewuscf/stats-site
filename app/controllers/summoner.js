module.exports = function (req, res, next) {
    if (res.dataSource === 'riot') {
        res.data = res.data[Object.keys(res.data)];
        res.data.summonerId = res.data.id
    }

    res.data.nameLowercase = req.params.name.toLowerCase();

    return next();
};