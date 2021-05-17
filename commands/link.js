module.exports = {
  description: "Get simplyfied query Links for twitter, google, youtube, npm, github",
  usage: {
    "<Queryname>": "This value can be (twitter, google, youtube, npm, github)",
    "<Request>": "This value is the term you're searching for"
  },
  examples: {},
  aliases: ["*"],
  permissionRequired: 0, // 0 All, 1 Mods, 2 Admins, 3 Server Owner, 4 Bot Admin, 5 Bot Owner
  checkArgs: (args) => args.length >= 2
}

module.exports.run = async function (client, message, args, prefix, permissionLevel) {
  var queries = ['google', 'g', 'twitter', 't', 'youtube', 'yt', 'github', 'gi', 'npm']
  const cutmessage = message.content.split(' ');
  cutmessage.shift();
  const query = cutmessage.shift();
  if (cutmessage.length <= 0 && queries.includes(query)) {
    message.author.send('🆘This did not work', 'Syntax: ' + prefix + 'link ' + query + ' [<request>]');
    message.react('❌');
  } else if (cutmessage.length <= 0 && !queries.includes(query.slice(1))) {
    message.channel.send('🆘 An unknown error occurred. ');
    message.react('❌');
  }
  if (cutmessage.length > 0) {
    switch (query) {
      case 'twitter':
        message.reply({ embed: { title: 'Here\'s your Twitter Query for \'' + cutmessage.join(' ') + '\':', fields: [{ name: 'Link', value: 'https://twitter.com/search?q=' + cutmessage.join('%20') }], color: 3447003 } });
        message.react('✅');
        break;
      case 't':
        message.reply({ embed: { title: 'Here\'s your Twitter Query for \'' + cutmessage.join(' ') + '\':', fields: [{ name: 'Link', value: 'https://twitter.com/search?q=' + cutmessage.join('%20') }], color: 3447003 } });
        message.react('✅');
        break;
      case 'google':
        message.reply({ embed: { title: 'Here\'s your Google Query for \'' + cutmessage.join(' ') + '\':', fields: [{ name: 'Link', value: 'https://google.com/search?q=' + cutmessage.join('+') }], color: 2123412 } });
        message.react('✅');
        break;
      case 'g':
        message.reply({ embed: { title: 'Here\'s your Google Query for \'' + cutmessage.join(' ') + '\':', fields: [{ name: 'Link', value: 'https://google.com/search?q=' + cutmessage.join('+') }], color: 2123412 } });
        message.react('✅');
        break;
      case 'youtube':
        message.reply({ embed: { title: 'Here\'s your YouTube Query for \'' + cutmessage.join(' ') + '\':', fields: [{ name: 'Link', value: 'https://youtube.com/results?search_query=' + cutmessage.join('+') }], color: 15158332 } });
        message.react('✅');
        break;
      case 'yt':
        message.reply({ embed: { title: 'Here\'s your YouTube Query for \'' + cutmessage.join(' ') + '\':', fields: [{ name: 'Link', value: 'https://youtube.com/results?search_query=' + cutmessage.join('+') }], color: 15158332 } });
        message.react('✅');
        break;
      case 'github':
        message.reply({ embed: { title: 'Here\'s your GitHub for \'' + cutmessage.join(' ') + '\':', fields: [{ name: 'Link', value: 'https://github.com/search?q=' + cutmessage.join('+') }], color: 0 } });
        message.react('✅');
        break;
      case 'gi':
        message.reply({ embed: { title: 'Here\'s your GitHub for \'' + cutmessage.join(' ') + '\':', fields: [{ name: 'Link', value: 'https://github.com/search?q=' + cutmessage.join('+') }], color: 0 } });
        message.react('✅');
        break;
      case 'npm':
        message.reply({ embed: { title: 'Here\'s your NPM for \'' + cutmessage.join(' ') + '\':', fields: [{ name: 'Link', value: 'https://www.npmjs.com/search?q=' + cutmessage.join('%20') }], color: 15158332 } });
        message.react('✅');
        break;
      default:
        message.react('❌');
        break;
    }
  }
}