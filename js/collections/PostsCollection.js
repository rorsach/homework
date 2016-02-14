/*global define*/
define([
    'underscore',
    'backbone',
    'js/models/Post'
], function(
    _,
    Backbone,
    Post
) {
    'use strict';
    
    var PostsCollection = Backbone.Collection.extend({

        model: Post,

        url: 'https://public-api.wordpress.com/rest/v1/sites/idcdistro.wordpress.com/posts/',
        
        initialize: function () {
            console.log('PostsCollection:initialize');
        },
        
        sync: function(method, collection, options) {
            options.dataType = 'jsonp';
            options.jsonpCallback = 'ajpRspthis';
            return Backbone.sync(method, collection, options);
        },

        parse: function (response) {
            return response.posts;  
        }
        
    });

    return new PostsCollection();
});
