import {
  getVoiceConnection,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import googleTTS from "google-tts-api";

// プレイヤーとキュー（再生中と待ち列）
const player = createAudioPlayer();
const queue = [];
let isPlaying = false;

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

// 再接続処理（接続が切れたとき）
function setupConnectionEvents(connection, guildId) {
  connection.on("stateChange", async (oldState, newState) => {
    if (newState.status === VoiceConnectionStatus.Disconnected) {
      console.warn("⚠️ VCから切断されました。再接続を試みます…");

      try {
        await Promise.race([
          entersState(connection, VoiceConnectionStatus.Connecting, 5000),
          entersState(connection, VoiceConnectionStatus.Signalling, 5000),
        ]);
        console.log("🔁 再接続成功");
      } catch {
        console.log("❌ 再接続失敗。接続を破棄します");
        connection.destroy();
      }
    }
  });
}

export default async (message) => {
  if (message.author.bot || !message.guild) return;

  // 🎉 絵文字リアクション処理
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

  if (message.content.match(/Happy Birthday|はぴば|誕生日おめでとう/)) {
    await message.channel.send("はっぴーばーすでー");
  }

  const connection = getVoiceConnection(message.guild.id);
  if (!connection) {
    console.log("🔇 BOTはVCに未接続");
    return;
  }

  // 自動再接続イベントのセットアップ
  setupConnectionEvents(connection, message.guild.id);

  // 接続が準備中だったら待機
  if (connection.state.status !== VoiceConnectionStatus.Ready) {
    console.log("🕒 BOTは準備中です…");

    try {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("VC準備がタイムアウトしました")), 7000);
        connection.once("stateChange", (_, newState) => {
          if (newState.status === VoiceConnectionStatus.Ready) {
            clearTimeout(timeout);
            resolve();
          }
        });
      });
    } catch (error) {
      console.error("❌ 接続準備失敗:", error.message);
      return;
    }
  }

  try {
    const url = googleTTS.getAudioUrl(message.content, {
      lang: "ja",
      speed: 1.6,
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
