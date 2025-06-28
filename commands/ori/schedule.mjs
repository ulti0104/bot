import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('schedule-today')
  .setDescription('今日の日付から入力');

var now = new Date();
now.setHours(now.getHours() + 9);

var arr = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)" , "(土)"]


// 本日を取得する.
var youbi=now.getDay()
var youbi=arr[youbi];
var todayString = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + youbi

now.setDate(now.getDate() + 1);
var youbi=now.getDay()
var youbi=arr[youbi];
var todayString1 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + youbi

now.setDate(now.getDate() + 1);
var youbi=now.getDay()
var youbi=arr[youbi];
var todayString2 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + youbi

now.setDate(now.getDate() + 1);
var youbi=now.getDay()
var youbi=arr[youbi];
var todayString3 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + youbi

now.setDate(now.getDate() + 1);var youbi=now.getDay()
var youbi=arr[youbi];
var todayString4 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + youbi

now.setDate(now.getDate() + 1);
var youbi=now.getDay()
var youbi=arr[youbi];
var todayString5 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + youbi

now.setDate(now.getDate() + 1);
var youbi=now.getDay()
var youbi=arr[youbi];
var todayString6 = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + youbi



export async function execute(interaction){
	await interaction.channel.send(todayString);
  await interaction.channel.send(todayString1);

  await interaction.channel.send(todayString2);
  await interaction.channel.send(todayString3);
  await interaction.channel.send(todayString4);
  await interaction.channel.send(todayString5);
  await interaction.channel.send(todayString6);

		await sentMessage.react("⭕");
  	await sentMessage.react("❌");
  	await sentMessage.react("🔺");
  	await sentMessage.react("❓");
	
  await interaction.channel.send('@everyone \n交流戦日程⭕❌してほしいでありんす');

  
}
