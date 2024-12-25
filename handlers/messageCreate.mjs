var emoji="\N{Cross Mark}"

export default async(message) => {
  if (message.content.match(/年|月/)) {
    await message.react("❌");
    
  }
  

};