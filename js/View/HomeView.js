window.HomeView = Backbone.View.extend({

    initialize:function () {
        console.log('Initializing Home View');

        this.template = _.template($('#welcome-template').html());
    },

    events:{
        "click #bt_submit":"sumbitBtnClick"
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },

    sumbitBtnClick:function () {
        Backbone.history.navigate("profile/" + $('#bt_input').val().replace('#', '-').replace(/\s/g, ""));
    }

});