var renderSettings = {
    "dps":{
        "prefix":'',
        "postfix":"DPS",
        "precision":1,
        "percent":false
    },
    "dps_unbuffed": {
        "prefix":'',
        "postfix":"DPS",
        "precision":2,
        "percent":false
    },
    "dex":{
        "prefix":'+',
        "postfix":"Dex",
        "precision":0,
        "percent":false
    },
    "vit":{
        "prefix":'+',
        "postfix":"Vit",
        "precision":0,
        "percent":false
    },
    "str":{
        "prefix":'+',
        "postfix":"Str",
        "precision":0,
        "percent":false
    },
    "int":{
        "prefix":'+',
        "postfix":"Int",
        "precision":0,
        "percent":false
    },
    "cc":{
        "prefix":'+',
        "postfix":"CC",
        "precision":1,
        "percent":true
    },
    "cdmg":{
        "prefix":'+',
        "postfix":"CD",
        "precision":0,
        "percent":true
    },
    "ias":{
        "prefix":'+',
        "postfix":"AS",
        "precision":0,
        "percent":true
    },
    "mindmg":{
        "prefix":'+',
        "postfix":"Min",
        "precision":0,
        "percent":false
    },
    "maxdmg":{
        "prefix":'+',
        "postfix":"Max",
        "precision":0,
        "percent":false
    },
    "deltadmg":{
        "prefix":'+',
        "postfix":"Delta",
        "precision":0,
        "percent":false
    },
    "weapon_dps":{
        "prefix":'',
        "postfix":"DPS",
        "precision":1,
        "percent":false
    },
    "weapon_aps":{
        "prefix":'',
        "postfix":"",
        "precision":2,
        "percent":false
    }

};

var renderStat = function (val, settings) {
    if (val) {
        if (settings.percent)
            val *= 100;
        return settings.prefix + val.toFixed(settings.precision) + (settings.percent ? '% ' : ' ') + settings.postfix;
    }
    return undefined;
};

var renderStatValue = function (val, settings) {
    if (val != undefined) {
        if (settings.percent)
            val *= 100;
        return val.toFixed(settings.precision) + (settings.percent ? '% ' : ' ');
    }
    return undefined;
};

window.HeroStatsView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing HeroStatsView');
//        this.model.hero.on("change", this.render, this);
        this.model.hero.on("change", this.updateSimulationModel, this);
        this.model.on('change:page', this.updatePage, this);

        this.template = _.template($('#hero-stats-template').html());

        var self = this;

        this.simulationModel = new SimulationModel();
        _.each(this.simulationModel.gear, function (items, slot) {
            items.on('add remove', function () {
                self.renderSlot($('.item-slot-' + slot, self.el), this, self)
            });
        });
