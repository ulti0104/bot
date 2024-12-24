import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('schedule')
  .setDescription('日付入力');

var now = new Date();

// 本日を取得する.
var todayString = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
var todayString1 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + (now.getDate()+1) + '日'


export async function execute(interaction){
	await interaction.reply(todayString);
  await interaction.followUp(todayString1);
}
