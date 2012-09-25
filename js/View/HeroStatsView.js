window.HeroStatsView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing HeroStatsView');
//        this.model.hero.on("change", this.render, this);
//        this.model.hero.on("change", this.updateSimulationModel);
        this.model.on('change:page', this.updatePage, this);

        this.template = _.template($('#hero-stats-template').html());

        var self = this;

        this.simulationModel = new SimulationModel();
        this.simulationModel.head.on('add remove', function() { self.renderSlot($('.item-slot-head', self.el), this) });
        this.simulationModel.shoulders.on('add remove', function() { self.renderSlot($('.item-slot-shoulders', self.el), this) });
        this.simulationModel.neck.on('add remove', function() { self.renderSlot($('.item-slot-neck', self.el), this) });
        this.simulationModel.hands.on('add remove', function() { self.renderSlot($('.item-slot-hands', self.el), this) });
        this.simulationModel.torso.on('add remove', function() { self.renderSlot($('.item-slot-torso', self.el), this) });
        this.simulationModel.bracers.on('add remove', function() { self.renderSlot($('.item-slot-bracers', self.el), this) });
        this.simulationModel.leftFinger.on('add remove', function() { self.renderSlot($('.item-slot-leftFinger', self.el), this) });
        this.simulationModel.rightFinger.on('add remove', function() { self.renderSlot($('.item-slot-rightFinger', self.el), this) });
        this.simulationModel.waist.on('add remove', function() { self.renderSlot($('.item-slot-waist', self.el), this) });
        this.simulationModel.legs.on('add remove', function() { self.renderSlot($('.item-slot-legs', self.el), this) });
        this.simulationModel.feet.on('add remove', function() { self.renderSlot($('.item-slot-feet', self.el), this) });
        this.simulationModel.mainHand.on('add remove', function() { self.renderSlot($('.item-slot-mainHand', self.el), this) });
        this.simulationModel.offHand.on('add remove', function() { self.renderSlot($('.item-slot-offHand', self.el), this) });
    },

    renderSlot: function (slotEl, items) {
        $('.item', slotEl).remove();

        items.each(function(item) {
            var itemView = new ItemView({model: item});
            slotEl.append(itemView.render().el);
        });
    },
//
//    renderHeadSlot: function(g) {
//        this.renderSlot($('.item-slot-head', this.el), this.simulationModel.head);
//    },
//
//    renderShouldersSlot: function(g) {
//        this.renderSlot($('.item-slot-head', this.el), this.simulationModel.head);
//    },
//
//    renderHeadSlot: function(g) {
//        this.renderSlot($('.item-slot-head', this.el), this.simulationModel.head);
//    },
//
//    renderHeadSlot: function(g) {
//        this.renderSlot($('.item-slot-head', this.el), this.simulationModel.head);
//    },
//
//    renderHeadSlot: function(g) {
//        this.renderSlot($('.item-slot-head', this.el), this.simulationModel.head);
//    },
//
//    renderHeadSlot: function(g) {
//        this.renderSlot($('.item-slot-head', this.el), this.simulationModel.head);
//    },
//
//    renderHeadSlot: function(g) {
//        this.renderSlot($('.item-slot-head', this.el), this.simulationModel.head);
//    },
//
//    renderHeadSlot: function(g) {
//        this.renderSlot($('.item-slot-head', this.el), this.simulationModel.head);
//    },
//
//    renderHeadSlot: function(g) {
//        this.renderSlot($('.item-slot-head', this.el), this.simulationModel.head);
//    },
//
//    renderHeadSlot: function(g) {
//        this.renderSlot($('.item-slot-head', this.el), this.simulationModel.head);
//    },
//
//    renderHeadSlot: function(g) {
//        this.renderSlot($('.item-slot-head', this.el), this.simulationModel.head);
//    },
//
//    renderHeadSlot: function(g) {
//        this.renderSlot($('.item-slot-head', this.el), this.simulationModel.head);
//    },

    /*events:{
        "click #bt_submit":"sumbitBtnClick"
    },   */

    updateSimulationModel: function(hero) {
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
//        this.renderHeadSlot();

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

window.ItemView = Backbone.View.extend({

    tagName: 'li',

    initialize: function() {
        this.model.on('change', this.render, this);
        this.template = _.template($('#item-template').html());
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});