
/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    'js/models/appState',
    'js/views/PostView',
    'text!templates/masterViewTemplate.html',
    'text!templates/rowTemplate.html'
], function(
    $,
    _,
    Backbone,
    appState,
    PostView,
    masterViewTemplate,
    rowTemplate
) {
    'use strict';

    var MasterView = Backbone.View.extend({

        // itemsPerPage: 10,
        // currentPage: 0,
        // minIndex: 0,
        // maxIndex: 0,
        
        el: '#main-content',

        template: _.template(masterViewTemplate),

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

            var html = this.template({
                currentPage: appState.get('currentPage') + 1,
                maxIndex: appState.get('maxIndex') + 1
            });
            
            
            this.$el.empty();
            this.$el.append(html) ;

            var $row = this.appendRow();
            $columnEl = this.getColumns($row);
            
            this.collection.forEach(function (model, index) {
                
                if (index >= range.start && index < range.end) {
                    // Insert posts across a given range across all columns evenly.
                    // Even distribution ensures most recent posts are at the top, by rows.
                    postView = new PostView({model: model});

                    $columnEl.eq(column).append(postView.render().$el);
                    
                    if ($columnEl.length - 1 > column) {                        
                        column++;
                    } else {
                        $row = this.appendRow();
                        $columnEl = this.getColumns($row);
                        column = 0;
                    }
                }
                
            }, this);       
        },

        appendRow: function() {
            var rowHtml = _.template(rowTemplate, {});
            var $row = $(rowHtml());
            this.$el.find('.posts-section').append($row);
            return $row;
        },

        getColumns: function($row) {
            return $row.find('.span_1_of_4');
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
