import { getVoiceConnection, joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from "@discordjs/voice";
import googleTTS from "google-tts-api";

export default async(message) => {
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
  
  
  
  if (message.content.match(/Happy Birthday|𝐻𝑎𝑝𝑝𝑦 𝑏𝑖𝑟𝑡ℎ𝑑𝑎𝑦/)) {
    
    await message.channel.send("はっぴーばーすでー");
    
  }
  

  
  if (message.content.match(/はぴば|誕生日おめでとう/)) {
    
    await message.channel.send("はっぴーばーすでー");
    
  }
  


  // ✅ VCでの読み上げ機能（BOTが既にVCにいるとき）
if (!message.author.bot && message.guild) {
  const connection = getVoiceConnection(message.guild.id);
  if (connection) {
    try {
      const url = googleTTS.getAudioUrl(message.content, {
        lang: "ja",
        slow: false,
        host: "https://translate.google.com/",
      });

      const resource = createAudioResource(url);
      const player = createAudioPlayer();

      player.play(resource);
      connection.subscribe(player);

      // 読み上げ完了を待ってから接続解除してもよい（任意）
      player.once(AudioPlayerStatus.Idle, () => {
        // connection.destroy(); // ←ずっと接続し続けたいならコメントアウト
      });

    } catch (err) {
      console.error("TTSエラー:", err);
    }
  }
}
  
  
};
