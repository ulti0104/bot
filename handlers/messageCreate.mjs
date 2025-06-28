import {
  getVoiceConnection,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState,
} from "@discordjs/voice";
import googleTTS from "google-tts-api";

const ttsQueue = [];
let isPlaying = false;

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

  // 🔊 読み上げ機能
  if (message.guild) {
    const connection = getVoiceConnection(message.guild.id);

    if (!connection) {
      console.log("🔇 BOTはVCに未接続");
      return;
    }

    try {
      await entersState(connection, VoiceConnectionStatus.Ready, 5_000);
    } catch (error) {
      console.log("⚠️ VC準備未完了:", error);
      return;
    }

    ttsQueue.push({
      text: message.content,
      connection,
    });

    if (!isPlaying) playNext();
  }
};

async function playNext() {
  if (isPlaying || ttsQueue.length === 0) return;

  const { text, connection } = ttsQueue.shift();
  isPlaying = true;

  try {
    console.log(`[TTS] 再生: ${text}`);
    const url = googleTTS.getAudioUrl(text, {
      lang: "ja",
      speed: 1.8,
    });
    const resource = createAudioResource(url);
    const player = createAudioPlayer();

    player.play(resource);
    connection.subscribe(player);

    player.once(AudioPlayerStatus.Playing, () => {
      console.log("🔊 再生開始");
    });

    player.once(AudioPlayerStatus.Idle, () => {
      console.log("✅ 再生完了");
      isPlaying = false;
      playNext();
    });

    player.once("error", (err) => {
      console.error("🎤 再生エラー:", err);
      isPlaying = false;
      playNext();
    });
  } catch (err) {
    console.error("TTS処理エラー:", err);
    isPlaying = false;
    playNext();
  }
}
