window.Hero = Backbone.Model.extend({

    url: "http://eu.battle.net/api/d3/profile/",

    defaults: {
        'level': 1,
        'paragonLevel': 0
    },

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

window.MainModel = Backbone.Model.extend({

    profileUrl: "http://eu.battle.net/api/d3/profile/",

    defaults: {
        'region': 'eu',
        'battleTag': undefined,
        'battleTagSafe': undefined,
        'heroId': undefined
    },

    initialize: function() {
//        this.battleTag = null;
//        this.battleTagSafe = null;
        var self = this;

        this.profile = new Profile();
//        this.profile.url = this.profileUrl; // TODO: a good place to add support for international servers
//        this.profile.on('change:battleTagSafe', function(profile) {
//            Backbone.history.navigate('profile/' + profile.get('battleTagSafe'));
//        });

        this.hero = new Hero();
        this.hero.url = this.profileUrl;
//        this.hero.on('change:id', function(hero) {
//            Backbone.history.navigate('hero/' + self.profile.get('battleTagSafe') + '/' + hero.get('id'));
//        });

//        this.heroId = null;
//        this.heroLoading = false;

//        this.on('change:battleTag', this.updateBattleTagSafe);

//        this.on('change:battleTag', this.loadProfile);
//        this.on('change:profile', this.updateHeroes)
    }

    /*loadProfile: function(battletag) {
        this.set({profile:null, hero:null,
            profileLoading: true, profileLoadingFailed: false});

        var url = this.url + battletag + '/';
        console.log('fetch profile: ' + url);
        var self = this;
        $.ajax({
            url:url,
            dataType:"jsonp",
            success:function (data) {
                if (!data.battleTag) {
                    self.set({profileLoading:false, profileLoadingFailed: true});
                    return;
                }
                self.set({profileLoading:false, profileLoadingFailed: false,
                    battleTag: data.battleTag, battleTagSafe: data.battleTag.replace('#', '-'), profile: data});
            }, error: function() {
                self.set({profileLoading:false, profileLoadingFailed: true});
            }
        });
    },

    loadHero: function(heroId) {
        this.set({hero:null, heroId: heroId, heroLoading: true, heroLoadingFailed: false});

        var url = this.url + this.battleTagSafe + '/hero/' + heroId;
        console.log('fetch: ' + url);
        var self = this;
        $.ajax({
            url:url,
            dataType:"jsonp",
            success:function (data) {
                if (!data.id) {
                    self.set({heroLoading: false, heroLoadingFailed: true});
                    return;
                }
                self.set({heroLoading: false, heroLoadingFailed: false, hero: data});
            }
        });
    }*/

});