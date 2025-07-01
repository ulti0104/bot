import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('battle')
  .setDescription('指定した相手とバトル')
  .addUserOption(option =>
    option.setName('opponent')
      .setDescription('対戦相手を選択')
      .setRequired(true)
  );

const weapons = [
  '🔥 火炎剣',
  '🧊 氷の弓',
  '⚡ 雷の槍',
  '🐍 毒のナイフ',
  '💣 爆裂パンチ',
  '🦴 骨のハンマー',
  '📦 謎のダンボール',
  '🐟 生魚',
  '🍞 食パンソード',
  '🧻 トイレットペーパー・ウィップ',
];

export async function execute(interaction) {
  const user = interaction.user;
  const opponent = interaction.options.getUser('opponent');

  if (opponent.bot) {
    return await interaction.reply("ボットとは戦えません！");
  }

  if (user.id === opponent.id) {
    return await interaction.reply("自分自身とは戦えません！");
  }

  const member = await interaction.guild.members.fetch(user.id);
  const opponentMember = await interaction.guild.members.fetch(opponent.id);

  const userName = member.displayName;
  const opponentName = opponentMember.displayName;

  const userWeapon = weapons[Math.floor(Math.random() * weapons.length)];
  const opponentWeapon = weapons[Math.floor(Math.random() * weapons.length)];

  await interaction.reply(`⚔️ ${userName} vs ${opponentName} のバトルが始まった！`);

  await new Promise(r => setTimeout(r, 1000));
  await interaction.followUp(`${userName} は ${userWeapon} を構えた！`);
  await new Promise(r => setTimeout(r, 1000));
  await interaction.followUp(`${opponentName} は ${opponentWeapon} を装備！`);
  await new Promise(r => setTimeout(r, 1500));

  const actions = [
    `${userName} の一撃！ ${opponentName} は華麗に回避！`,
    `${opponentName} の反撃！`,
    `武器がぶつかり合い sparks が飛び散る！`,
    `観客が盛り上がる…！！`,
  ];
  for (const act of actions) {
    await new Promise(r => setTimeout(r, 1200));
    await interaction.followUp(act);
  }

  const winner = Math.random() < 0.5 ? userName : opponentName;

  await new Promise(r => setTimeout(r, 1500));
  await interaction.followUp(`🏆 **${winner}** の勝利！ 🎉`);
}
