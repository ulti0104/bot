import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('delete-react')
  .setDescription('うるティのリアクションを削除');

export async function execute(interaction) {
  const channel = interaction.channel;

  try {
    // メッセージを直近10件取得
    const messages = await channel.messages.fetch({ limit: 20 });

    // BOTのリアクションのみ削除
    for (const [, message] of messages) {
      for (const [emoji, reaction] of message.reactions.cache) {
        // BOTがつけたリアクションなら削除
        const meReacted = reaction.users.cache.has(interaction.client.user.id);
        if (meReacted) {
          await reaction.users.remove(interaction.client.user.id);
          console.log(`🧹 ${emoji} を削除`);
        }
      }
    }

    await interaction.reply({
      content: '✅ BOTのリアクションを削除しました',
      ephemeral: true,
    });
  } catch (error) {
    console.error('リアクション削除中のエラー:', error);
    await interaction.reply({
      content: '⚠️ リアクション削除中にエラーが発生しました',
      ephemeral: true,
    });
  }
}
