window.HeaderView = Backbone.View.extend({

    className: "navbar navbar-inverse navbar-fixed-top",

    initialize: function () {
        var self = this;
        this.model.hero.bind("change", this.render, this);
        this.model.profile.bind("change", this.render, this);

        this.template = _.template($('#header-template').html());
        this.heroViewTemplate = _.template($('#hero-view-template').html());
    },

    render: function () {
        $(this.el).html(this.template());

        var heroes = this.model.profile.get('heroes');

        if (heroes) {
            this.heroesView = new HeroListView({model: this.model.profile, className: 'dropdown-menu'});
            $('.container', this.el).append(this.heroViewTemplate());
            $('.btn-group', this.el).append(this.heroesView.render().el);
        }

        $('.profile', this.el).text(this.model.profile.get('battleTag'));
        $('.profile', this.el).attr('href', "#profile/" + this.model.profile.get('battleTagSafe'));

        if (this.model.hero.get('name')) {
            $('.current', this.el).text(this.model.hero.get('name'));
        }

        return this;
    }
});