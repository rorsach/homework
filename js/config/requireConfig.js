require.config({
    text: {
        useXhr: function() { // Forces 'Text' plugin to not append the .js extension for cross-domain originated template files
            return true;
        }
    },
    baseUrl: '/',
    paths: {
        jquery: 'js/lib/jquery-1.12.0',
        underscore: 'js/lib/underscore',
        backbone: 'js/lib/backbone',
        text: 'js/lib/text'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});
