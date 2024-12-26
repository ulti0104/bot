import {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";


export const data = new SlashCommandBuilder()
  .setName('schedule2')
  .setDescription('日付入力');



var now = new Date();
now.setHours(now.getHours() + 9);









export async function execute(interaction){
        const button1 = new ButtonBuilder()
            .setCustomId('button1')//他のファイルのボタンと被らないようにする
            .setLabel('一つ目のボタン')
            .setStyle(ButtonStyle.Success);
    
        const button2 = new ButtonBuilder()
            .setCustomId('button2')
            .setLabel('二つ目のボタン')
            .setStyle(ButtonStyle.Secondary);
    
        const row = new ActionRowBuilder()
            .addComponents(button1, button2);
        //定数に入れて判別する
        const response = await interaction.reply({ content: 'ボタンを送信しました', components: [row]});
        //処理
        const collectorFilter = i => i.user.id === interaction.user.id;
            
        try {
    
            if (interaction.customId === 'button1') {

              
              
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



	await interaction.channel.send(todayString);
  await interaction.channel.send(todayString1);
  await interaction.channel.send(todayString2);
  await interaction.channel.send(todayString3);
  await interaction.channel.send(todayString4);
  await interaction.channel.send(todayString5);
  await interaction.channel.send(todayString6);
  
            
            
            
            
            } else if (interaction.customId === 'button2') {
              
              
now.setDate(now.getDate() + 1);
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



	await interaction.channel.send(todayString);
  await interaction.channel.send(todayString1);
  await interaction.channel.send(todayString2);
  await interaction.channel.send(todayString3);
  await interaction.channel.send(todayString4);
  await interaction.channel.send(todayString5);
  await interaction.channel.send(todayString6);
              
              
            }
        } catch (e) {
            await interaction.editReply({ content: '1分たったのでボタンの処理を停止しました', components: [] });
        }            
};