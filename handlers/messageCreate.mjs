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
  
  
  
  
};
