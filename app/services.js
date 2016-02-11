var apiKey = require('../config/keys').LEAGUE_KEY;

module.exports = {
    summonerByName: function (region, name) {
        return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.4/summoner/by-name/' + name + '?api_key=' + apiKey;
    },
    summonerChampionsById: function (region, season, name) {
        return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.3/stats/by-summoner/' + name + '/ranked?season=' + season + '&api_key=' + apiKey;
    },
    summonerSummaryById: function (region, season, name) {
        return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v1.3/stats/by-summoner/' + name + '/summary?season=' + season + '&api_key=' + apiKey;
    },
    matchById: function (region, id) {
        return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.2/match/' + id + '?api_key=' + apiKey;
    },
    matchListBySummonerId: function (region, summonerId) {
        return 'https://' + region + '.api.pvp.net/api/lol/' + region + '/v2.2/matchlist/by-summoner/' + summonerId + '?api_key=' + apiKey;
    }
};