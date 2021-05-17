module.exports = {
  description: "General Info about the Bot",
  usage: {},
  examples: {},
  aliases: ["i", "general"],
  permissionRequired: 0, // 0 All, 1 Mods, 2 Admins, 3 Server Owner, 4 Bot Admin, 5 Bot Owner
  checkArgs: (args) => !args.length
}

const os = require("os"), platform = os.type() + " (" + os.release() + ")", djsversion = require("../package.json").dependencies["discord.js"];

let memory = 0, memoryUsage = "0MB", memoryGlobal = 0, memoryUsageGlobal = "0MB", nextUpdate = Date.now(), shardCount = 0;

module.exports.run = async function (client, message, args, prefix, permissionLevel) {
  const discord = require('discord.js');

  if (nextUpdate < Date.now()) {
    nextUpdate = Date.now() + 300000
    if (client.shard) {
      guilds = await client.shard.fetchClientValues('guilds.size').then(res => res.reduce((prev, val) => prev + val, 0))
      users = await client.shard.fetchClientValues('users.size').then(res => res.reduce((prev, val) => prev + val, 0))
      shardCount = client.shard.count
    } else {
      guilds = client.guilds.size
      users = client.users.size
      shardCount = 0
    }

    memory = process.memoryUsage().heapUsed / (1048576) // 1024*1024
    if (memory >= 1024) memoryUsage = (memory / 1024).toFixed(2) + "GB"
    else memoryUsage = memory.toFixed(2) + "MB"

    memoryGlobal = (os.totalmem() - os.freemem()) / (1048576) // 1024*1024
    if (memoryGlobal >= 1024) memoryUsageGlobal = (memoryGlobal / 1024).toFixed(2) + "GB"
    else memoryUsageGlobal = memoryGlobal.toFixed(2) + "MB"
  }
  message.channel.send(
    {
      embed: {
        title: "Bot Information - " + client.user.tag,
        description: "QueryMe is a simple dude to query information",
        color: 10181046,
        timestamp: Date.now(),
        footer: {
          icon_url: message.author.displayAvatarURL(),
          text: "Requested by " + message.author.tag
        },
        fields: [
          {
            name: "💠 Host",
            value: [
              "**OS**: `" + platform + "`",
              "**Library**: `discord.js" + djsversion + "`",
              "**Memory Usage**: `" + (client.shard ? memoryUsageGlobal : memoryUsage) + "`",
              "**Shard Count**: `" + shardCount + "`",
            ].join("\n"),
            inline: true
          },
          {
            "name": "🌀 Stats",
            "value": [
              "**Uptime**: `" + msToTime(client.uptime) + "`",
              "**Guilds**: `" + client.guilds.cache.size + "`",
              "**API-Ping**: `" + Math.round(client.ws.ping) + "ms" + "`"
            ].join("\n"),
            "inline": true
          },
          {
            "name": client.shard ? "🔷 This Shard" : false,
            "value": [
              "**Guilds**: `" + client.guilds.cache.size + "`",
              "**Users**: `" + client.users.cache.size + "`",
              "**Memory Usage**: `" + memoryUsage + "`"
            ].join("\n"),
            "inline": true
          },
          {
            "name": "🌐 Links",
            "value": [
              "**Creators GitHub:** https://github.com/flubio",
              "**Invite me:** [https://discordapp.com/api/oauth2/authorize?...](https://discordapp.com/api/oauth2/authorize?client_id=" + client.user.id + "&permissions=0&scope=bot)",
            ].join("\n"),
            "inline": false
          }
        ].filter(f => f.name) // filters out shard field if sharding is disabled
      }
    }).catch(() => message.channel.send("🆘 An unknown error occurred. Do I have permission? (Embed Links)"));
}


function msToTime(ms) {
  days = Math.floor(ms / 86400000); // 24*60*60*1000
  daysms = ms % 86400000; // 24*60*60*1000
  hours = Math.floor(daysms / 3600000); // 60*60*1000
  hoursms = ms % 3600000; // 60*60*1000
  minutes = Math.floor(hoursms / 60000); // 60*1000
  minutesms = ms % 60000; // 60*1000
  sec = Math.floor(minutesms / 1000);

  let str = "";
  if (days) str = str + days + "d";
  if (hours) str = str + hours + "h";
  if (minutes) str = str + minutes + "m";
  if (sec) str = str + sec + "s";

  return str;
}