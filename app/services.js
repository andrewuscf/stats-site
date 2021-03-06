var apiKey = require('../config/keys').LEAGUE_KEY;

module.exports = {
    summonerByName: function (region, name) {
        return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + name + '?api_key=' + apiKey;
    },
    champions: function (region) {
        return 'https://global.api.pvp.net//api/lol/static-data/'+ region +'/v1.2/champion?api_key=' + apiKey;
    },
    summaryBySummonerId: function (region, name) {
        return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.3/stats/by-summoner/' + name + '/summary?api_key=' + apiKey;
    },
    matchById: function (region, id) {
        return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.2/match/' + id + '?api_key=' + apiKey;
    },
    matchsBySummonerId: function (region, summonerId) {
        return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.2/matchlist/by-summoner/' + summonerId + '?api_key=' + apiKey;
    }
};