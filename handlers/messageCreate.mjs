export default async(message) => {
  if (message.content.match(/年|月/)) {
    
    await message.react("⭕");
    await message.react("❌");
    await message.react("🔺");
    
  }
  
  
  if (message.content.match(/Happy Birthday|𝐻𝑎𝑝𝑝𝑦 𝑏𝑖𝑟𝑡ℎ𝑑𝑎𝑦/)) {
    
    await message.channel.send("はっぴーばーすでー");
    
  }
  

  
  
};