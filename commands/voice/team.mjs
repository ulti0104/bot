// commands/voice/team-split.mjs
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('team')
  .setDescription('VCにいるメンバーを2チームに分ける');

export async function execute(interaction) {
  const member = interaction.member;
  const voiceChannel = member.voice.channel;

  if (!voiceChannel) {
    return await interaction.reply({
      content: '❗️先にボイスチャンネルに参加してください。',
      ephemeral: true,
    });
  }

  // VCメンバーを取得（BOT除外・実行者は含む）
  const members = [...voiceChannel.members.values()]
    .filter(m => !m.user.bot || m.id === interaction.user.id);

  if (members.length < 2) {
    return await interaction.reply({
      content: '⚠️ チーム分けには最低2人必要です！',
      ephemeral: true,
    });
  }

  // シャッフルして均等分け
  const shuffled = members.sort(() => Math.random() - 0.5);
  const teamA = [];
  const teamB = [];

  for (let i = 0; i < shuffled.length; i++) {
    if (teamA.length <= teamB.length) {
      teamA.push(shuffled[i]);
    } else {
      teamB.push(shuffled[i]);
    }
  }

  const formatTeam = (team) => team.map(m => `・${m.displayName}`).join('\n');

  const message = ` **VCチーム分け**

🔵 **オーシャンズ**（${teamA.length}人）
${formatTeam(teamA)}

🟠 **サンズ**（${teamB.length}人）
${formatTeam(teamB)}
`;

  await interaction.reply(message);
}
