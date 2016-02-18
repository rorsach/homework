/*global define*/
define([
    'underscore',
    'backbone',
    'js/models/appState'
], function(
    _,
    Backbone,
    appState
) {
    'use strict';

    var Router = Backbone.Router.extend({
        
        routes: {
            "posts/:slug": "posts",
            "page/:index": "page",
            "" : "defaultRoute"
            
        },

        initialize: function() {

        },

        defaultRoute: function() {
            Backbone.trigger('router:showpage');
        },

        posts: function (slug) {
            console.log("show post:", slug);
            Backbone.trigger('router:showslug', slug);
        },

        page: function (index) {
            console.log("show page:", index);
            Backbone.trigger('router:showpage', index);
        },

        onAppStatePageChange: function (model, value, options) {
            this.navigate('page/' + value);
        },
    });

    Backbone.history.start({

    });

    return new Router();

});
