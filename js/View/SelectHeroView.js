window.SelectHeroView = Backbone.View.extend({

    className: "hero-unit",

    initialize:function () {
        console.log('Initializing Select Hero View');
        this.template = _.template($('#select-hero-template').html());
        this.itemTemplate = _.template($('#select-hero-item-template').html());

        this.model.bind("change", this.render, this);
    },

    render:function () {
        $(this.el).html(this.template());

        var self = this;
        var battleTag = this.model.get('battleTagSafe');

        _.each(this.model.get('heroes'), function (hero) {
            var elHtml = self.itemTemplate({
                'heroName': hero.name,
                'heroLevel': hero.level,
                'heroParagonLevel': hero.paragonLevel,
                'heroClass': hero.class
            });
            var itemEl = $(elHtml);
            $('a', itemEl).click(function(event) {
                event.preventDefault();
                this.trigger('heroSelected', hero.id);
            }, this);
            $('ul', self.el).append(itemEl);
        });

        return this;
    }
});