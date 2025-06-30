// commands/voice/join.mjs
import { SlashCommandBuilder } from "discord.js";
import {
  joinVoiceChannel,
  entersState,
  VoiceConnectionStatus,
} from "@discordjs/voice";

export const data = new SlashCommandBuilder()
  .setName("join")
  .setDescription("ボイスチャンネルに参加します");

export async function execute(interaction) {
  const channel = interaction.member.voice.channel;

  if (!channel) {
    return await interaction.reply({
      content: "❗️先にボイスチャンネルに参加してください。",
      ephemeral: true,
    });
  }

  try {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: false,
    });

    // ✅ 接続が完了するまで待機（最大15秒）
    await entersState(connection, VoiceConnectionStatus.Ready, 15_000);

    return await interaction.reply("✅ ボイスチャンネルに参加しました！");
  } catch (error) {
    console.error("❌ VC接続エラー:", error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "⚠️ ボイスチャンネル参加中にエラーが発生しました。",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "⚠️ ボイスチャンネル参加中にエラーが発生しました。",
        ephemeral: true,
      });
    }
  }
}
