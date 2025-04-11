import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('schedule-any')
  .setDescription('任意の日付から任意の日数入力')
  

  
  .addStringOption(option => 
    option.setName('startday')
      .setDescription('開始日')
      .setRequired(true)
      .addChoices(
                {name:'今日', value:'0'},
              	{name:'明日', value:'1'}
              )
    )


  .addStringOption(option => 
    option.setName('nisuu')
      .setDescription('何日入力する？')
      .setRequired(true)
                 
);





export async function execute(interaction){
  
  
  
  
const stday = interaction.options.getString('startday'); // 開始日
const niti = interaction.options.getString('nisuu'); // 日数

var now = new Date();
now.setHours(now.getHours() + 9);

var arr = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)" , "(土)"]


// 本日を取得する.
var youbi=now.getDay()
var youbi=arr[youbi];
var todayString = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + youbi


now.setDate(now.getDate() + stday);
var youbi=now.getDay()
var youbi=arr[youbi];
var todayString = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + youbi

await interaction.channel.send(todayString);
  
  
  for (let i = 1;  i < niti; i+1){

    
  now.setDate(now.getDate() + i);
  var youbi=now.getDay()
  var youbi=arr[youbi];
  var todayString = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + youbi
  await interaction.channel.send(todayString);
      
    
}
  
	await interaction.channel.send('@everyone \n交流戦日程⭕❌してほしいでありんす');
  await interaction.channel.send('<@1173137348968595579>');
  await interaction.channel.send('<@1108423516572881006>'); 
  
}
