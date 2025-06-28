import {
  getVoiceConnection,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import googleTTS from "google-tts-api";

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
    await message.reply("じょ！");
  }

  if (
    message.content.match(/Happy Birthday|𝐻𝑎𝑝𝑝𝑦 𝑏𝑖𝑟𝑡ℎ𝑑𝑎𝑦|はぴば|誕生日おめでとう/)
  ) {
    await message.channel.send("はっぴーばーすでー");
  }

  // 🔊 読み上げ機能
  if (message.guild) {
    const connection = getVoiceConnection(message.guild.id);

    // 🔒 BOTがVCに参加していなければ何もしない
    if (
      !connection ||
      connection.state.status !== VoiceConnectionStatus.Ready
    ) {
      console.log("🔇 BOTはVCに未接続または準備中");
      return;
    }

    try {
      console.log(`[TTS] 読み上げ対象: ${message.content}`);
      const url = googleTTS.getAudioUrl(message.content, {
        lang: "ja",
        speed: 1.5,
      });

      const resource = createAudioResource(url);
      const player = createAudioPlayer();

      player.play(resource);
      connection.subscribe(player);

      player.on(AudioPlayerStatus.Playing, () => {
        console.log("🔊 音声再生開始");
      });

      player.on(AudioPlayerStatus.Idle, () => {
        console.log("✅ 再生完了");
      });

      player.on("error", (error) => {
        console.error("🎤 再生エラー:", error);
      });
    } catch (err) {
      console.error("TTSエラー:", err);
    }
  }
};
