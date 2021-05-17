module.exports = {
  description: "Get the latency of the bot.",
  usage: {},
  examples: {},
  aliases: ["pong", "latency", "uptime"],
  permissionRequired: 0, // 0 All, 1 Mods, 2 Admins, 3 Server Owner, 4 Bot Admin, 5 Bot Owner
  checkArgs: (args) => !args.length
}

module.exports.run = async function (client, message, args, prefix, permissionLevel) {
  let botMsg = await message.channel.send("〽️ Pinging")

  botMsg.edit({
    embed: {
      title: "📶 Ping",
      description: [
        "**Server**: `" + (botMsg.createdAt - message.createdAt) + "ms`",
        "**API**: `" + Math.round(client.ws.ping) + "ms`",
        "**Uptime**: `" + msToTime(client.uptime) + "`"
      ].join("\n"),
      color: 10181046,
      footer: { text: "Requested by " + message.author.tag, icon_url: message.author.displayAvatarURL },
      timestamp: new Date()
    }
  }).catch(() => botMsg.edit("🆘 An unknown error occurred. Do I have permission? (Embed Links)"));
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