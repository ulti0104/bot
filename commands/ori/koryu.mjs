import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('koryu') // コマンド名
  .setDescription('交流戦テンプレ') // コマンドの説明
  

  .addStringOption(option => 
    option.setName('aite')
      .setDescription('お相手の名前')
      .setRequired(true)      
                   
 

  .addStringOption(option => 
    option.setName('shiai')
      .setDescription('試合数')
      .setRequired(true)
                   
 ) );


export async function execute(interaction) {
  

  
  const aitestring = interaction.options.getString('aite'); // 送信するメッセージ
  const sanz = ('サンズ'); // 送信するメッセージ
  
  //await interaction.channel.send('月日（）:~\nルール \n試合数 \n試合ステージ \nランダムサンズ  様 \nオーシャンズ ありんす \nルームID 1414　\n　回線落ちはごめんスタンプでタスキル');
  await interaction.channel.send(sanz + aitestring);
  

}