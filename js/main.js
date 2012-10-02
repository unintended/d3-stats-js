window.Router = Backbone.Router.extend({

    routes: {
        "": "welcome",
        "profile/:profile": "profile",
        "hero/:profile/:hero": "hero",
        "hero/:profile/:hero/:page": "hero"
    },

    initialize: function () {
        this.model = new MainModel();
//        this.model.profile.on('change', this.profileChanged, this);
//        this.model.hero.on('change', this.heroChanged, this);
//        this.profile = new Profile();
//        this.hero = new Hero();
//        this.headerView = new HeaderView({model: {'profile': this.profile, 'hero': this.hero}});
        this.headerView = new HeaderView({model: this.model});
        $('.header').html(this.headerView.render().el);
//        this.mainView = new MainView({model: this.model});
    },

//    profileChanged: function() {
//        if (!this.selectHeroView) {
//            this.selectHeroView = new SelectHeroView({model: this.model});
//            this.selectHeroView.render();
//        } else {
//            this.selectHeroView.delegateEvents(); // delegate events when the view is recycled
//        }
//
//        $("#content").html(this.selectHeroView.el);
//    },

//    heroChanged: function() {
//        if (!this.heroStatsView) {
//            this.heroStatsView = new HeroStatsView({model: this.model});
//            this.heroStatsView.render();
//        } else {
//            this.heroStatsView.render();
//            this.heroStatsView.delegateEvents(); // delegate events when the view is recycled
//        }
//
//        $("#content").html(this.heroStatsView.el);
//    },

    welcome: function() {
//        this.model.clear();

        this.model.profile.clear();
        this.model.hero.clear();

//        if (!this.homeView) {
//            this.homeView = new HomeView();
//            this.homeView.render();
//
//        } else {
//            this.homeView.render();
//            this.homeView.delegateEvents(); // delegate events when the view is recycled
//        }

        this.homeView = new HomeView();
        this.homeView.render();
        this.homeView.on('profileLoaded', function(profile) {
            this.profile(profile);
        }, this);

        $("#content").html(this.homeView.el);
    },

    profile: function(profile) {
//        this.model.profile.loadProfile(battletag);
//        this.hero.clear();
//        this.profile.loadProfileForId(profile);
//
//        if (!this.selectHeroView) {
//            this.selectHeroView = new SelectHeroView({model: this.profile});
//            this.selectHeroView.render();
//        } else {
//            this.selectHeroView.delegateEvents(); // delegate events when the view is recycled
//        }
//
//        $("#content").html(this.selectHeroView.el);

        this.model.set({
            'region': profile.get('region'),
            'battleTag': profile.get('battleTag'),
            'heroes': profile.get('battleTag')
        });
        this.selectHeroView = new SelectHeroView({model: profile});
        this.selectHeroView.render();
        this.selectHeroView.on('heroSelected', function(heroId) {
            this.hero(heroId);
//            this.profile(profile);
        }, this);

        $("#content").html(this.selectHeroView.el);
    },

    hero: function(battletag, heroId) {
        this.model.profile.clear();
        this.model.hero.clear();
        this.model.profile.loadProfile(battletag);

        if (!this.heroStatsView) {
            this.heroStatsView = new HeroStatsView({model: this.model});
            this.heroStatsView.render();
        } else {
            this.heroStatsView.delegateEvents(); // delegate events when the view is recycled
        }
        $("#content").html(this.heroStatsView.el);

//        this.model.profile.set({'battleTagSafe': battletag});
        this.model.hero.loadHero(battletag, heroId);
//
//        if (!this.heroStatsView) {
//            this.heroStatsView = new HeroStatsView({model: {'profile': this.profile, 'hero': this.hero, 'page': page}});
//            this.heroStatsView.render();
//        } else {
//            this.heroStatsView.delegateEvents(); // delegate events when the view is recycled
//        }
//
//        $("#content").html(this.heroStatsView.el);
    }


});

app = new Router();
Backbone.history.start();
