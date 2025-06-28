import { SlashCommandBuilder } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";

export const data = new SlashCommandBuilder()
  .setName("leave")
  .setDescription("ボイスチャンネルから退出します");

export async function execute(interaction) {
  const guildId = interaction.guild?.id;
  const connection = getVoiceConnection(guildId);

  if (!connection) {
    await interaction.reply({
      content: "❌ Botはボイスチャンネルに接続していません。",
      ephemeral: true,
    });
    return;
  }

  connection.destroy();
  await interaction.reply("👋 ボイスチャンネルから退出しました！");
}
