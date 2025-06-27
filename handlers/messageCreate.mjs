import {
  getVoiceConnection,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from "@discordjs/voice";
import googleTTS from "google-tts-api";

export default async (message) => {
  if (message.author.bot) return;

  // 絵文字反応
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

  // ✅ 読み上げ機能
  if (message.guild) {
    const connection = getVoiceConnection(message.guild.id);
    if (connection) {
      try {
        const url = googleTTS.getAudioUrl(message.content, {
          lang: "ja",
          slow: false,
        });

        const resource = createAudioResource(url);
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);

        player.once(AudioPlayerStatus.Idle, () => {
          // connection.destroy(); // 接続維持したいなら外す
        });
      } catch (err) {
        console.error("TTSエラー:", err);
      }
    }
  }
};
