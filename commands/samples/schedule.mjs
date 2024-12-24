function formatDate(date, sep="") {
  const yyyy = date.getFullYear();
  const mm = ('00' + (date.getMonth()+1)).slice(-2);
  const dd = ('00' + date.getDate()).slice(-2);

  return `${yyyy}${sep}${mm}${sep}${dd}`;
}


const dateTime = new Date();
const date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());


// ハイフン区切り
const dateStrHyphen = formatDate(date, "-");
console.log(dateStrHyphen);
// 2022-09-14



import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('schedule')
  .setDescription('うるティが返事してくれるよ');

export async function execute(interaction){
  await interaction.reply(dateStrHyphen);
}