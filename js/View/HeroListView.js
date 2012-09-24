window.HeroListView = Backbone.View.extend({

    tagName:'ul',

    className:'dropdown-menu',

    initialize:function () {
        this.itemTemplate = _.template($('#hero-view-item-template').html());
//        this.model.bind("reset", this.render, this);
//        this.model.bind("add", function (hero) {
//            $(self.el).append(new HeroListItemView({model:hero}).render().el);
//        });
    },

    render:function () {
        $(this.el).empty();

        _.each(this.model.get('heroes'), function (hero) {
            var itemEl = this.itemTemplate({
                'profileBattletag': this.model.get('battleTag'),
                'profileBattletagSafe': this.model.get('battleTagSafe'),
                'heroId': hero.id,
                'heroName': hero.name,
                'heroLevel': hero.level,
                'heroParagonLevel': hero.paragonLevel,
                'heroClass': hero.class
            });

//            var itemEl = new HeroListItemView({model: new Hero(hero)}).render().el;
//            var self = this;
//            $('a', itemEl).click(function() {
//                Backbone.history.navigate('hero/' + self.model.get('battleTag').replace('#', '-') + '/' + hero.id, {trigger: true});
//            });
            $(this.el).append(itemEl);

        }, this);
        return this;
    }
});

window.HeroListItemView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
//        this.model.bind("change", this.render, this);
//        this.model.bind("destroy", this.close, this);

        this.template = _.template($('#hero-view-item-template').html());
    },

    render:function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});