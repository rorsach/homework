/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'js/views/PostView',
    'text!templates/masterViewTemplate.html'
], function(
    $,
    _,
    Backbone,
    PostView,
    masterViewTemplate
) {
    'use strict';

    var MasterView = Backbone.View.extend({

        itemsPerPage: 10,
        currentPage: 0,
        minIndex: 0,
        maxIndex: 0,
        
        el: '#main-content',

        events: {
            'click .prevPage': 'onPrevButtonClick',
            'click .nextPage': 'onNextButtonClick',
            'click .post-excerpt': 'onPostExcerptClick'
        },
        
        initialize: function(options) {
            this.collection.on('sync', this.onSync, this);
            // this.collection.on('all', this.onAll, this);
            // this.collection.fetch('read', this.collection, {});
            this.collection.fetch();
        },

        
        getPageRange: function (index) {
            index = (index < this.minIndex) ? this.minIndex : index;
            index = (index > this.maxIndex) ? this.maxIndex : index;
            var start = index * this.itemsPerPage;
            var end = start + this.itemsPerPage;
            return {
                start: start,
                end: end
            };
        },

        render: function () {
            var self = this;
            var range = this.getPageRange(this.currentPage);
            var column = 0;
            var $columnEl;
            var postView;

            this.$el.empty();
            this.$el.append(masterViewTemplate);
            $columnEl = self.$el.find('.posts-section > .span_1_of_4');
            
            this.collection.forEach(function (model, index) {
                
                if (index >= range.start && index < range.end) {
                    // Insert posts across a given range across all columns evenly.
                    // Even distribution ensures most recent posts are at the top, by rows.
                    postView = new PostView({model: model});
                    // console.log('index:', index, 'title:', model.get('title'), model.get('ID'));
                    $columnEl.eq(column).append(postView.render().$el);
                    column = ($columnEl.length - 1 > column) ? column + 1 : 0;
                    
                }
                
            }, this);

            return this;
        },

        setCurrentPage: function (index) {
            this.currentPage = index;
            this.render();
        },

        onSync: function (event) {
            this.maxIndex =  Math.floor((this.collection.length -1)/this.itemsPerPage);
            this.render();
        },
        
        onAll: function () {
            console.log('this.collection', this.collection);
        },

        onPrevButtonClick: function (event) {
            if (this.currentPage > this.minIndex) {
                this.setCurrentPage(this.currentPage - 1);
            }
        },

        onNextButtonClick: function (event) {
            if (this.currentPage < this.maxIndex) {
                this.setCurrentPage(this.currentPage + 1);
            }
        },

        onPostExcerptClick: function (event) {
            console.log('post excerpt click');
        },
        
    });

    return MasterView;
});
