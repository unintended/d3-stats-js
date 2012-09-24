window.SelectHeroView = Backbone.View.extend({

    className: "hero-unit",

    initialize:function () {
        console.log('Initializing Select Hero View');

        this.model.bind("change", this.render, this);

        this.template = _.template($('#select-hero-template').html());
        this.itemTemplate = _.template($('#select-hero-item-template').html());
    },

    /*events:{
        "click #bt_submit":"sumbitBtnClick"
    },   */

    render:function () {
        $(this.el).html(this.template());

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

            $('ul', this.el).append(itemEl);
//            $('a', this.el).attr('href', "#profile/" + this.model.get('battleTagSafe'));


        }, this);

        return this;
    }/*,

    sumbitBtnClick:function () {
        Backbone.history.navigate("profile/" + $('#bt_input').val().replace('#', '-').replace(/\s/g, ""), {'trigger': true});
    }  */

});