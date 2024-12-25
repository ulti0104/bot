import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('schedule')
  .setDescription('日付入力');

var now = new Date();

// 本日を取得する.
var todayString = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'

now.setDate(now.getDate() + 1);
var todayString1 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
now.setDate(now.getDate() + 1);
var todayString2 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
now.setDate(now.getDate() + 1);
var todayString3 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
now.setDate(now.getDate() + 1);
var todayString4 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
now.setDate(now.getDate() + 1);
var todayString5 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
now.setDate(now.getDate() + 1);
var todayString6 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'
now.setDate(now.getDate() + 1);
var todayString6 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日'



export async function execute(interaction){
	await interaction.reply(todayString);
  await interaction.followUp(todayString1);
  await interaction.followUp(todayString2);
  await interaction.followUp(todayString3);
  await interaction.followUp(todayString4);
  await interaction.followUp(todayString5);
  await interaction.followUp(todayString6);
  
  await message.channel.send("こんにちは！Discord Botです。");
  
}
