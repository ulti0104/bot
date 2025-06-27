// commands/voice/join.mjs
import { SlashCommandBuilder } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";

export const data = new SlashCommandBuilder()
  .setName("join")
  .setDescription("ボイスチャンネルに参加します");

export async function execute(interaction) {
  const channel = interaction.member.voice.channel;

  if (!channel) {
    return interaction.reply({
      content: "❌ 先にボイスチャンネルに参加してください。",
      ephemeral: true,
    });
  }

  try {
  // すでに VC に接続
  joinVoiceChannel({...});

  // 1回だけ reply
  await interaction.reply("✅ ボイスチャンネルに参加しました！");
} catch (error) {
  console.error("VC参加エラー:", error);

  // すでに reply したか確認
  if (interaction.replied || interaction.deferred) {
    await interaction.followUp({
      content: "⚠️ ボイスチャンネルへの参加に失敗しました。",
      ephemeral: true,
    });
  } else {
    await interaction.reply({
      content: "⚠️ ボイスチャンネルへの参加に失敗しました。",
      ephemeral: true,
    });
  }
}
}
