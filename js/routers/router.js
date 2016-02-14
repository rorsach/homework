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
            "*actions": "defaultRoute"
        },

        initialize: function() {
            this.listenTo(appState, 'change:currentPage', this.onAppStatePageChange, this);
        },

        posts: function (slug) {
            console.log("show post:", slug);
            Backbone.trigger('router:showslug', slug);
        },

        page: function (index) {
            console.log("show page:", index);
            appState.setCurrentPage(index);
        },

        onAppStatePageChange: function (model, value, options) {
            this.navigate('page/' + value);
            console.log('onAppStatePageChange', value);
        },
    });

    Backbone.history.start({

    });

    return new Router();

});
