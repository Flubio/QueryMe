module.exports = {
  description: "Get Infos about a User",
  usage: {
    "<Usertag>": "Tag a User with @username"
  },
  examples: {},
  aliases: ["ui"],
  permissionRequired: 0, // 0 All, 1 Mods, 2 Admins, 3 Server Owner, 4 Bot Admin, 5 Bot Owner
  checkArgs: (args) => args.length >= 1
}



module.exports.run = async function (client, message, args, prefix, permissionLevel) {
  const Discord = module.require('discord.js');
  const moment = require('moment');
  const user = getUserFromMention(args[0], client);

  const guild = message.guild;
  const member = guild.member(user);
  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor('Information about ' + user.username, user.displayAvatarURL())
    .setThumbnail(user.displayAvatarURL())
    .addField('User:', `${user}`, true)
    .addField("ID:", `${user.id}`, true)
    .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
    .addField("Status:", `${user.presence.status}`, true)
    .addField("In Server", message.guild.name, true)
    .addField("Game:", `${member.presence.game ? member.presence.game.name : 'None'}`, true)
    .addField("Bot:", `${user.bot}`, true)
    .addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`, true)
    .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`, true)
    .addField("Tag:", `${user.tag}`, true)
    .addField("Roles:", member.roles.cache.map(roles => `${roles}`).join(', '), true)
    .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
  message.channel.send({ embed });
}

function getUserFromMention(mention, client) {
  if (!mention) return;

  if (mention.startsWith('<@') && mention.endsWith('>')) {
    mention = mention.slice(2, -1);

    if (mention.startsWith('!')) {
      mention = mention.slice(1);
    }

    return client.users.cache.get(mention);
  }
}