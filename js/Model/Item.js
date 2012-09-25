
var SimulationModel = Backbone.Model.extend({

    initialize: function() {
        this.defaultGearSet = new GearSet();
//        this.gearSets = new GearSetCollection([new GearSet()]);

//        this.head = new Slot({name: 'head'});
        this.items = new ItemCollection();
    },

    loadFromHero: function(hero) {

//        var items = hero.get('items');
        this.items.loadFromHero(hero);

//        _.each(hero.get('items'), function(item, slot) {
//            this.defaultGearSet.updateItemAtSlot(slot, item);
//        }, this);
    }

});

var Slot = Backbone.Model.extend({

    initialize: function() {
        this.items = new ItemCollection();
        this.items.on('add reset', function() {
            this.trigger('change');
        }, this);
    }

});

var GearSet = Backbone.Model.extend({

    initialize: function() {
        this.head = new Item();
        this.shoulders = new Item();
    },

    updateItemAtSlot: function(slot, itemData) {
        var item = this[slot];
        if (item instanceof Item) {
            item.clear();
            item.set(itemData);
        }
        this.trigger('change');
    }
});

var GearSetCollection = Backbone.Collection.extend({
    model: GearSet,


});

var Item = Backbone.Model.extend({

    defaults : {
        name:   null,
        vit:    0,
        dex:    0,
        int:    0,
        str:    0,
        def:    0,
        cc:     0,
        cdmg:   0,
        ias:    0
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