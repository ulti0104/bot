export default async(message) => {
  if (message.content.match(/年|月/)) {
    await message.react("⭕");
    await message.react("❌");
    await message.react("🔺");
    
  }

};