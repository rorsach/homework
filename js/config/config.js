require([
    'js/views/MasterView',
    'js/collections/PostsCollection',
    'js/routers/router',
    'js/models/appState'
], function(
    MasterView,
    postsCollection,
    router,
    appState
) {
    'use strict';

    var masterView = new MasterView({
        collection: postsCollection
    });
    
});
