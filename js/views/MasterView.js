/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'js/models/appState',
    'js/views/PostView',
    'text!templates/masterViewTemplate.html'
], function(
    $,
    _,
    Backbone,
    appState,
    PostView,
    masterViewTemplate
) {
    'use strict';

    var MasterView = Backbone.View.extend({

        // itemsPerPage: 10,
        // currentPage: 0,
        // minIndex: 0,
        // maxIndex: 0,
        
        el: '#main-content',

        events: {
            'click .prevPage': 'onPrevButtonClick',
            'click .nextPage': 'onNextButtonClick'
        },
        
        initialize: function(options) {
            this.appState = appState;
            this.appState.on('change:currentPage', this.render, this);
            this.appState.on('change:slug', this.onAppStateChangeSlug, this);

            this.collection.on('sync', this.onSync, this);
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

            this.renderList();

            return this;
        },

        renderArticle: function (slug) {
            var postView;
            var data;
            var model;
            
            model = this.collection.findWhere({slug: slug});
            
            postView = new PostView({model: model, full: true});

            this.$el.empty();
            this.$el.append(postView.render().$el);
        },

        renderList: function() {
            var self = this;
            var range = appState.getArticleRange();
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

                    $columnEl.eq(column).append(postView.render().$el);
                    column = ($columnEl.length - 1 > column) ? column + 1 : 0;
                }
                
            }, this);       
        },

        onSync: function (event) {
            this.maxIndex =  Math.floor((this.collection.length -1)/this.itemsPerPage);
            this.render();
        },
        
        onPrevButtonClick: function (event) {
            appState.prevPage();
        },

        onNextButtonClick: function (event) {
            appState.nextPage();
        },
  
        onAppStateChangeSlug: function(model, slug) {
            this.renderArticle(slug);
        },
        
    });

    return MasterView;
});
