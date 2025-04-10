import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('koryu') // コマンド名
  .setDescription('交流戦テンプレ') // コマンドの説明
  

  .addStringOption(option => 
    option.setName('aite')
      .setDescription('お相手の名前')
      .setRequired(true)      

                   
 );



//var now = new Date();
//now.setHours(now.getHours() + 9);
//var arr = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)" , "(土)"]
// 本日を取得する.
//var youbi=now.getDay()
//var youbi=arr[youbi];
//var todayString = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + youbi




export async function exastringecute(interaction) {
  

  
  const aitestring = interaction.options.getString('aite'); // お相手
  //var astring = ('22:00～ \nルール \n試合数 \n試合ステージ \nランダム \nサンズ'); // 送信するメッセージ
  //var bstring = ('様 \nオーシャンズ ありんす \nルームID 1414　\n回線落ちはごめんスタンプでタスキル'); // 送信するメッセージ
 // const astring = ('22:00～'); // 送信するメッセージ
  
  //await interaction.channel.send('月日（）  ');
  await interaction.channel.send(aitestring);
  

}