window.HeroStatsView = Backbone.View.extend({

    tagName:'ul',

    className:'nav nav-tabs',

    initialize:function () {
        console.log('Initializing HeroStatsView');

        this.model.hero.bind("change", this.render, this);
        this.model.profile.bind("change", this.render, this);

        this.template = _.template($('#hero-stats-template').html());
//        this.itemTemplate = _.template($('#select-hero-item-template').html());
    },

    /*events:{
        "click #bt_submit":"sumbitBtnClick"
    },   */

    render:function () {
        $(this.el).html(this.template({
            'profileBattletag': this.model.profile.get('battleTag'),
            'profileBattletagSafe': this.model.profile.get('battleTagSafe'),
            'heroId': this.model.hero.get('id'),
            'page': this.model.page // TODO: wrng, should be a part of model
        }));
/*
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


        }, this);*/

        return this;
    }/*,

    sumbitBtnClick:function () {
        Backbone.history.navigate("profile/" + $('#bt_input').val().replace('#', '-').replace(/\s/g, ""), {'trigger': true});
    }  */

});