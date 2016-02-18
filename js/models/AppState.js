/*global define*/
define([
    'underscore',
    'backbone',
    'js/collections/postsCollection',
    'js/routers/router'
], function(
    _,
    Backbone,
    postsCollection,
    router
) {
    'use strict';
    
    var AppState = Backbone.Model.extend({

        defaults: {
            itemsPerPage: 10, // number of items per page
            currentPage: 0, // currently viewed page index
            minIndex: 0, // minimum page index value
            maxIndex: 0 // maximum possible page index value, calculated from collection size
        },
        
        initialize: function() {
            this.listenTo(postsCollection, 'sync', this.onPostsCollectionSync, this);
            this.listenTo(Backbone, 'router:showpage', this.onRouterShowPage, this);
            this.listenTo(Backbone, 'router:showslug', this.onRouterShowSlug, this);
        },

        prevPage: function() {
            if (this.get('currentPage') > this.get('minIndex')) {
                this.setCurrentPage(this.get('currentPage') - 1);
            }
        },

        nextPage: function () {
            if (this.get('currentPage') < this.get('maxIndex')) {
                this.setCurrentPage(this.get('currentPage') + 1);
            }
        },

        setCurrentPage: function (index) {
            // Clamp input values
            index = index || 0; // in default route scenario, index is not defined.
            index = parseInt(index, 10);
            index = (index < this.get('minIndex')) ? 0 : index;
            index = (index > this.get('maxIndex')) ? this.get('maxIndex') : index;

            router.navigate('page/' + index, {trigger: true});
            this.set('currentPage', index);            
            this.trigger('change:currentPage', this, index);
        },
                
        getArticleRange: function () {
            var start = this.get('currentPage') * this.get('itemsPerPage');
            var end = start + this.get('itemsPerPage');
            return {
                start: start,
                end: end
            };
        },
        
        onPostsCollectionSync: function(event) {
            this.set('maxIndex', Math.floor((postsCollection.length -1) / this.get('itemsPerPage')));
        },

        onRouterShowSlug: function (slug) {
            this.set('slug', slug);
            this.trigger('change:slug', this, slug);
        },
        
        onRouterShowPage: function (index) {
            this.setCurrentPage(index);
        },
        
    });

    return new AppState();
    
});
