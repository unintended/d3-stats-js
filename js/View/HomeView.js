window.HomeView = Backbone.View.extend({

    className: "hero-unit",

    initialize:function () {
        console.log('Initializing Home View');

        this.template = _.template($('#welcome-template').html());

        var self = this;
        this.model.profile.on('change:loading', function(profile) {
            if (profile.get('loading'))
                $('#bt_submit', self.el).button('loading');
            else
                $('#bt_submit', self.el).button('reset');
        });
    },

    events:{
        "click #bt_submit":"sumbitBtnClick"
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },

    sumbitBtnClick:function () {
        this.model.profile.loadProfile($('#bt_input').val());
//        Backbone.history.navigate("profile/" + $('#bt_input').val().replace('#', '-').replace(/\s/g, ""), {'trigger': true});
    }

});