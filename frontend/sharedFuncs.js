var parseTitleString = function(string) {
  var TRACK_SEPARATOR = ' - ';
  var artist, title, credits = [];
  string = string || '';

  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  var baddies = ['[dubstep]', '[electro]', '[edm]', '[house music]',
    '[glitch hop]', '[video]', '[official video]', '(official video)',
    '(official music video)', '(lyrics)', '(official)',
    '[ official video ]', '[official music video]', '[free download]',
    '[free dl]', '( 1080p )', '(with lyrics)', '(high res / official video)',
    '(music video)', '[music video]', '[hd]', '(hd)', '[hq]', '(hq)',
    '(original mix)', '[original mix]', '[lyrics]', '[free]', '[trap]',
    '[monstercat release]', '[monstercat freebie]', '[monstercat]',
    '[edm.com premeire]', '[edm.com exclusive]', '[enm release]',
    '[free download!]', '[monstercat free release]'];

  baddies.forEach(function  (token) {
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
    if (credit !== title) {
      creditMap[ credit ] = credit;
    }
  });

  var output = {
      artist: artist, title: title, credits: Object.keys(creditMap)
  };

  if (DEBUG) console.log('output parts: ' + JSON.stringify(output) );

  return output;
};


var dateAgo = function (dateString) {
  var _MS_PER_DAY = 1000 * 60 * 60 * 24;
  var date = new Date(dateString);
  var today = new Date();

  daysAgo = Math.floor((today - date) / _MS_PER_DAY);
  if (!daysAgo) { return "today"; }
  if (daysAgo === 1) { return "1 day ago"; }
  if (daysAgo < 30) { return daysAgo + " days ago"; }
  var months = Math.floor(daysAgo / 30);
  if (months === 1) { return "1 month ago"; }
  if (daysAgo < 365) { return  months + " months ago"; }
  var years = Math.floor(daysAgo / 360);
  if (years === 1) { return "1 year ago"; }
  return years + " years ago";
};


var parseDate = function (dateString) {
  var monthNames = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  date = new Date(dateString);
  return monthNames[date.getMonth()] + " " +
    date.getDate() + ", " + date.getFullYear();
};

module.exports = { parseTitleString: parseTitleString, dateParse: parseDate };
