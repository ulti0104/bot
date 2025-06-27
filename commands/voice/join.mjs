import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('join')
  .setDescription('ボイチャ参加');

export async function execute(interaction) {
  const { joinVoiceChannel } = await import('@discordjs/voice');

  const channel = interaction.member.voice.channel;
  if (!channel) return interaction.reply('ボイスチャンネルに参加からやってくれんす');

  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: interaction.guild.id,
    adapterCreator: interaction.guild.voiceAdapterCreator,
  });

  interaction.client.voiceConnections.set(interaction.guild.id, connection);

  return interaction.reply('ボイスチャンネルに参加しました！');
}
