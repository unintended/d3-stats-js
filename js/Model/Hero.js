window.Hero = Backbone.Model.extend({

    url: {
        'eu':"http://eu.battle.net/api/d3/profile/",
        'us':"http://us.battle.net/api/d3/profile/",
        'kr':"http://kr.battle.net/api/d3/profile/",
        'tw':"http://tw.battle.net/api/d3/profile/"
    },

    defaults: {
        'level': 1,
        'paragonLevel': 0,
        'region' : 'eu'
    },

    initialize:function () {
        this.level = 0;
        this.paragon = 0;
    },

    loadHero: function (battletag, heroId, region) {
        region = region || this.defaults.region;

        var url = this.url[region] + battletag + '/hero/' + heroId;
        console.log('fetch: ' + url);
        var self = this;
        $.ajax({
            url:url,
            dataType:"jsonp",
            success:function (data) {
                if (!data.id) {
                    return;
                }
                self.clear({'silent': true});
                self.set(data);
//                console.log("profile search success: " + JSON.stringify(self.toJSON()));
            }
        });
    },

    toJSON: function() {
        var res = Backbone.Model.prototype.toJSON.call(this);
        res.d3class = res.class;
        return res;
    }

});

window.HeroCollection = Backbone.Collection.extend({
    model: Hero
});
