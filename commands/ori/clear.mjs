import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('clear')
  .setDescription('直近20件のメッセージを削除します')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages); // メッセージ管理権限が必要

export async function execute(interaction) {
  const channel = interaction.channel;

  if (!channel || !channel.bulkDelete) {
    return await interaction.reply({
      content: '⚠️ このチャンネルではメッセージを削除できません。',
      ephemeral: true
    });
  }

  try {
    const deleted = await channel.bulkDelete(20, true); // true = 14日以内のみに限定
    await interaction.reply({
      content: `🧹 メッセージを **${deleted.size} 件** 削除しました。`,
      ephemeral: true
    });
  } catch (error) {
    console.error('削除エラー:', error);
    await interaction.reply({
      content: '❌ メッセージ削除に失敗しました。ボットに適切な権限がありますか？',
      ephemeral: true
    });
  }
}
