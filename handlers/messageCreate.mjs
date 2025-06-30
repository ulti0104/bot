import {
  getVoiceConnection,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
} from "@discordjs/voice";
import googleTTS from "google-tts-api";

// プレイヤーとキューはグローバルに保持
const player = createAudioPlayer();
const queue = [];
let isPlaying = false;

// 音声再生完了時、次を再生
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

  if (!message.guild) return;

  const connection = getVoiceConnection(message.guild.id);
  if (!connection) {
    console.log("🔇 BOTはVCに未接続");
    return;
  }

  // ✅ VC接続状態のチェックと再接続処理
  const status = connection.state.status;
  if (
    status === VoiceConnectionStatus.Disconnected ||
    status === VoiceConnectionStatus.Destroyed
  ) {
    console.log("🛑 接続が切れています");
    connection.destroy();
    return;
  }

  if (
    status === VoiceConnectionStatus.Connecting ||
    status === VoiceConnectionStatus.Signalling
  ) {
    console.log("🕒 BOTが接続準備中です。再接続を待機");
    await waitForReady(connection);
  }

  connection.subscribe(player); // 再接続後の再登録

  try {
    const url = googleTTS.getAudioUrl(message.content, {
      lang: "ja",
      speed: 1.6,
    });
    const resource = createAudioResource(url);

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

// ✅ Readyになるまで待機（最大5秒）
function waitForReady(connection, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const status = connection.state.status;
    if (status === VoiceConnectionStatus.Ready) return resolve();

    const timeout = setTimeout(() => {
      reject(new Error("VC準備がタイムアウトしました"));
    }, timeoutMs);

    const handler = (_, newState) => {
      if (newState.status === VoiceConnectionStatus.Ready) {
        clearTimeout(timeout);
        connection.off("stateChange", handler);
        resolve();
      }
    };

    connection.on("stateChange", handler);
  });
}
