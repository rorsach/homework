/*global define*/
define([
    'underscore',
    'backbone'
], function(
    _,
    Backbone
) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
            "posts/:slug": "posts",
            "page/:index": "page",
            "*actions": "defaultRoute"
        },

        posts: function (slug) {
            console.log("show post:", slug);
        },

        page: function (index) {
            console.log("show page:", index);
        }
        
    });

    Backbone.history.start({

    });

    return new Router();

});
