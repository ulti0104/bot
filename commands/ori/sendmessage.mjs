import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('talk') // コマンド名
  .setDescription('管理者権限が必要-うるティが任意メッセージを発言') // コマンドの説明
  

  .addStringOption(option => 
    option.setName('message')
      .setDescription('メッセージ')
      .setRequired(true)
                   
             
                   
  );

export async function execute(interaction) {
  

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    return await interaction.reply({
      content: "このコマンドを実行する権限がありません。",
      ephemeral: true,
    });
  }

  
  
  const messageContent = interaction.options.getString('message'); // 送信するメッセージ

  
  await interaction.channel.send(messageContent);
  

}