/*global define*/
define([
    'underscore',
    'backbone'
], function(
    _,
    Backbone
) {
    'use strict';

    initialize: function() {
        this.set('itemsPerPage', 10);
        this.set('currentPage', 1);
    }
});