//
//        this.simulationModel.baseStats.on('change', function () {
//            this.renderStats(this.simulationModel.baseStats,
//                [this.simulationModel.get('dmgstat')].concat(this.displayBaseStats), $('#base-stats', this.el));
//        }, this);

        this.simulationModel.gearStats.on('change', function() {
            this.renderStats(this.simulationModel.gearStats,
                [this.simulationModel.get('dmgstat')].concat(this.displayGearStats), $('#gear-stats', this.el));
        }, this);

        this.simulationModel.on('change', function() {
            this.renderStats(this.simulationModel, this.displayDamageStats, $('#dmg-stats', this.el));
        }, this);
    },

    renderSlot:function (slotEl, items, mainModel) {
        $('.item', slotEl).remove();

        items.each(function (item, n) {
            var itemView = n ? new ItemView({model:{dmgstat:mainModel.simulationModel.get('dmgstat'), item:item}})
                : new EquippedItemView({model:{dmgstat:mainModel.simulationModel.get('dmgstat'), item:item}}); // the first item is equipped
            slotEl.append(itemView.render().el);
        });

    },

    updateSimulationModel:function (hero) {
        this.simulationModel.loadFromHero(hero);
    },

    updatePage:function () {
        var page = this.model.get('page');
        $('li', this.el).removeClass('active');
        $('.' + page, this.el).addClass('active');
    },

    renderStats:function (stats, statsToRender, $el) {
        $('li', $el).not('.section-header').remove();
        _.each(statsToRender, function (stat) {
            var statVal = stats.get(stat);
            $('<li/>').append($('<span/>').addClass('stat-name').text(this.statsNames[stat]))
                .append($('<span/>').text(renderStatValue(statVal, renderSettings[stat]))).appendTo($el);
        }, this);
    },

    displayBaseStats:['cc', 'cdmg'],
    displayGearStats:['cc', 'cdmg', 'ias', 'mindmg', 'maxdmg'],
    displayDamageStats:['weapon_dps', 'weapon_aps', 'dps_unbuffed'],
    statsNames:{
        'dex': 'Dexterity',
        'cc': 'Critical Chance',
        'cdmg': 'Critical Damage',
        'ias': 'Attack Speed Increase',
        'mindmg': 'Minimal Damage',
        'maxdmg': 'Maximal Damage',
        'deltadmg': 'Delta Damage',
        'weapon_dps': 'Weapon DPS',
        'weapon_aps': 'Weapon APS',
        'dps_unbuffed': 'DPS Unbuffed'
    },

    render:function () {
        $(this.el).html(this.template(this.simulationModel.toJSON()));
        this.updateSimulationModel(this.model.hero);

        var self = this;
        _.each(this.simulationModel.gear, function (items, slot) {
            $('.item-slot-' + slot + ' a', self.el).unbind('click');
            $('.item-slot-' + slot + ' a', self.el).click(function(event) {
                event.preventDefault();
                items.push(new Item());
            });
        });

//        $('li', this.el).click(function(event) {
//            event.preventDefault();
////            this.model.set({page: });
//        });

//        this.updatePage();
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

    tagName:'li',

    className:'item',

    initialize:function () {
        this.model.item.on('change', this.render, this);
    },

    render:function () {
        this.$el.empty();
        $("<span/>").addClass("item-name").text(this.model.item.get("name")).appendTo(this.$el);

        var dmgstat = this.model.dmgstat;
        $('<span/>')
//                $('<form class="form-inline" />')
//                $('<div class="input-append"/>')
//                        .append('+')
//                .append(
                /*.append($('<span />')
                    .append($('<input class="span2" size="3" type="text"/>').val(this.model.item.get(dmgstat) || undefined).attr('placeholder', dmgstat)))
                .append($('<span class="input-append" />')
                    .append($('<input class="span2" size="3" type="text"/>').val(this.model.item.get('cc') || undefined).attr('placeholder', 'CC'))
                    .append($('<span class="add-on"/>').text('%')))
                .append($('<span class="input-append" />')
                    .append($('<input class="span2" size="3" type="text"/>').val(this.model.item.get('cdmg') || undefined).attr('placeholder', 'CDmg'))
                    .append($('<span class="add-on"/>').text('%')))
                .append($('<div />')
                    .append('+')
                    .append($('<input class="span1" size="3" type="text"/>').val(this.model.item.get('mindmg') || undefined))
                    .append('-')
                    .append($('<input class="span1" size="3" type="text"/>').val(this.model.item.get('maxdmg') || undefined)))*/
            .append($('<input placeholder="" />').val(this.model.item.shortcut()))
                .appendTo(this.$el);
//                $('<div class=""/>').append('+' + renderSettings[dmgstat].postfix).append($('input')))


        return this;
    },
/*
    renderStatPlaceHolder: function (val, settings) {
        if (val) {
            if (settings.percent)
                val *= 100;
            return settings.prefix + val.toFixed(settings.precision) + (settings.percent ? '% ' : ' ') + settings.postfix;
        }
        return undefined;
    },*/

    mandatoryFields: ['dex', 'cc']

});

window.EquippedItemView = Backbone.View.extend({

    tagName:'li',

    className:'item',

    initialize:function () {
        this.model.item.on('change', this.render, this);
    },

    render:function () {
        this.$el.empty();

        $("<span/>").addClass("item-name").append(
            $("<a/>").attr("href", "http://eu.battle.net/api/d3/data/" + this.model.item.get("tooltipParams"))
                .addClass("d3-color-" + this.model.item.get("displayColor"))
                .text(this.model.item.get("name"))
        ).appendTo(this.$el);

        var self = this;
        $('<span/>').text($.map(renderSettings,function (v, k) {
            return renderStat(self.model.item.get(k), v);
        }).join(', ')).appendTo(this.$el);

//        $("<a/>").addClass("btn btn-mini btn-info").append(
//            $("<i/>").addClass("icon-plus icon-white")
//        ).appendTo(this.$el);
//        $(this.el).text(arr);

//        this.renderStat($('.dmgstat', this.el), this.model.item.get(this.model.dmgstat));
//        this.renderPercent($('.cc', this.el), this.model.item.get('cc'));
//        this.renderPercent($('.cdmg', this.el), this.model.item.get('cdmg'));
//        this.renderPercent($('.ias', this.el), this.model.item.get('ias'));
//        this.renderStat($('.mindmg', this.el), this.model.item.get('mindmg'));
//        this.renderStat($('.maxdmg', this.el), this.model.item.get('maxdmg'));
        return this;
    }


});