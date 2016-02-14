/*global define*/
define([
    'underscore',
    'backbone',
    'text!templates/postViewTemplate.html'
], function(
    _,
    Backbone,
    postViewTemplate
) {
    'use strict';

    var PostView = Backbone.View.extend({

        template: _.template(postViewTemplate),
        
        initialize: function (options) {
            console.log('Post:initialize');
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        
    });

    return PostView;
    
});
