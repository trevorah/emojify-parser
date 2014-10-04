var request = require('request');
var fs = require('fs');

var options = {
  url: 'https://api.github.com/repos/arvida/emoji-cheat-sheet.com/contents/public/graphics/emojis',
  json: true,
  headers: {
    'User-Agent': 'emojify-parser'
  }
};

request(options, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    var emojiList = body.map(function(fileMetadata) {
      return fileMetadata.name.split('.png')[0];
    });

    fs.writeFileSync('emoji-list.json', JSON.stringify(emojiList, null, 2));
  }
});
