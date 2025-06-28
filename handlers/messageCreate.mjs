import {
  getVoiceConnection,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import googleTTS from "google-tts-api";

// グローバルに AudioPlayer を1つだけ使い回す
const player = createAudioPlayer();
const queue = [];
let isPlaying = false;

// プレイヤーがアイドル状態になったら次の音声へ
player.on(AudioPlayerStatus.Idle, () => {
  if (queue.length > 0) {
    const next = queue.shift();
    player.play(next);
  } else {
    isPlaying = false;
  }
});

player.on("error", (error) => {
  console.error("🎤 再生エラー:", error);
});

export default async (message) => {
  if (message.author.bot) return;

  // 🎉 絵文字反応
  if (message.content.match(/年|月/)) {
    await message.react("⭕");
    await message.react("❌");
    await message.react("🔺");
    await message.react("❓");
  }

  if (message.content.match(/💢|ぶちのめす/)) {
    await message.channel.send("お怒りでありんす！");
  }

  if (message.content.match(/足臭|あしくさ/)) {
    await message.reply("じょ！この方です→<@1111272843603349534>");
  }

  if (
    message.content.match(/Happy Birthday|𝐻𝑎𝑝𝑝𝑦 𝑏𝑖𝑟𝑡ℎ𝑑𝑎𝑦|はぴば|誕生日おめでとう/)
  ) {
    await message.channel.send("はっぴーばーすでー");
  }

  if (!message.guild) return;

  const connection = getVoiceConnection(message.guild.id);

  if (!connection) {
    console.log("🔇 BOTはVCに未接続");
    return;
  }

  // 自動再接続のための監視
  connection.on("stateChange", (oldState, newState) => {
    if (
      oldState.status !== VoiceConnectionStatus.Ready &&
      newState.status === VoiceConnectionStatus.Ready
    ) {
      console.log("✅ 再接続成功");
      connection.subscribe(player);
    }

    if (newState.status === VoiceConnectionStatus.Disconnected) {
      console.log("⚠️ VCから切断されました。再接続を試みます");
      tryReconnect(connection);
    }
  });

  if (connection.state.status !== VoiceConnectionStatus.Ready) {
    console.log("🕒 BOTは準備中です");
    return;
  }

  try {
    console.log(`[TTS] 読み上げ対象: ${message.content}`);

    const url = googleTTS.getAudioUrl(message.content, {
      lang: "ja",
      speed: 1.8,
    });

    const resource = createAudioResource(url);
    connection.subscribe(player);

    if (!isPlaying) {
      isPlaying = true;
      player.play(resource);
    } else {
      queue.push(resource);
    }

  } catch (err) {
    console.error("TTSエラー:", err);
  }
};

// 再接続ロジック
function tryReconnect(connection) {
  let retries = 0;
  const maxRetries = 3;

  const interval = setInterval(() => {
    if (connection.state.status === VoiceConnectionStatus.Ready) {
      clearInterval(interval);
      console.log("🔁 再接続成功");
      return;
    }

    retries++;
    if (retries > maxRetries) {
      console.log("❌ 再接続失敗。切断します。");
      connection.destroy();
      clearInterval(interval);
    }
  }, 3000);
}
