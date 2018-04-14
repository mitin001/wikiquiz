exports.config = {
  paths: {
    watched: ['app']
  },
  files: {
    javascripts: {
      defaultExtension: 'js',
      joinTo: {
        'js/app.js': /^app/,
        'js/vendor.js': /^(?!app)/
      }
    },
    templates: {
      defaultExtension: 'hbs',
      joinTo: 'js/app.js'
    }
  },
  npm: {
    globals: {
      $: 'jquery',
      Marionette: 'backbone.marionette',
      Backbone: 'backbone',
      _: 'underscore',
    },
    compilers: ['babel-brunch']
  },
  plugins: {
    babel: {
      presets: ['es2015'],
      ignore: [
        /^(node_modules)(?!\/foundation)/
      ]
    }
  },
  modules: {
    autoRequire: {
      'js/app.js': ['initialize']
    }
  },
  server: {
    port: 8080,
    run: true
  }
};
