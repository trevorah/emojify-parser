var emojifyParser = require('..');
var emojiList = require('../emoji-list');
var emoticonMap = require('../emoticon-mapping');
var emoticonList = Object.keys(emoticonMap);
var assert = require('assert');

describe('emojify-parser', function() {

  it('works with single emoji', function() {
    var text = ':neckbeard:';
    var result = emojifyParser.parse(text);
    assert.deepEqual(result, [
      { type: 'emoji', name: 'neckbeard', raw: ':neckbeard:'}
    ]);
  });

  it('works with single emoticon', function() {
    var text = ':)';
    var result = emojifyParser.parse(text);
    assert.deepEqual(result, [
      { type: 'emoticon', name: 'smile', raw: ':)'}
    ]);
  });

  it('works with multiple emoji', function() {
    var text = ':railway_car::railway_car:';
    var result = emojifyParser.parse(text);
    assert.deepEqual(result, [
      { type: 'emoji', name: 'railway_car', raw: ':railway_car:'},
      { type: 'emoji', name: 'railway_car', raw: ':railway_car:'}
    ]);
  });

  it('works with multiple emoticons', function() {
    var text = ':D:D';
    var result = emojifyParser.parse(text);
    assert.deepEqual(result, [
      { type: 'emoticon', name: 'smiley', raw: ':D'},
      { type: 'emoticon', name: 'smiley', raw: ':D'}
    ]);
  });

  it("works with just plaintext", function() {
    var text = "I thought it'd run forever";
    var result = emojifyParser.parse(text);
    assert.deepEqual(result, [
      { type: 'text', raw: "I thought it'd run forever"}
    ]);
  });

  it("works with emoji followed by plaintext", function() {
    var text = ':smile: emojify is great!';
    var result = emojifyParser.parse(text);
    assert.deepEqual(result, [
      { type: 'emoji', name: 'smile', raw: ':smile:'},
      { type: 'text', raw: ' emojify is great!'}
    ]);
  });

  it("works with plaintext followed by emoji", function() {
    var text = 'I like my :turtle:';
    var result = emojifyParser.parse(text);
    assert.deepEqual(result, [
      { type: 'text', raw: 'I like my '},
      { type: 'emoji', name: 'turtle', raw: ':turtle:'}
    ]);
  });

  describe("individual emoji parsing", function() {
    emojiList.forEach(function(emoji) {

      it('parses :' + emoji + ':', function() {
        var result = emojifyParser.parse(':' + emoji + ':');
        assert.deepEqual(result, [
          { type: 'emoji', name: emoji, raw: ':' + emoji + ':'}
        ]);
      });

    });

  });

  describe("individual emoticon parsing", function() {
    emoticonList.forEach(function(emoticon) {

      it('parses ' + emoticon, function() {
        var result = emojifyParser.parse(emoticon);
        assert.deepEqual(result, [
          { type: 'emoticon', name: emoticonMap[emoticon], raw: emoticon}
        ]);
      });

    });

  });

});
