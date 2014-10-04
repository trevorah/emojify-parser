var emojiList = require('./emoji-list');
var emoticonMap = require('./emoticon-mapping');

var emoticonEmojiList = Object.keys(emoticonMap).concat(emojiList);

// emoji and emoticons like "+1", ":)" etc mess with regexps, so escape them
var escapedEmojiList = emojiList.map(escapeRexexp);
var escapedEmoticonList = Object.keys(emoticonMap).map(escapeRexexp);

// results in :(\+1|\-1|100|1234|8ball| ... ):|:\)|:\-\)| ...
// we only have one capture group so we can tell if a match is an emoji or an emoticon
var reString = ':(' + escapedEmojiList.join('|') + '):|' + escapedEmoticonList.join('|');

function parse(string) {
  // create the re each time, as re.exec() increments re.lastIndex
  var re = new RegExp(reString, 'g');
  var prevLastIndex = 0;
  var tokens = [];

  // while regex still matches emoji/emoticons
  for(var match = re.exec(string); match; match = re.exec(string)) {

    if(match.index > prevLastIndex) {
      // weve just gone past some non-emoji/emoticon text, so add it to the tokens
      var text = string.substring(prevLastIndex, match.index);
      tokens.push({ type: 'text', raw: text });
    }

    // e.g :8ball:
    var raw = match[0];
    // e.g 8ball
    var capturedName = match[1];

    var type = capturedName ? 'emoji' : 'emoticon';
    var name = capturedName || emoticonMap[raw];

    tokens.push({ type: type, name: name, raw: raw });

    prevLastIndex = re.lastIndex;
  }

  if(string.length > prevLastIndex) {
    // string ends with some non-emoji text, so add it to the tokens
    var trailingText = string.substring(prevLastIndex, string.length);
    tokens.push({ type: 'text', raw: trailingText });
  }

  return tokens;
}

function escapeRexexp(string) {
  return string.replace('-', '\\-')
               .replace('+', '\\+')
               .replace('(', '\\(')
               .replace(')', '\\)')
               .replace('$', '\\$')
               .replace('*', '\\*')
               .replace('|', '\\|')
               .replace('[', '\\[');
}

module.exports.parse = parse;
