import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('koryusen') // コマンド名
  .setDescription('交流戦-詳細テンプレ') // コマンドの説明
  

  .addStringOption(option => 
    option.setName('message')
      .setDescription('お相手の名前')
      .setRequired(true)
  )               
                   
  .addStringOption(option => 
    option.setName('starttime')
      .setDescription('開始時間')
      .setRequired(true)
      .addChoices(
                {name:'只今', value:'只今より'},
              	{name:'22:00', value:'22:00～'},
              	{name:'22:30', value:'22:30～'},
                {name:'23:00', value:'23:00～'},
                {name:'23:30', value:'23:30～'}
              )
    )
                   
    .addStringOption(option => 
    option.setName('numbermatch')
      .setDescription('試合数')
      .setRequired(true)
      .addChoices(
                {name:'3', value:'3'},
              	{name:'4', value:'4'},
              	{name:'5', value:'5'},
                {name:'6', value:'6'},
                {name:'7', value:'7'}
              )
                                 
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
  const kaisi = interaction.options.getString('starttime'); // 時間
  const shiai = interaction.options.getString('numbermatch'); // 試合数
  const astring = (' \nルール＝CSルール \n試合数＝5 \n試合ステージ＝ランダム \nサンズ　'); // 送信するメッセージ
  const bstring = (' 様 \nオーシャンズ　ありんす \nルーム作成　ありんす \nルームID 1414　\n回線落ちはごめんスタンプでタスキル'); // 送信するメッセージ
  
  await interaction.channel.send(todayString+kaisi+astring+messageContent+bstring);
  

}