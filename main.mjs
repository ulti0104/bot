import fs from "fs";
import path from "path";
import express from "express";
import { Client, Collection, GatewayIntentBits, ActivityType, EmbedBuilder } from "discord.js";
import CommandsRegister from "./regist-commands.mjs";
import Notification from "./models/notification.mjs";
import YoutubeFeeds from "./models/youtubeFeeds.mjs";
import YoutubeNotifications from "./models/youtubeNotifications.mjs";
import Sequelize from "sequelize";
import Parser from 'rss-parser';
import { Client as Youtubei } from "youtubei";

// ✅ 🔐 VCの音声送信用ライブラリ（libsodium）
import sodium from "libsodium-wrappers";
await sodium.ready;  // 🔐 awaitで初期化

const parser = new Parser();
const youtubei = new Youtubei();
let postCount = 0;

const app = express();

// ✅ Webサーバー起動（Render用）
app.listen(3000, () => {
  console.log("🌐 Web server is running");
});

// ✅ POSTリクエスト処理（UptimeRobotやGASが叩く用）
app.post('/', function(req, res) {
  console.log(`Received POST request.`);
  postCount++;
  if (postCount === 10) {
    trigger();
    postCount = 0;
  }
  res.send('POST response by Render');
});

// ✅ GETリクエスト（ブラウザから確認用）
app.get('/', function(req, res) {
  res.send('GET response by Render');
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
const categoryFoldersPath = path.join(process.cwd(), "commands");
const commandFolders = fs.readdirSync(categoryFoldersPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(categoryFoldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".mjs"));
  
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    import(filePath).then((module) => {
      client.commands.set(module.data.name, module);
    });
  }
}

// ✅ ハンドラー読み込み
const handlers = new Map();
const handlersPath = path.join(process.cwd(), "handlers");
const handlerFiles = fs.readdirSync(handlersPath).filter((file) => file.endsWith(".mjs"));
for (const file of handlerFiles) {
  const filePath = path.join(handlersPath, file);
  import(filePath).then((module) => {
    handlers.set(file.slice(0, -4), module);
  });
}

// ✅ イベント登録
client.on("interactionCreate", async (interaction) => {
  await handlers.get("interactionCreate")?.default?.(interaction);
});

client.on("voiceStateUpdate", async (oldState, newState) => {
  await handlers.get("voiceStateUpdate")?.default?.(oldState, newState);
});

client.on("messageCreate", async (message) => {
  await handlers.get("messageCreate")?.default?.(message);
});

client.on("ready", async () => {
  await client.user.setActivity('🥔', {
    type: ActivityType.Custom,
    state: "ツイストポテトを堪能中"
  });
  console.log(`${client.user.tag} がログインしました！`);
});

// ✅ DBの同期
Notification.sync({ alter: true });
YoutubeFeeds.sync({ alter: true });
YoutubeNotifications.sync({ alter: true });

// ✅ コマンド登録
CommandsRegister();

// ✅ ログイン（Renderの環境変数にTOKENを設定）
client.login(process.env.TOKEN);

// ✅ YouTube通知トリガー
async function trigger() {
  const youtubeNofications = await YoutubeNotifications.findAll({
    attributes: [
      [Sequelize.fn('DISTINCT', Sequelize.col('channelFeedUrl')), 'channelFeedUrl'],
    ]
  });
  await Promise.all(
    youtubeNofications.map(async n => {
      checkFeed(n.channelFeedUrl);
    })
  );
}

// ✅ フィードチェック
async function checkFeed(channelFeedUrl) {
  const youtubeFeed = await YoutubeFeeds.findOne({
    where: { channelFeedUrl },
  });

  const checkedDate = new Date(youtubeFeed.channelLatestUpdateDate);
  let latestDate = new Date(youtubeFeed.channelLatestUpdateDate);

  const feed = await parser.parseURL(channelFeedUrl);
  const videos = feed.items.map(i => {
    const now = new Date(i.isoDate);
    if (now > checkedDate) {
      if (now > latestDate) latestDate = now;
      return i;
    }
  });

  const notifications = await YoutubeNotifications.findAll({
    where: { channelFeedUrl },
  });

  const youtubeChannelId = channelFeedUrl.split('=').at(1);

  for (const v of videos) {
    if (!v) continue;
    const youtubeVideolId = v.link.split('=').at(1);
    const youtubeVideo = await youtubei.getVideo(youtubeVideolId);

    const embed = new EmbedBuilder()
      .setColor(0xcd201f)
      .setAuthor({ name: v.author, url: `https://www.youtube.com/channel/${youtubeChannelId}` })
      .setTitle(v.title)
      .setURL(v.link)
      .setDescription(youtubeVideo.description)
      .setImage(youtubeVideo.thumbnails.best)
      .setTimestamp(new Date(v.isoDate));

    notifications.forEach(n => {
      const channel = client.channels.cache.get(n.textChannelId);
      channel?.send({ embeds: [embed] });
    });
  }

  await YoutubeFeeds.update(
    { channelLatestUpdateDate: latestDate.toISOString() },
    { where: { channelFeedUrl } }
  );
}
