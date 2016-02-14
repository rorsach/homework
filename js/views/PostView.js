/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/postViewTemplate.html'
], function(
    $,
    _,
    Backbone,
    postViewTemplate
) {
    'use strict';

    var PostView = Backbone.View.extend({

        template: _.template(postViewTemplate),

        events: {
            'click': 'onPostExcerptClick'
        },
        
        initialize: function (options) {
        },

        render: function (options) {
            var data;
            
            options = options || {};
            data = $.extend({}, options, this.model.attributes);

            this.$el.html(this.template(data));

            return this;
        },

        onPostExcerptClick: function (event) {
            console.log('post excerpt click');
            window.location.hash = 'slug/' + this.model.get('slug');
        },
        
    });

    return PostView;
    
});
