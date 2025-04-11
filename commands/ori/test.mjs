import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('test') // コマンド名
  .setDescription('交流戦-詳細テンプレ') // コマンドの説明
  

  .addStringOption(option => 
    option.setName('message')
      .setDescription('お相手の名前')
      .setRequired(true)
      .addChoices(
              	{name:'Japanese', value:'ja'},
              	{name:'English', value:'en'}
              )

                                 
  );


export async function execute(interaction) {
  


  
  
  const messageContent = interaction.options.getString('message'); // お相手
 // const kaisi = interaction.options.getString('zikan'); // お相手
  //const astring = ('22:00～ \nルール＝CSルール \n試合数＝5 \n試合ステージ＝ランダム \nサンズ　'); // 送信するメッセージ
  //const bstring = (' 様 \nオーシャンズ　ありんす \nルーム作成　ありんす \nルームID 1414　\n回線落ちはごめんスタンプでタスキル'); // 送信するメッセージ
  
  await interaction.channel.send(messageContent);
  

}