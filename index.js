var emojiList = require('./emoji-list');

// emoji like "+1" etc mess with regexps, so escape them
var escapedEmojiList = emojiList.map(function(emoji) {
  return emoji.replace('-', '\\-').replace('+', '\\+');
});

// results in :(\+1|\-1|100|1234|8ball| ... ):
var reString = ':(' + escapedEmojiList.join('|') + '):';

function parse(string) {
  // create the re each time as re.exec() increments re.lastIndex
  var re = new RegExp(reString, 'g');
  var prevLastIndex = 0;
  var tokens = [];

  // while regex still matches emoji
  for(var match = re.exec(string); match; match = re.exec(string)) {

    if(match.index > prevLastIndex) {
      // weve just gone past some non-emoji text, so add it to the tokens
      var text = string.substring(prevLastIndex, match.index);
      tokens.push({ type: 'text', raw: text });
    }

    // e.g :8ball:
    var raw = match[0];
    // e.g 8ball
    var name = match[1];

    tokens.push({ type: 'emoji', name: name, raw: raw });

    prevLastIndex = re.lastIndex;
  }

  if(string.length > prevLastIndex) {
    // string ends with some non-emoji text, so add it to the tokens
    var trailingText = string.substring(prevLastIndex, string.length);
    tokens.push({ type: 'text', raw: trailingText });
  }

  return tokens;
}

module.exports.parse = parse;
