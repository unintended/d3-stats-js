window.HomeView = Backbone.View.extend({

    className: "hero-unit",

    initialize:function () {
        console.log('Initializing Home View');
        this.template = _.template($('#welcome-template').html());
        this.alertTemplate = _.template($('#alert-template').html());
        this.model = new Profile();
        this.model.on('change:loading', this.onLoadingChange, this);
    },

    events: {
        'click #bt_submit':'sumbitBtnClick'
    },

    render:function () {
        $(this.el).html(this.template());
        this.renderLoading();
        return this;
    },

    onLoadingChange: function() {
        this.renderLoading();

        if (!this.model.get('loading')) {
            if (this.model.get('loaded')) {
                this.trigger('profileLoaded', this.model);
            } else {
                var $ah = $('#alert-holder');
                $ah.empty();
                $ah.append(this.alertTemplate({'title': 'Error!', 'text': "Couldn't load profile. Is the battletag ok?"}));
                $('.alert', $ah).alert();
            }
        }
    },

    renderLoading: function() {
        if (this.model.get('loading'))
            $('#bt_submit', self.el).button('loading');
        else
            $('#bt_submit', self.el).button('reset');
    },

    sumbitBtnClick:function () {
        this.model.loadProfile($('#bt_input').val(), $('#region_input').val());
//        Backbone.history.navigate("profile/" + $('#bt_input').val().replace('#', '-').replace(/\s/g, ""), {'trigger': true});
    }

});