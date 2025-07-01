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
  '🔥 火炎剣', '🧊 氷の弓', '⚡ 雷の槍', '🐍 毒のナイフ', '💣 爆裂パンチ', '🦴 骨のハンマー',
  '📦 謎のダンボール', '🐟 生魚', '🍞 食パンソード', '🧻 トイレットペーパー・ウィップ',
  '🍌 バナナガン', '🪄 魔法のステッキ', '🪓 巨大斧', '🎸 ロックギター（音波攻撃）',
  '🧂 塩まき攻撃', '💤 眠りの枕', '🎯 精密投げ矢', '🪃 ブーメラン', '📱 電波干渉スマホ',
  '🐔 怒れるニワトリ', '🥒 ピクルスバズーカ', '🍡 三色団子手裏剣', '🚿 ポータブルシャワー砲',
  '🧤 革命的ミトン', '📚 辞書クラッシュ', '🎁 爆弾入りプレゼント', '🍔 ハンバーガー手榴弾',
  '💼 スーツケースハンマー', '🔧 工具セット・スマッシュ', '🌂 傘ブレード'
];

// バトル中のランダムアクション集
const actionTemplates = [
  '{A} の強烈な攻撃！{B} は何とかガード！',
  '{B} はカウンターを狙う！',
  '{A} の武器が光を放つ⚡️！',
  '{B} は戦いの舞を披露！観客は熱狂！',
  '激しい連続攻撃が繰り広げられる！',
  '{A} の足元が滑るが、すぐに立て直す！',
  '{B} の攻撃がヒット！',
  '地面が揺れるほどの一撃が炸裂！',
  '突然、観客席から声援が飛ぶ📣！',
  '{A} は叫ぶ「覚悟しろぉぉ！」',
  '{B} の武器が…壊れた！？',
];

function getRandomActions(a, b, count = 4) {
  const shuffled = [...actionTemplates].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(action =>
    action.replace(/{A}/g, a).replace(/{B}/g, b)
  );
}

export async function execute(interaction) {
  const user = interaction.user;
  const opponent = interaction.options.getUser('opponent');

  if (opponent.bot) return interaction.reply("🤖 ボットとは戦えません！");
  if (user.id === opponent.id) return interaction.reply("😅 自分自身とは戦えません！");

  const member = await interaction.guild.members.fetch(user.id);
  const opponentMember = await interaction.guild.members.fetch(opponent.id);

  const userName = member.displayName;
  const opponentName = opponentMember.displayName;

  const userWeapon = weapons[Math.floor(Math.random() * weapons.length)];
  const opponentWeapon = weapons[Math.floor(Math.random() * weapons.length)];

  await interaction.reply(`⚔️ **${userName}** vs **${opponentName}** のバトルが始まった！`);

  await new Promise(r => setTimeout(r, 1000));
  await interaction.followUp(`${userName} は ${userWeapon} を構えた！`);
  await new Promise(r => setTimeout(r, 1000));
  await interaction.followUp(`${opponentName} は ${opponentWeapon} を装備！`);
  await new Promise(r => setTimeout(r, 1200));

  // ランダムなバトル展開
  const battle = getRandomActions(userName, opponentName);
  for (const act of battle) {
    await new Promise(r => setTimeout(r, 1100 + Math.random() * 400));
    await interaction.followUp(act);
  }

  const winner = Math.random() < 0.5 ? userName : opponentName;

  await new Promise(r => setTimeout(r, 1500));
  await interaction.followUp(`🏆 **${winner}** の勝利！ 🎉`);
}
