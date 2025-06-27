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
      content: "先にVCに参加してください。",
      ephemeral: true,
    });
  }

  joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: false,
  });

  await interaction.reply("VCに参加しました！");
}
﻿
みみさぶ
ulti.14.sub
 
