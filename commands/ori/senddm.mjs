import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName('sendmessage') // コマンド名
  .setDescription('管理者権限が必要-任意ユーザーにメッセージ') // コマンドの説明
  
  .addUserOption(option => 
    option.setName('user')
      .setDescription('ユーザー指定')
      .setRequired(true)
  )
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

  
  const targetUser = interaction.options.getUser('user'); // DMを送るユーザー
  const messageContent = interaction.options.getString('message'); // 送信するメッセージ

  // DMを送信する処理
  try {
    // ユーザーにDMを送信
    await targetUser.send(messageContent);

  } catch (error) {
    console.error('DM送信エラー:', error);
    await interaction.reply('送信失敗');
  }
}