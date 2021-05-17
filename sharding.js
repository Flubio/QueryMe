const Discord = require("discord.js"), config = require("./config.json");

const manager = new Discord.ShardingManager("./index.js", { totalShards: "auto", respawn: true, token: config.token });
const hookId = config.hookID;
if (hookId === undefined)
  throw new Error('The WebHookID is undefined please ensure that a HOOK_ID is provided');
const hookToken = config.hookToken;
if (hookId === undefined)
  throw new Error('The WebHookTokent is undefined please ensure that a HOOK_TOKEN is provided');

const loggerHook = new Discord.WebhookClient(hookId, hookToken);
manager.spawn(config.shards);
manager.on("launch", async shard => {
  console.log("Shard " + shard.id + " starting.");
});
