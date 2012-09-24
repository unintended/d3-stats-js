window.Hero = Backbone.Model.extend({

    url: "http://eu.battle.net/api/d3/profile/",

    initialize:function () {
        this.level = 0;
        this.paragon = 0;
    },

    loadHero: function (profile, heroId) {
        var url = this.url + profile + '/hero/' + heroId;
        console.log('fetch: ' + url);
        var self = this;
        $.ajax({
            url:url,
            dataType:"jsonp",
            success:function (data) {
                if (!data.id) {
                    self.clear();
                    return;
                }
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

window.Profile = Backbone.Model.extend({

    url: "http://eu.battle.net/api/d3/profile/",

    initialize:function () {
    },

    loadProfileForId: function (profile) {
        var url = this.url + profile + '/';
        console.log('fetch: ' + url);
        var self = this;
        $.ajax({
            url:url,
            dataType:"jsonp",
            success:function (data) {
                if (!data.heroes || data.code && data.code == 'OOPS') {
                    self.clear();
                    return;
                }
                self.set({battleTag: data.battleTag, battleTagSafe: data.battleTag.replace('#', '-'), heroes: data.heroes});
//                console.log("profile search success: " + JSON.stringify(self.toJSON()));
            }
        });
    }

});