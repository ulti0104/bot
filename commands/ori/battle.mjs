import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('battle')
  .setDescription('指定した相手とバトル！')
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
    return await interaction.reply("😅ボットとは戦えないよ！");
  }

  if (user.id === opponent.id) {
    return await interaction.reply("😅自分自身とは戦えなよ！");
  }

  // 武器をランダムで決定
  const userWeapon = weapons[Math.floor(Math.random() * weapons.length)];
  const opponentWeapon = weapons[Math.floor(Math.random() * weapons.length)];

  await interaction.reply(`⚔️ ${user.username} vs ${opponent.username} のバトルが始まった！`);

  await new Promise(r => setTimeout(r, 1000));
  await interaction.followUp(`${user.username} は ${userWeapon} を構えた！`);
  await new Promise(r => setTimeout(r, 1000));
  await interaction.followUp(`${opponent.username} は ${opponentWeapon} を装備！`);
  await new Promise(r => setTimeout(r, 1500));

  const actions = [
    `${user.username} の一撃！ ${opponent.username} は華麗に回避！`,
    `${opponent.username} の反撃！`,
    `武器がぶつかり合い sparks が飛び散る！`,
    `観客が盛り上がる…！！`,
  ];
  for (const act of actions) {
    await new Promise(r => setTimeout(r, 1200));
    await interaction.followUp(act);
  }

  const winner = Math.random() < 0.5 ? user : opponent;

  await new Promise(r => setTimeout(r, 1500));
  await interaction.followUp(`🏆 **${winner.username}** の勝利！ 🎉`);
}
