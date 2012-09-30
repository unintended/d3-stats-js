window.SelectHeroView = Backbone.View.extend({

    className: "hero-unit",

    initialize:function () {
        console.log('Initializing Select Hero View');

        this.model.profile.bind("change", this.render, this);

        this.template = _.template($('#select-hero-template').html());
        this.itemTemplate = _.template($('#select-hero-item-template').html());
    },

    render:function () {
        $(this.el).html(this.template());

        var self = this;
        var battleTag = this.model.profile.get('battleTagSafe');

        _.each(this.model.profile.get('heroes'), function (hero) {
            var elHtml = self.itemTemplate({
                'heroName': hero.name,
                'heroLevel': hero.level,
                'heroParagonLevel': hero.paragonLevel,
                'heroClass': hero.class
            });
            var itemEl = $(elHtml);
            $('a', itemEl).click(function(event) {
                event.preventDefault();
                Backbone.history.navigate('hero/' + battleTag + '/' + hero.id, {trigger: true});
//                self.model.hero.loadHero(battleTag, hero.id);
            });
            $('ul', self.el).append(itemEl);
        });

        return this;
    }
});