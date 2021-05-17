const { readSync } = require('fs');

module.exports = {
  description: "Get Query results for google ⚠️This Feature is experimental => there can be bugs⚠️",
  usage: {
    "<QuerySite>": "This value can be (twitter, google, youtube, npm, github)",
    "<Query>": "This value is the term you're searching for"
  },
  examples: {},
  aliases: ["q"],
  permissionRequired: 0, // 0 All, 1 Mods, 2 Admins, 3 Server Owner, 4 Bot Admin, 5 Bot Owner
  checkArgs: (args) => args.length >= 2
}



module.exports.run = async function (client, message, args, prefix, permissionLevel) {

  message.channel.send('⚠️This Feature is experimental => there can be bugs⚠️');

  const discord = require('discord.js');

  var request = require('request');
  var cheerio = require('cheerio');

  var input = message.content.split(' ');
  input.shift();
  input.shift();
  if (message.mentions.has(client.user)) {
    input.shift();
  }
  switch (args[0]) {
    case 'google':
      let initmsg = await message.channel.send("🔍Searching")
      var results = [];

      request('http://www.google.com/search?q=' + input.join('+'), function (err, resp, body) {
        if (err)
          throw err;
        if (!resp.statusCode === 200)
          return;
        $ = cheerio.load(body);
        $('a').each(function () {
          url = ($(this).attr('href'));
          if (results.length < 24) {
            var newUrl = url.replace('/url?q=', '');
          const index = results.indexOf(url);
          if (index > -1) {
            results.splice(index, 1);
          }
          if(validateUrl(newUrl))
            results.push(newUrl);
          }
        });
        var i = 0;
        while (i <= 19) {
          results.shift();
          i++;
        }
        results.forEach(url => {
          var newUrl = url.replace('/url?q=', '');
          const index = results.indexOf(url);
          if (index > -1) {
            results.splice(index, 1);
          }
          if(validateUrl(newUrl))
            results.push(newUrl);
        })

        let embed = new discord.MessageEmbed()
          .setAuthor("QueryMe", client.user.displayAvatarURL(), 'https://flubio.de')
          .setTitle("🌐 Your Google result")
          .setThumbnail("https://vistatec.com/wp-content/uploads/2018/12/google-favicon-vector-400x400-300x300.png")
          .setDescription('`' + results.length + ' Results`')
          .setTimestamp(Date.now())
          .setFooter('Requested by ' + message.author.tag)
          .setColor(10181046);
        var count = 1;
        results.forEach(result => {
          embed.addField('Result #' + count, result);
          count++;
        });
        embed.addField('Want more?', 'http://www.google.com/search?q=' + input.join('+'));
        message.channel.send(embed);
        initmsg.delete();
      });
      break;
    case 'twitter':
      var results = [];

      request('https://twitter.com/search?q=' + input.join('%20') + '&src=typed_query', function (err, resp, body) {
        if (err)
          throw err;
        if (!resp.statusCode === 200)
          return;
        $ = cheerio.load(body);
        console.log('start')
        var reactRoot = $('#react-root');
        var x = $('div.css-1dbjc4n');
        var y = $('div.r-417010');
        var r = $('main.r-1wbh5a2');
        // console.log('ReactRoot: ');
        // console.log(reactRoot);
        // console.log('X: ');
        // console.log(x);
        // console.log('Y: ');
        // console.log(y);
        // console.log('R: ');
        // console.log( r);
        $('div.css-1dbjc4n').each(function(){
          console.log('eeee')
          $('div.r-417010').each(function(){
            let img = $('img').attr('src');
            console.log(img)
          });
        });
      });
      break;
  }

}

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}