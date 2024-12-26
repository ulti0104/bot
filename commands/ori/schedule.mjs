import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('schedule')
  .setDescription('日付入力');

var now = new Date();
now.setHours(now.getHours() + 9);

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



export async function execute(interaction){
	await interaction.channel.send(todayString);
  await interaction.channel.send(todayString1);
  await interaction.channel.send(todayString2);
  await interaction.channel.send(todayString3);
  await interaction.channel.send(todayString4);
  await interaction.channel.send(todayString5);
  await interaction.channel.send(todayString6);
  
  
}
