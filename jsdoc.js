'use strict';

const jsdoc2md = require('jsdoc-to-markdown');

jsdoc2md.render({ files: 'miniprogram/utils/*.ts' }).then(console.log);

module.exports = {
  plugins: ['plugins/markdown'],
  'recurseDepth': 10,
  'source': {
    'include': ['./miniprogram/utils'],
    'exclude': [],
    'includePattern': '.+\\.ts(doc|x)?$',
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

// wx9ce37d9662499df3

// wx33acb831ee1831a5


// 更改template，component.ts和app.wxss

// "plugins": {
//   "tencentvideo": {
//     "version": "1.3.6",
//       "provider": "wxa75efa648b60994b"
//   }
// }