window.HeroStatsView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing HeroStatsView');
//        this.model.hero.on("change", this.render, this);
//        this.model.hero.on("change", this.updateSimulationModel);
        this.model.on('change:page', this.updatePage, this);

        this.template = _.template($('#hero-stats-template').html());

        this.simulationModel = new SimulationModel();
        this.simulationModel.items.on('reset', this.resetSlots);
//        this.simulationModel.defaultGearSet.on('change', this.renderSimulation, this);
//        this.simulationModel

//        this.itemTemplate = _.template($('#select-hero-item-template').html());
    },

    resetSlots: function() {
        $('.item-slot li', this.el);
    },

    renderSlot: function(slot) {
        $('.item-slot-' + slot.get('name'), this.el);
    },

    /*events:{
        "click #bt_submit":"sumbitBtnClick"
    },   */

    updateSimulationModel: function(hero) {
        this.simulationModel.clear();
        this.simulationModel.loadFromHero(hero);
    },

    updatePage: function () {
        var page = this.model.get('page');
        $('li', this.el).removeClass('active');
        $('.' + page, this.el).addClass('active');
    },

    renderSimulation: function() {
        $('<li/>').addClass('nav-header').text('Head').appendTo($('#gear', this.el));
//        var itemLi = $('<li/>').text(slot);
    },

    render:function () {
        $(this.el).html(this.template());

        $('li', this.el).click(function(event) {
            event.preventDefault();
//            this.model.set({page: });
        });

        this.updatePage();
        this.updateSimulationModel(this.model.hero);

/*
        _.each(this.model.hero.get('items'), function(item, slot) {
            $('<li/>').addClass('nav-header').text(slot).appendTo($('#gear', this.el));

//            $('<span/>').attr('data-d3tooltip', 'http://eu.battle.net/d3/en/' + item.tooltipParams).text(item.name).appendTo(itemLi);
            $('<strong/>').text(item.name).appendTo(itemLi);
            itemLi.appendTo($('#gear', this.el))
        }, this);*/
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

window.ItemStatsView = Backbone.View.extend({

    initialize: function() {
        this.model.on('change', this.render, this);
    },

    render: function() {
        var itemLi = $('<li/>').text(slot);$('<strong/>').text(item.name).appendTo(itemLi);
        return this;
    }

});