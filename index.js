const path = require('path');
console.log(__dirname);
require('dotenv').config({ path: __dirname + '/.env' });
const secret = process.env.secret;
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
var final;

const queries = ['twitter', 'google', 'youtube', 'github', 'npm'];

client.on('ready', () => {
  initQueries();
  console.log('Bot online!');
});

client.on('message', msg => {

  const pref = msg.content;
  if (pref.startsWith('*')) {
    console.log('(Query_Req: [' + msg.author.username + ' @ ' + msg.guild.name + ']) ' + msg.content);
    const cutMsg = msg.content.split(' ');
    const query = cutMsg.shift();
    if (cutMsg.length <= 0 && queries.includes(query.slice(1))) {
      msg.author.send(createEmbed('This did not work', 'Syntax: ' + query + ' [request]', 'orange'))
    } else if (cutMsg.length <= 0 && !queries.includes(query.slice(1))) {
      msg.reply(sendQueries());
    }
    if (cutMsg.length > 0) {

      switch (query.slice(1)) {
        case 'twitter':
          msg.reply(createEmbed('Here\'s your Twitter query link', 'https://twitter.com/search?q=' + cutMsg.join('%20'), 'blue'));
          break;
        case 'google':
          msg.reply(createEmbed('Here\'s your Google query link', 'https://google.com/search?q=' + cutMsg.join('+'), 'dark_blue'));
          break;
        case 'youtube':
          msg.reply(createEmbed('Here\'s your Youtube query link', 'https://youtube.com/results?search_query=' + cutMsg.join('+'), 'red'));
          break;
        case 'github':
          msg.reply(createEmbed('Here\'s your GitHub query link', 'https://github.com/search?q=' + cutMsg.join('+'), 'dark'));
          break;
        case 'npm':
          msg.reply(createEmbed('Here\'s your NPM query link', 'https://www.npmjs.com/search?q=' + cutMsg.join('%20'), 'red'));
          break;
        default:
          msg.reply(sendQueries());
      }
    }
  } else if (pref.startsWith('?queries')) {
    msg.reply(sendQueries());
  } else if (pref.startsWith('?code')) {
    msg.reply(createEmbed('Here\'s the GitHub Repo', 'https://github.com/flubio/QueryMe'));
  } else if (pref.startsWith('?help')) {
    msg.reply(createEmbed('Command Help', '?help \n `shows this page` \n\n' +
      '*[queryname] \n`query prefix` \n\n ' +
      '?queries \n`shows all queries` \n\n' +
      '$code \n `sends you a link to the GitHub repo`'));
  }
});

client.login(`${secret}`);

function createEmbed(title, content, color) {
  switch (color) {
    case 'blue':
      color = 3447003;
      break;
    case 'red':
      color = 15158332;
      break;
    case 'aqua':
      color = 1752220;
      break;
    case 'green':
      color = 3066993;
      break;
    case 'pruple':
      color = 10181046;
      break;
    case 'gold':
      color = 15844367;
      break;
    case 'dark_blue':
      color = 2123412;
      break;
    case 'orange':
      color = 15105570;
      break;
    case 'dark':
      color = 0;
      break;
    default:
      color = 16580705;
      break;
  }

  return new MessageEmbed().setTitle(title).setDescription(content).setColor(color);
}

function sendQueries() {
  return createEmbed('Here is a list with all avaliable queries:', '`The query prefix is *: ` \n' + final);
}

function initQueries() {
  queries.forEach(query => {
    query = query + ' [request] \n';
    final = final + query;
  });
}