'use strict';

const jsdoc2md = require('jsdoc-to-markdown');

jsdoc2md.render({ files: 'lib/*.js' }).then(console.log);

module.exports = {
  plugins: ['plugins/markdown'],
  'recurseDepth': 10,
  'source': {
    'include': ['./lib'],
    'exclude': [],
    'includePattern': '.+\\.js(doc|x)?$',
    'excludePattern': '(^|\\/|\\\\)_'
  },
  'sourceType': 'module',
  'tags': {
    'allowUnknownTags': true,
    'dictionaries': ['jsdoc', 'closure']
  },
  'opts': {
    'template': 'templates/default',  // Same as -t templates/default
    'encoding': 'utf8',               // Same as -e utf8
    'destination': './out/',          // Same as -d ./out/
    'recurse': true,             // Same as -r
    'package': './package.json'
  },
  'templates': {
    'cleverLinks': false,
    'monospaceLinks': false
  }
};