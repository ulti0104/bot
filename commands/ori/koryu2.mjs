import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('kk') // コマンド名
  .setDescription('管理者権限が必要-うるティが任意メッセージを発言') // コマンドの説明
  

  .addStringOption(option => 
    option.setName('message')
      .setDescription('お相手の名前')
      .setRequired(true)
              
                   
  );


var now = new Date();
now.setHours(now.getHours() + 9);
var arr = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)" , "(土)"]
// 本日を取得する.
var youbi=now.getDay()
var youbi=arr[youbi];
var todayString = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日' + youbi                   
              


export async function execute(interaction) {
  


  
  
  const messageContent = interaction.options.getString('message'); // お相手
  const astring = ('22:00～ \nルール CSルール \n試合数 5 \n試合ステージ ランダム \nサンズ'); // 送信するメッセージ
  const bstring = (' 様 \nオーシャンズ ありんす \nルーム作成　ありんす \nルームID 1414　\n回線落ちはごめんスタンプでタスキル'); // 送信するメッセージ
  
  await interaction.channel.send(todayString+astring+messageContent+bstring);
  

}