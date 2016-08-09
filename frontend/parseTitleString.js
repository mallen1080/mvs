var TRACK_SEPARATOR = ' - ';
var parseTitleString = function(string) {

  var artist, title, credits = [];
  var string = string || '';

  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  // TODO: load from datafile
  var baddies = ['[dubstep]', '[electro]', '[edm]', '[house music]',
    '[glitch hop]', '[video]', '[official video]', '(official video)',
    '(official music video)', '(lyrics)',
    '[ official video ]', '[official music video]', '[free download]',
    '[free dl]', '( 1080p )', '(with lyrics)', '(high res / official video)',
    '(music video)', '[music video]', '[hd]', '(hd)', '[hq]', '(hq)',
    '(original mix)', '[original mix]', '[lyrics]', '[free]', '[trap]',
    '[monstercat release]', '[monstercat freebie]', '[monstercat]',
    '[edm.com premeire]', '[edm.com exclusive]', '[enm release]',
    '[free download!]', '[monstercat free release]'];
  baddies.forEach(function(token) {
    string = string.replace(token + ' - ', '').trim();
    string = string.replace(token.toUpperCase() + ' - ', '').trim();
    string = string.replace(token.toLowerCase() + ' - ', '').trim();

    string = string.replace(token, '').trim();
    string = string.replace(token.toUpperCase(), '').trim();
    string = string.replace(token.toLowerCase(), '').trim();
  });
  if (DEBUG) console.log('next string: ' +string );
  var parts = [string];
  if (string.indexOf(" - ") !== - 1) {
    parts = string.split(' - ');
  } else if (string.indexOf(": ") !== - 1) {
    parts = string.split(': ');
  } else if (string.indexOf(" by ") !== - 1) {
    parts = string.split(' by ');
  } else if (string.indexOf(" | ") !== - 1) {
      parts = string.split(' | ');
  }

  if (DEBUG) console.log(parts);

  for (var i = 0; i < parts.length; i++) {
    if ( baddies.indexOf( parts[i].toLowerCase() ) >= 0 ) {
      parts.splice( i , 1 );
    }
  }
  if (DEBUG) console.log(parts);

  if (parts.length == 2) {
    artist = parts[0];
    title = parts[1];
  } else if (parts.length > 2) {
    artist = parts[0];
    title = parts[1];
  } else {
    artist = parts[0];
    title = "";
  }


  // one last pass
  baddies.forEach(function(baddy) {
    title  = title.replace( new RegExp( escapeRegExp(baddy) , 'i') , '').trim();
    artist = artist.replace( new RegExp( escapeRegExp(baddy) , 'i') , '').trim();
  });

  // look for certain patterns in the string
  credits.push(  title.replace(/(.*)\((.*) remix\)/i,       '$2').trim() );
  credits.push(  title.replace(/(.*) ft\.? (.*)/i,          '$1').trim() );
  credits.push(  title.replace(/(.*) ft\.? (.*)/i,          '$2').trim() );
  credits.push(  title.replace(/(.*) feat\.? (.*)/i,        '$1').trim() );
  credits.push(  title.replace(/(.*) feat\.? (.*)/i,        '$2').trim() );
  credits.push(  title.replace(/(.*) featuring (.*)/i,      '$2').trim() );
  credits.push(  title.replace(/(.*) \(ft (.*)\)/i,         '$1').trim() );
  credits.push(  title.replace(/(.*) \(ft (.*)\)/i,         '$2').trim() );
  credits.push(  title.replace(/(.*) \(feat\.? (.*)\)/i,    '$2').trim() );
  credits.push(  title.replace(/(.*) \(featuring (.*)\)/i,  '$2').trim() );
  credits.push( artist.replace(/(.*) ft\.? (.*)/i,          '$1').trim() );
  credits.push( artist.replace(/(.*) ft\.? (.*)/i,          '$2').trim() );
  credits.push( artist.replace(/(.*) feat\.? (.*)/i,        '$1').trim() );
  credits.push( artist.replace(/(.*) feat\.? (.*)/i,        '$2').trim() );
  credits.push( artist.replace(/(.*) featuring (.*)/i,      '$2').trim() );
  credits.push( artist.replace(/(.*) \(ft (.*)\)/i,         '$1').trim() );
  credits.push( artist.replace(/(.*) \(ft (.*)\)/i,         '$2').trim() );
  credits.push( artist.replace(/(.*) \(feat\.? (.*)\)/i,    '$1').trim() );
  credits.push( artist.replace(/(.*) \(featuring (.*)\)/i,  '$2').trim() );
  credits.push( artist.replace(/(.*) & (.*)/ig,             '$1').trim() );
  credits.push( artist.replace(/(.*) & (.*)/ig,             '$2').trim() );
  credits.push( artist.replace(/(.*) vs\.? (.*)/i,          '$1').trim() );
  credits.push( artist.replace(/(.*) vs\.? (.*)/i,          '$2').trim() );
  credits.push( artist.replace(/(.*) x (.*)/i,              '$1').trim() );
  credits.push( artist.replace(/(.*) x (.*)/i,              '$2').trim() );

  var creditMap = {};
  credits.forEach(function(credit) {
    if (credit !== title) { // temp., until we find out why title is in credits
      creditMap[ credit ] = credit;
    }
  });

  var output = {
      artist: artist, title: title, credits: Object.keys(creditMap)
  };

  if (DEBUG) console.log('output parts: ' + JSON.stringify(output) );

  return output;
};

module.exports = parseTitleString;
