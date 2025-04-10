import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('kk') // コマンド名
  .setDescription('管理者権限が必要-うるティが任意メッセージを発言') // コマンドの説明
  

  .addStringOption(option => 
    option.setName('message')
      .setDescription('メッセージ')
      .setRequired(true)
                   
             
                   
  );

export async function execute(interaction) {
  

    
  
  
  const messageContent = interaction.options.getString('message'); // 送信するメッセージ
  const astring = ('22:00～'); // 送信するメッセージ
  
  await interaction.channel.send(messageContent+astring);
  

}