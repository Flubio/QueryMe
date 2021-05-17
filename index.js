const path = require('path');
const config = require('./config.json');
const secret = config.token;
if (secret === undefined)
  throw new Error('The Bot Secret is undefined please ensure that a SECRET is provided')
const hookId = config.hookID;
if (hookId === undefined)
  throw new Error('The WebHookID is undefined please ensure that a HOOK_ID is provided')
const hookToken = config.hookToken;
if (hookId === undefined)
  throw new Error('The WebHookTokent is undefined please ensure that a HOOK_TOKEN is provided')
const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const client = new Client(
  {
    messageCacheLifetime: 30,
    messageSweepInterval: 60,
    disableMentions: "everyone",
    partials: ["USER", "GUILD_MEMBER", "CHANNEL"],
    presence: {
      status: "idle"
    },
    ws: {
      intents: ["GUILDS", "GUILD_MESSAGES"]
    }
  }
);
const fs = require("fs");
var final = "";
const loggerHook = new Discord.WebhookClient(hookId, hookToken);
const prefix = '?';
const queries = ['twitter', 'google', 'youtube', 'github', 'npm'];

client.on('ready', () => {
  console.log('Bot online!');
  updateDescription();
});

let shard = 'Shard N/A:';

client.on('shardReady', async (shardid) => {
  shard = `Shard ${shardid}:`;
  console.log(shard, `Ready as ${client.user.tag}!`);
})
const commands = {}, aliases = {} // { "command": require("that_command") }, { "alias": "command" }
fs.readdir("./commands/", (err, files) => {
  if (err) console.error(err);
  for (let file of files) if (file.endsWith(".js")) {
    let commandFile = require("./commands/" + file), fileName = file.replace(".js", "")
    commands[fileName] = commandFile
    if (commandFile.aliases) for (let alias of commandFile.aliases) aliases[alias] = fileName
  }
})

client.on('message', message => {
  if (message.channel.type === 'dm' && message.author != client.user) {
    message.channel.send("👋 Please don't send me Private Messages :)");
    return 0;
  }
  if (!message.guild || message.author.id == client.user.id || message.author.discriminator == "0000") return;

  if (message.content.startsWith(prefix) || message.content.match(`^<@!?${client.user.id}> `)) {
    if (!message.member && message.author.id) try { message.member = message.guild.fetchMember(message.author.id, true) } catch (e) { }

    let args = message.content.split(" ");
    if (args[0].match(`^<@!?${client.user.id}>`)) args.shift(); else args = message.content.slice(prefix.length).split(" ");
    const identifier = args.shift().toLowerCase(), command = aliases[identifier] || identifier

    const commandFile = commands[command], permissionLevel = getPermissionLevel(message.member)
    if (commandFile) {
      if (permissionLevel < commandFile.permissionRequired) return message.channel.send("❌ You don't have permission to do this!");
      if (commandFile.checkArgs(args, permissionLevel) !== true) return message.channel.send("❌ Invalid arguments! Usage is `" + prefix + command + Object.keys(commandFile.usage).map(a => " " + a).join("") + "\`, for additional help type `" + prefix + "help " + command + "`.");

      commandFile.run(client, message, args, prefix, permissionLevel)
    }
  } else if (message.content.match(`^<@!?${client.user.id}>`)) return message.channel.send("👋 My prefix is `" + prefix + "`, for help type `" + prefix + "help`.");
})

let getPermissionLevel = (member) => {
  if (config.admins[0] == member.user.id) return 5;
  if (config.admins.includes(member.user.id)) return 4;
  if (member.guild.ownerID == member.id) return 3;
  if (member.hasPermission("MANAGE_GUILD")) return 2;
  if (member.hasPermission("MANAGE_MESSAGES")) return 1;
  return 0;
}

client.on('guildCreate', (guild) => {
  var count = 0;
  client.guilds.cache.forEach(server => {
    count = count + 1;
  });

  loggerHook.send(
    new MessageEmbed()
      .setColor('#00e600')
      .setTitle('QueryMe Guild Join')
      .setAuthor('QueryMe', client.user.displayAvatarURL(), 'https://flubio.de')
      .addFields(
        { name: 'Server/Guild', value: guild.name, inline: true },
        { name: 'GuildCount', value: count, inline: true }
      )
      .setTimestamp()
      .setFooter('This Message was autmatically triggered by QueryMe')
  )

  updateDescription();
});

client.on('guildDelete', (guild) => {
  var count = 0;
  client.guilds.cache.forEach(server => {
    count = count + 1;
  });

  loggerHook.send(
    new MessageEmbed()
      .setColor('#ff4d4d')
      .setTitle('QueryMe Guild Kick')
      .setAuthor('QueryMe', client.user.displayAvatarURL(), 'https://flubio.de')
      .addFields(
        { name: 'Server/Guild', value: guild.name, inline: true },
        { name: 'GuildCount', value: count, inline: true }
      )
      .setTimestamp()
      .setFooter('This Message was autmatically triggered by QueryMe')
  )
  updateDescription();
});

client.login(`${secret}`);

function updateDescription() {
  client.user.setActivity(client.guilds.cache.size + (client.guilds.cache.size > 1 ? ' Servers' : ' Server'), { type: 'LISTENING' });
}