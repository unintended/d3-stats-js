
var SimulationModel = Backbone.Model.extend({

    initialize: function() {
        this.head = new ItemCollection();
        this.shoulders = new ItemCollection();
        this.neck = new ItemCollection();
        this.hands = new ItemCollection();
        this.torso = new ItemCollection();
        this.bracers = new ItemCollection();
        this.leftFinger = new ItemCollection();
        this.rightFinger = new ItemCollection();
        this.waist = new ItemCollection();
        this.legs = new ItemCollection();
        this.feet = new ItemCollection();
        this.mainHand = new ItemCollection();
        this.offHand = new ItemCollection();
    },

    loadFromHero: function(hero) {

        var items = hero.get('items');
//        this.items.loadFromHero(hero);

        _.each(hero.get('items'), function(itemRaw, slot) {
            var collection = this[slot];
            if (!collection)
                return;

            var item = new Item(itemRaw);
            item.fetch(); // load details

            if (collection.length == 0) {
                collection.add(item);
            } else {
                collection.at(0).clear({silent: true});
                collection.at(0).set(item);
            }
        }, this);

        this.updateBaseStats(hero);
    },

    getBaseStatsForLevel: function(basestat, level) {
        var res = {};

        return {}
    },

    updateBaseStats : function(hero) {

        var basestat;
        var heroClass = hero.get('class');
        var absLevel = hero.get('level') + hero.get('paragonLevel');

        if (heroClass == 'demon-hunter' || heroClass == 'monk') {
            basestat = 'dex';
        } else if (heroClass == 'wizard' || heroClass == 'witch-doctor') {
            basestat = 'int';
        } else if (heroClass == 'warrior') {
            basestat = 'str';
        } else {
            alert('unknown hero class: ' + heroClass);
            return;
        }

        var statAfterLevel = function(level, stat, basestat) {
            if (stat == 'vit')
                return 9 + 2 * (level - 1);
            if (stat == basestat)
                return 10 + 3 * (level - 1);
            return 8 + (level - 1);
        };

        var updateObj = {};

        _.each(this.stats, function(stat) {
            updateObj['base_' + stat] = statAfterLevel(absLevel, stat, basestat);
        });
        updateObj.dmgstat = basestat;
        this.set(updateObj);
    },

    stats: ['str', 'dex', 'int', 'vit'],

    base_stats: {
        'demon-hunter': 'dex'
    },

    statsPerLevel: {
        'demon-hunter': {
            'dex': 3,
            'vit': 2,
            'int': 1,
            'str': 1
        },
        'monk': {
            'dex': 3,
            'vit': 2,
            'int': 1,
            'str': 1
        }
    },

    'defaults' : {
        'base_dex': 0,
        'dmgstat': 'dex'
    }
});

var Item = Backbone.Model.extend({

    url: 'http://eu.battle.net/api/d3/data/',

    fetch: function() {
        var itemId = this.get('tooltipParams');
        if (!itemId)
            return;

        var self = this;

        this.set({loading: true});
        $.ajax({
            url:self.url + itemId,
            dataType:"jsonp",
            success:function (data) {
                if (!data.name) {
                    self.set({loading:false, loadingFailed: true, lastTriedItemId: itemId});
                    return;
                }
                self.set({loading:false, loadingFailed: false});
                self.updateStats(data);
            }, error: function() {
                self.set({loading:false, loadingFailed: true, lastTriedItemId: itemId});
            }
        });
    },

    updateStats: function(data) {
        var res = {};
        this.mapAttributes(data.attributesRaw, res, this.dataMappings);
        _.each(data.gems, function (gem) {
            this.mapAttributes(gem.attributesRaw, res, this.dataMappings);
        }, this);

        if (res.mindmg > 0 && res.ddmg > 0)
            res.maxdmg = res.mindmg + res.ddmg;

        res.tooltipParams = data.tooltipParams;
        this.set(res);
    },

    mapAttributes: function(from, to, map) {
        _.each(from, function(v, k) {
            if (map[k]) {
                if (!to[map[k].to])
                    to[map[k].to] = 0;
                to[map[k].to] += v[map[k].attr];
//                to[map[k].to] = to[map[k].to].toFixed(2);
            }
        });
    },

    dataMappings: {
        'Dexterity_Item': {to: 'dex', attr: 'min'},
        'Crit_Percent_Bonus_Capped': {to: 'cc', attr: 'min'},
        'Crit_Damage_Percent': {to: 'cdmg', attr: 'min'},
        'Attacks_Per_Second_Percent': {to: 'ias', attr: 'min'},
        'Damage_Min#Physical': {to: 'mindmg', attr: 'min'},
        'Damage_Delta#Physical' : {to: 'ddmg', attr: 'min'}
    },

    defaults : {
        name:   null,
        vit:    0,
        dex:    0,
        int:    0,
        str:    0,
        def:    0,
        cc:     0,
        cdmg:   0,
        ias:    0,
        mindmg: 0,
        ddmg:   0,
        maxdmg: 0
//        base_resist:  0,
//        base_dodge:   0,
//        extra_life:   0,
//        base_melee_reduc:   0,
//        base_ranged_reduc:  0,
//        block_chance:    0,
//        min_block_value: 0,
//        max_block_value: 0
    }

});


var ItemCollection = Backbone.Collection.extend({
    model: Item,

    loadFromHero: function (hero) {
        this.reset();

        _.each(hero.get('items'), function(item, slot) {
            var itemObj = new Item(item);
            itemObj.set({'slot': slot});
            this.add(itemObj);
        }, this);
    }
});