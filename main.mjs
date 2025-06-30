// main.mjs
import fs from "fs";
import path from "path";
import express from "express";
import {
  Client,
  Collection,
  GatewayIntentBits,
  ActivityType,
  EmbedBuilder,
} from "discord.js";
import { getVoiceConnection, VoiceConnectionStatus } from "@discordjs/voice";
import CommandsRegister from "./regist-commands.mjs";

// ✅ Webサーバー起動（Render用）
const app = express();
app.listen(3000, () => {
  console.log("🌐 Web server is running");
});
app.get("/", (_, res) => res.send("GET response by Render"));
app.post("/", (_, res) => res.send("POST response by Render"));

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();

// ✅ コマンド読み込み
const commandPath = path.join(process.cwd(), "commands");
for (const folder of fs.readdirSync(commandPath)) {
  const files = fs
    .readdirSync(path.join(commandPath, folder))
    .filter((f) => f.endsWith(".mjs"));

  for (const file of files) {
    const filePath = path.join(commandPath, folder, file);
    const module = await import(filePath);
    client.commands.set(module.data.name, module);
  }
}

// ✅ ハンドラ読み込み
const handlers = new Map();
const handlerPath = path.join(process.cwd(), "handlers");
const handlerFiles = fs.readdirSync(handlerPath).filter((f) => f.endsWith(".mjs"));
for (const file of handlerFiles) {
  const module = await import(path.join(handlerPath, file));
  handlers.set(file.replace(".mjs", ""), module);
}

// ✅ 自動再接続監視
function monitorVoiceConnection(guildId) {
  const connection = getVoiceConnection(guildId);
  if (!connection) return;

  connection.on("stateChange", (oldState, newState) => {
    console.log(`🎙 VC状態変化: ${oldState.status} → ${newState.status}`);

    if (newState.status === VoiceConnectionStatus.Disconnected) {
      console.warn("⚠️ VC切断検知、自動再接続試行中…");
      tryReconnect(connection);
    }
  });
}

function tryReconnect(connection) {
  let retries = 0;
  const maxRetries = 3;

  const interval = setInterval(() => {
    const status = connection.state.status;
    console.log(`🔁 再接続試行中…現在の状態: ${status}`);

    if (status === VoiceConnectionStatus.Ready) {
      console.log("✅ 再接続成功");
      clearInterval(interval);
      return;
    }

    retries++;
    if (retries >= maxRetries) {
      console.error("❌ 再接続失敗、切断します");
      connection.destroy();
      clearInterval(interval);
    }
  }, 3000);
}

// ✅ イベント
client.on("ready", () => {
  client.user.setActivity("ツイストポテトを堪能中", { type: ActivityType.Custom });
  console.log(`✅ ${client.user.tag} がログインしました`);
});

// ✅ interaction handler
client.on("interactionCreate", async (interaction) => {
  await handlers.get("interactionCreate")?.default?.(interaction);
});

// ✅ voiceStateUpdate handler + 再接続監視
client.on("voiceStateUpdate", async (oldState, newState) => {
  await handlers.get("voiceStateUpdate")?.default?.(oldState, newState);
  monitorVoiceConnection(newState.guild.id);
});

// ✅ messageCreate handler
client.on("messageCreate", async (message) => {
  await handlers.get("messageCreate")?.default?.(message);
});

// ✅ コマンド登録 & ログイン
CommandsRegister();
client.login(process.env.TOKEN);
