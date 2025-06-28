import { getVoiceConnection } from "@discordjs/voice";

export default async (oldState, newState) => {
  // BOTがいるギルドID
  const guildId = oldState.guild.id;

  // BOTが接続しているボイスチャンネルのID
  const connection = getVoiceConnection(guildId);
  if (!connection) return;

  const channel = oldState.channel;
  if (!channel) return;

  // ボイスチャンネルのメンバーからBOT以外をカウント
  const nonBotMembers = channel.members.filter((member) => !member.user.bot);

  // 誰もいなくなったら退出
  if (nonBotMembers.size === 0) {
    connection.destroy();
    console.log("👋 VCに誰もいないので退出しました");
  }
};
