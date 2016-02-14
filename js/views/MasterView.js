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
            this.collection.on('sync', this.onSync, this);
            this.appState.on('change:currentPage', this.render, this);
            this.listenTo(Backbone, 'router:showslug', this.render, this);
            // this.collection.on('all', this.onAll, this);
            this.collection.fetch();
        },

        onAppStateAll: function(event) {
            console.log('MasterView:appState:all', arguments);
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
            this.$el.empty();

            postView = new PostView({full: true});

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
                    // console.log('index:', index, 'title:', model.get('title'), model.get('ID'));
                    $columnEl.eq(column).append(postView.render().$el);
                    column = ($columnEl.length - 1 > column) ? column + 1 : 0;
                }
                
            }, this);       
        },

        onSync: function (event) {
            this.maxIndex =  Math.floor((this.collection.length -1)/this.itemsPerPage);
            this.render();
        },
        
        onAll: function () {
            console.log('this.collection', this.collection);
        },

        onPrevButtonClick: function (event) {
            appState.prevPage();
        },

        onNextButtonClick: function (event) {
            appState.nextPage();
        },
        
    });

    return MasterView;
});
