window.HomeView = Backbone.View.extend({

//    className: "hero-unit",

//    className: "row-fluid",

    initialize:function () {
        console.log('Initializing Home View');
        this.template = _.template($('#welcome-template').html());
        this.alertTemplate = _.template($('#alert-template').html());
        this.model = new Profile();
        this.model.on('change:loading', this.renderLoading, this);
        this.model.on('load', function() {
            this.trigger('profileLoaded', this.model);
        }, this);
        this.model.on('error', this.onError, this);
    },

    events: {
        'click #bt_submit':'sumbitBtnClick'
    },

    render:function () {
        $(this.el).html(this.template());
        this.renderLoading();
        return this;
    },

    onError: function() {
        var $ah = $('#alert-holder');
        $ah.empty();
        $ah.append(this.alertTemplate({'title': 'Error!', 'text': "Couldn't load profile. Is the battletag ok?"}));
        $('.alert', $ah).alert();
    },

    renderLoading: function() {
        if (this.model.get('loading'))
            $('#bt_submit', self.el).button('loading');
        else
            $('#bt_submit', self.el).button('reset');
    },

    sumbitBtnClick:function () {
        var btValue = $('#bt_input').val();
        if (!btValue || btValue == '')
            return;
        this.model.loadProfile(btValue, $('#region_input').val());
    }

});