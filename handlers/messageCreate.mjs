import {
  getVoiceConnection,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState,
} from "@discordjs/voice";
import googleTTS from "google-tts-api";

// 読み上げキュー
const ttsQueue = [];
let isPlaying = false;

const player = createAudioPlayer();

player.on(AudioPlayerStatus.Idle, () => {
  console.log("✅ 再生完了");
  isPlaying = false;
  playNext(); // 次の音声を再生
});

player.on("error", (error) => {
  console.error("🎤 再生エラー:", error);
  isPlaying = false;
  playNext(); // エラーでも次へ
});

// 読み上げ実行関数
async function playNext() {
  if (isPlaying || ttsQueue.length === 0) return;

  const { text, connection } = ttsQueue.shift();
  isPlaying = true;

  try {
    const url = googleTTS.getAudioUrl(text, {
      lang: "ja",
      speed: 1.8,
    });
    const resource = createAudioResource(url);
    connection.subscribe(player);
    player.play(resource);
    console.log(`🔊 再生中: ${text}`);
  } catch (err) {
    console.error("TTS再生エラー:", err);
    isPlaying = false;
    playNext();
  }
}

export default async (message) => {
  if (message.author.bot) return;

  // 🎉 絵文字反応（省略せず全部使ってOK）
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

  // 🔊 読み上げ機能
  if (message.guild) {
    const connection = getVoiceConnection(message.guild.id);

    if (
      !connection ||
      connection.state.status !== VoiceConnectionStatus.Ready
    ) {
      console.log("🔇 BOTはVCに未接続または準備中");
      return;
    }

    // キューに追加
    ttsQueue.push({ text: message.content, connection });
    console.log(`[🔃 Queue追加] ${message.content}`);
    playNext();
  }
};
