import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("image")
  .setDescription("指定したユーザーのアイコン表示")
  .addUserOption(option =>
    option.setName("user")
      .setDescription("ユーザー指定")
      .setRequired(true)
  );

export async function execute(interaction) {
  const user = interaction.options.getUser("user");
  const avatarUrl = user.displayAvatarURL({ dynamic: true, size: 1024 });

  await interaction.reply({
    content: `🖼️ **${user.username}** のアイコン：\n${avatarUrl}`,
    embeds: [
      {
        title: `${user.username} のアイコン`,
        image: { url: avatarUrl },
        color: 0x00aaff
      }
    ]
  });
}
