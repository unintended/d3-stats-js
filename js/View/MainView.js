window.HeaderView = Backbone.View.extend({

    className: "navbar navbar-inverse navbar-fixed-top",

    initialize: function () {
        var self = this;
        this.model.profile.on("change", this.render, this);
        /*this.model.profile.on('change:loading', function(profile) {
            if (profile.get('loading'))
                $('.btn', self.el).button('loading');
            else
                $('.btn', self.el).button('reset');
        });*/

        this.model.hero.on("change", this.render, this);

        this.template = _.template($('#header-template').html());
        this.heroViewTemplate = _.template($('#hero-view-template').html());
    },

    renderBattleTag: function() {
        $('.profile', this.el).text(this.model.profile.get('battleTag'));
        $('.profile', this.el).attr('href', "#profile/" + this.model.profile.get('battleTagSafe'));
    },

    renderHeroesList: function() {
        var heroes = this.model.profile.get('heroes');
        if (heroes) {
            this.heroesView = new HeroListView({model: this.model.profile, className: 'dropdown-menu'});
            $('#hero-selector', this.el).append(this.heroViewTemplate());
            $('.btn-group', this.el).append(this.heroesView.render().el);
        }

        if (this.model.hero.get('name')) {
            $('.current', this.el).text(this.model.hero.get('name'));
        }
    },

    render: function () {
        $(this.el).html(this.template());
        this.renderBattleTag();
        this.renderHeroesList();
        return this;
    }
});