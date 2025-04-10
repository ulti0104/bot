import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('koryu') // コマンド名
  .setDescription('交流戦テンプレ') // コマンドの説明
  

  .addStringOption(option => 
    option.setName('aite')
      .setDescription('お相手の名前')
      .setRequired(true)
                   
             
                   
  );

export async function execute(interaction) {
  

  
  const messageContent = interaction.options.getString('aite'); // 送信するメッセージ

  
  await interaction.channel.send('月日（）:~ルール 試合数 試合ステージ   ランダムサンズ  様オーシャンズ ありんすID 1414ルーム作成 1414回線落ちはごめんスタンプでタスキル');
  

}