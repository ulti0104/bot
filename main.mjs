import fs from "fs";
import path from "path";
import express from "express";
import { Client, Collection, GatewayIntentBits, ActivityType } from "discord.js";
import CommandsRegister from "./regist-commands.mjs";
import Notification from "./models/notification.mjs";
import YoutubeFeeds from "./models/youtubeFeeds.mjs";
import YoutubeNotifications from "./models/youtubeNotifications.mjs";
import Sequelize from "sequelize";
import Parser from 'rss-parser';
import { Client as Youtubei } from "youtubei";
import sodium from "libsodium-wrappers";

await sodium.ready;

const parser = new Parser();
const youtubei = new Youtubei();
let postCount = 0;
const app = express();

// ✅ Render用 Web サーバー起動
app.listen(3000, () => {
  console.log("🌐 Web server is running");
});

app.post('/', function (req, res) {
  console.log(`📩 POST request received`);
  postCount++;
  if (postCount === 10) {
    trigger();
    postCount = 0;
  }
  res.send('POST OK');
});

app.get('/', function (req, res) {
  res.send('GET OK');
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();

// ✅ コマンドの読み込み
const commandsDir = path.join(process.cwd(), "commands");
for (const folder of fs.readdirSync(commandsDir)) {
  const folderPath = path.join(commandsDir, folder);
  for (const file of fs.readdirSync(folderPath).filter(f => f.endsWith(".mjs"))) {
    const cmd = await import(path.join(folderPath, file));
    client.commands.set(cmd.data.name, cmd);
  }
}

// ✅ ハンドラーの読み込み
const handlers = new Map();
const handlersDir = path.join(process.cwd(), "handlers");
for (const file of fs.readdirSync(handlersDir).filter(f => f.endsWith(".mjs"))) {
  const handler = await import(path.join(handlersDir, file));
  handlers.set(file.replace(".mjs", ""), handler.default);
}

// ✅ イベント登録
client.on("ready", async () => {
  await client.user.setActivity("ツイストポテトを堪能中", {
    type: ActivityType.Custom,
  });
  console.log(`✅ ${client.user.tag} がログインしました`);
});

client.on("interactionCreate", async (interaction) => {
  await handlers.get("interactionCreate")?.(interaction);
});

client.on("messageCreate", async (message) => {
  await handlers.get("messageCreate")?.(message);
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  await handlers.get("voiceStateUpdate")?.(oldState, newState);
});

// ✅ DB同期
Notification.sync({ alter: true });
YoutubeFeeds.sync({ alter: true });
YoutubeNotifications.sync({ alter: true });

// ✅ スラッシュコマンド登録
CommandsRegister();

// ✅ Discordログイン
client.login(process.env.TOKEN);

// ✅ YouTube通知トリガー
async function trigger() {
  const feedList = await YoutubeNotifications.findAll({
    attributes: [[Sequelize.fn("DISTINCT", Sequelize.col("channelFeedUrl")), "channelFeedUrl"]],
  });

  for (const item of feedList) {
    await checkFeed(item.channelFeedUrl);
  }
}

async function checkFeed(channelFeedUrl) {
  const feedRecord = await YoutubeFeeds.findOne({ where: { channelFeedUrl } });
  const checkedDate = new Date(feedRecord.channelLatestUpdateDate);
  let latestDate = checkedDate;

  const feed = await parser.parseURL(channelFeedUrl);
  const videos = feed.items.filter(item => new Date(item.isoDate) > checkedDate);

  const notifies = await YoutubeNotifications.findAll({ where: { channelFeedUrl } });
  const channelId = channelFeedUrl.split("=").at(1);

  for (const v of videos) {
    const videoId = v.link.split("=").at(1);
    const video = await youtubei.getVideo(videoId);

    const embed = {
      color: 0xcd201f,
      author: { name: v.author, url: `https://www.youtube.com/channel/${channelId}` },
      title: v.title,
      url: v.link,
      description: video.description,
      image: { url: video.thumbnails.best },
      timestamp: new Date(v.isoDate),
    };

    for (const notify of notifies) {
      const channel = client.channels.cache.get(notify.textChannelId);
      if (channel) await channel.send({ embeds: [embed] });
    }

    if (new Date(v.isoDate) > latestDate) latestDate = new Date(v.isoDate);
  }

  await YoutubeFeeds.update(
    { channelLatestUpdateDate: latestDate.toISOString() },
    { where: { channelFeedUrl } }
  );
}
