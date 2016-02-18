/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'js/routers/router',
    'text!templates/postViewTemplate.html'
], function(
    $,
    _,
    Backbone,
    router,
    postViewTemplate
) {
    'use strict';

    var PostView = Backbone.View.extend({

        template: _.template(postViewTemplate),

        events: {
            'click .post-excerpt': 'onPostExcerptClick',
            'click .post-backbutton': 'onBackButtonClick'
        },
        
        initialize: function (options) {
            this.full = options &&  !!options.full || false;
        },

        render: function () {
            var data = $.extend({}, {full: this.full}, this.model.attributes);
            this.$el.html(this.template(data));

            return this;
        },

        onPostExcerptClick: function (event) {
            router.navigate('posts/' + this.model.get('slug'), {trigger: true});
        },

        onBackButtonClick: function (event) {
            window.history.go(-1);
        },
    });

    return PostView;
    
});
