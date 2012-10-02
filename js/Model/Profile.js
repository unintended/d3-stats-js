window.Profile = Backbone.Model.extend({

    url: {
        'eu':"http://eu.battle.net/api/d3/profile/",
        'us':"http://us.battle.net/api/d3/profile/",
        'kr':"http://kr.battle.net/api/d3/profile/",
        'tw':"http://tw.battle.net/api/d3/profile/"
    },

    defaults: {
        'loading': false,
        'loaded': false,
        'lastTriedBattleTag': null,
        'region' : 'eu',
        'battleTag' : null
    },

    initialize:function () {
    },

    loadProfile: function (battletag, region) {
        battletag = battletag.replace('#', '-').replace(/\s/g, "");
        region = region || this.get('region');

        this.clear();
        this.set({loading: true});

        var url = this.url[region] + battletag + '/';
        console.log('fetch profile: ' + url);
        var self = this;
        $.ajax({
            url:url,
            dataType:"jsonp",
            success:function (data) {
                if (!data.battleTag) {
                    self.set({loading:false, loaded: false, lastTriedBattleTag: battletag});
                    return;
                }
                self.set({loading:false,
                    loaded: true,
                    region: region,
                    battleTag: data.battleTag,
                    battleTagSafe: data.battleTag.replace('#', '-'),
                    heroes: data.heroes});
            }, error: function() {
                self.set({loading:false, loaded: false, lastTriedBattleTag: battletag});
            }
        });
    }
});