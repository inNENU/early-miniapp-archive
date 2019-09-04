/*
 * @Author: Mr.Hope
 * @Date: 2019-07-30 14:43:47
 * @LastEditors: Mr.Hope
 * @LastEditTime: 2019-09-03 23:15:19
 * @Description: JSdoc 配置文件
 */
'use strict';

// const jsdoc2md = require('jsdoc-to-markdown');

// jsdoc2md.render({ files: 'App/utils/*.ts' }).then(console.log);

module.exports = {
  plugins: [
    "plugins/markdown",
    "plugins/summarize"
  ],
  // plugins: ['plugins/markdown'],
  recurseDepth: 10,
  source: {
    'include': ['./App/utils'],
    'exclude': [],
    'includePattern': 'ts$',
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
    'destination': './doc/',          // Same as -d ./out/
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

// "plugins": {
//   "tencentvideo": {
//     "version": "1.3.6",
//       "provider": "wxa75efa648b60994b"
//   }
// }