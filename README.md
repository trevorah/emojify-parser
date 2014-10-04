emojify-parser
==============

A parser for emoji text, written in javascript/node.

How to use
----------

```javascript
var parser = require('emojify-parser');

var tokens = parser.parse('I :heart: emoji!');
console.log(tokens);

/*
 * [ { type: 'text', raw: 'I ' },
 * { type: 'emoji', name: 'heart', raw: ':heart:' },
 * { type: 'text', raw: ' emoji!' } ]
 */
```

How to test
-----------
1. `npm install`
2. `npm test`
