window.Router = Backbone.Router.extend({

    routes: {
        "": "welcome",
        "profile/:profile": "profile",
        "hero/:profile/:hero": "hero"
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
    },

    hero: function(profile, heroId) {
//        this.profile.clear();
        this.hero.clear();
        this.profile.loadProfileForId(profile);
        this.hero.loadHero(profile, heroId);
    }


});

app = new Router();
Backbone.history.start();
