window.Router = Backbone.Router.extend({

    routes: {
        "": "welcome",
        "profile/:region/:profile": "routeProfile",
        "hero/:region/:profile/:hero": "routeHero",
        "hero/:region/:profile/:hero/:page": "routeHero"
    },

    initialize: function () {
        this.model = new MainModel();
        this.loadingTemplate = _.template($('#loading-template').html());

        this.headerView = new HeaderView({model: this.model});
        this.headerView.on('battleTagClicked', function() {
            this.openProfile(this.model.profile);
        }, this);
        $('.header').html(this.headerView.render().el);
    },

    welcome: function() {
        this.model.clear();
        this.model.profile.clear();
        this.model.hero.clear();

        this.homeView = new HomeView();
        this.homeView.render();
        this.homeView.on('profileLoaded', function(profile) {
            this.model.updateProfile(profile);
            this.openProfile(profile);
        }, this);

        $("#content").html(this.homeView.el);
    },

    routeProfile: function(region, battleTagSafe) {
        $("#content").html(this.loadingTemplate());

        this.model.clear();
        this.model.profile.clear();
        this.model.hero.clear();

        var profile = new Profile();
        profile.on('load', function() {
            this.openProfile(profile);
        }, this);
        profile.on('error', this.welcome, this);
        profile.loadProfile(battleTagSafe, region);
    },

    routeHero: function(region, battletag, heroId) {
        $("#content").html(this.loadingTemplate());

        this.model.clear();
        this.model.profile.clear();
        this.model.hero.clear();

//        var hero = new Hero();
//        hero.on('load', function(hero) {
//
//        }, this);
//        hero.on('error', this.welcome, this);
//        hero.loadHero(battletag, heroId, region);

        var profile = new Profile();
        profile.on('load', function() {
            this.model.updateProfile(profile);
        }, this);
        profile.loadProfile(battletag, region);

        this.openHero(region, battletag, heroId);
    },

    openProfile: function(profile) {
        this.selectHeroView = new SelectHeroView({model: profile});
        this.selectHeroView.render();
        this.selectHeroView.on('heroSelected', function(heroId) {
            this.openHero(this.model.get('region'), this.model.get('battleTagSafe'), heroId);
        }, this);

        $("#content").html(this.selectHeroView.el);
        Backbone.history.navigate("profile/" + profile.get('region') + "/" + profile.get('battleTagSafe'));
    },

    openHero: function(region, battletag, hero) {
        this.model.hero.clear();
        this.model.hero.loadHero(battletag, hero, region);
        this.heroStatsView = new HeroStatsView({model: this.model});
        this.heroStatsView.render();

        $("#content").html(this.heroStatsView.el);
        Backbone.history.navigate("hero/" + region + "/" + battletag + "/" + hero);
    }
});

app = new Router();
Backbone.history.start();
