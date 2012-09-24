window.Router = Backbone.Router.extend({

    routes: {
        "": "welcome",
        "profile/:profile": "profile",
        "hero/:profile/:hero": "hero",
        "hero/:profile/:hero/:page": "hero"
    },

    initialize: function () {
        this.profile = new Profile();
        this.hero = new Hero();
        this.headerView = new HeaderView({model: {'profile': this.profile, 'hero': this.hero}});
        $('.header').html(this.headerView.render().el);
    },

    welcome: function() {
        this.profile.clear();
        this.hero.clear();

        if (!this.homeView) {
            this.homeView = new HomeView();
            this.homeView.render();
        } else {
            this.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        $("#content").html(this.homeView.el);
    },

    profile: function(profile) {
//        this.profile.clear();
        this.hero.clear();
        this.profile.loadProfileForId(profile);

        if (!this.selectHeroView) {
            this.selectHeroView = new SelectHeroView({model: this.profile});
            this.selectHeroView.render();
        } else {
            this.selectHeroView.delegateEvents(); // delegate events when the view is recycled
        }

        $("#content").html(this.selectHeroView.el);
    },

    hero: function(profile, heroId, page) {
//        this.profile.clear();
        this.hero.clear();
        this.profile.loadProfileForId(profile);
        this.hero.loadHero(profile, heroId);

        if (!this.heroStatsView) {
            this.heroStatsView = new HeroStatsView({model: {'profile': this.profile, 'hero': this.hero, 'page': page}});
            this.heroStatsView.render();
        } else {
            this.heroStatsView.delegateEvents(); // delegate events when the view is recycled
        }

        $("#content").html(this.heroStatsView.el);
    }


});

app = new Router();
Backbone.history.start();
