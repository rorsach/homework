/*global define*/
define([
    'underscore',
    'backbone',
    'js/collections/postsCollection',
], function(
    _,
    Backbone,
    postsCollection
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
            index = (index < this.get('minIndex')) ? 0 : index;
            index = (index > this.get('maxIndex')) ? this.get('maxIndex') : index;
            
            this.set('currentPage', index);            
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
        }
    });

    return new AppState();
    
});
