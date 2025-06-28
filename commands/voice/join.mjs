// commands/voice/join.mjs
import { SlashCommandBuilder } from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";

export const data = new SlashCommandBuilder()
  .setName("join")
  .setDescription("ボイスチャンネルに参加します");

export async function execute(interaction) {
  const channel = interaction.member.voice.channel;

  if (!channel) {
    // ✅ VCに接続していない時の明確なメッセージ
    return await interaction.reply({
      content: "❗️先にボイスチャンネルに参加してください。",
      ephemeral: true,
    });
  }

  try {
    // ✅ VCに接続
    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: false,
    });

    return await interaction.reply("✅ ボイスチャンネルに参加しました！");
  } catch (error) {
    console.error("VC参加エラー:", error);

    // ✅ エラー時にも丁寧な説明
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "⚠️ ボイスチャンネルへの参加中にエラーが発生しました。",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "⚠️ ボイスチャンネルへの参加中にエラーが発生しました。",
        ephemeral: true,
      });
    }
  }
}
