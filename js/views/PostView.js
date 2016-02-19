/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'js/routers/router',
    'text!templates/postViewTemplate.html',
    'text!templates/postFullViewTemplate.html'
], function(
    $,
    _,
    Backbone,
    router,
    postViewTemplate,
    postFullViewTemplate
) {
    'use strict';

    var PostView = Backbone.View.extend({

        events: {
            'click .post': 'onPostExcerptClick',
            'click .post-backbutton': 'onBackButtonClick'
        },
        
        initialize: function (options) {
            this.full = options &&  !!options.full || false;
            this.templateString = (this.full) ? postFullViewTemplate : postViewTemplate;
            this.template = _.template(this.templateString);
        },

        render: function () {
            var data = $.extend({}, {full: this.full}, this.model.attributes);
            this.$el.html(this.template(data));

            if (this.full) {
                this.scrollToTop();
            }
            
            return this;
        },

        scrollToTop: function() {
            $('html, body').animate({ scrollTop: 0 }, 'fast');
        },
        
        onPostExcerptClick: function (event) {
            router.navigate('posts/' + this.model.get('slug'), {trigger: true});
        },

        onBackButtonClick: function (event) {
            Backbone.history.history.back();
        },
    });

    return PostView;
    
});
