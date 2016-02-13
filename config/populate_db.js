var RegionModel = require('../app/models/regions');
var regions = [
    {region: 'na', title: 'North America', active: true},
    {region: 'br', title: 'Brazil', active: true},
    {region: 'eune', title: 'Europe Nordic & East', active: true},
    {region: 'euw', title: 'Europe West', active: true},
    {region: 'kr', title: 'Korea', active: true},
    {region: 'lan', title: 'LAN', active: true},
    {region: 'las', title: 'LAS', active: true},
    {region: 'oce', title: 'Oceania', active: true},
    {region: 'ru', title: 'Russia', active: true},
    {region: 'tr', title: 'Turkey', active: true}
];

module.exports.loadRegions = function (mongoose) {
    regions.forEach(function(each){
        RegionModel.update(each, {$setOnInsert: each},{upsert: true},function (err) {
            if (err) // ...
                console.log(err);
        });
    });
};