require([
    'js/views/MasterView',
    'js/collections/postsCollection',
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
