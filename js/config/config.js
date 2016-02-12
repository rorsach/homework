require([
    'js/views/MasterView',
    'js/collections/PostsCollection'
], function(
    MasterView,
    PostsCollection
) {
    'use strict';

    var masterView = new MasterView(PostsCollection);
});
