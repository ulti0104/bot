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
  '🔥 火炎剣', '🧊 氷の弓', '⚡ 雷の槍', '🐍 毒のナイフ', '💣 爆裂パンチ',
  '🦴 骨のハンマー', '📦 謎のダンボール', '🐟 生魚', '🍞 食パンソード',
  '🧻 トイレットペーパー・ウィップ', '🍌 バナナガン', '🪄 魔法のステッキ',
  '🪓 巨大斧', '🎸 ロックギター（音波攻撃）', '🧂 塩まき攻撃', '💤 眠りの枕',
  '🎯 精密投げ矢', '🪃 ブーメラン', '📱 電波干渉スマホ', '🐔 怒れるニワトリ',
  '🥒 ピクルスバズーカ', '🍡 三色団子手裏剣', '🚿 ポータブルシャワー砲',
  '🧤 革命的ミトン', '📚 辞書クラッシュ', '🎁 爆弾入りプレゼント',
  '🍔 ハンバーガー手榴弾', '💼 スーツケースハンマー',
  '🔧 工具セット・スマッシュ', '🌂 傘ブレード'
];

const battleActions = [
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

const generateBattleActions = (a, b, count = 4) =>
  [...battleActions]
    .sort(() => 0.5 - Math.random())
    .slice(0, count)
    .map(t => t.replace(/{A}/g, a).replace(/{B}/g, b));

const generateCheeringMessages = (a, b) => {
  const cheeringTemplates = [
    `📣 ${a}〜！ここが正念場だぞ〜！`,
    `👊 ${b}なんて蹴散らしちゃえ！ ${a}のターン！`,
    `😤 ${a}、まだ本気出してないよね？`,
    `🔥 ${a}ならやれる！信じてるぞ！！`,
    `😂 ${b}〜今のミス、全世界に配信されてるぞ〜！？`,
    `🫡 勝利の味は${a}だけのものだ！`,
    `💀 ${b}、覚悟はできてるよな？`,
    `✨ ${a}の必殺技が光り輝く瞬間を見逃すな！`,
    `🫨 ${b}が強すぎる！？いや、${a}が巻き返すはず！`,
    `🍖 ${a}が勝ったら焼肉おごりって言ったよね！？`,
    `📺 ただいま${a} vs ${b}の頂上決戦をお送りしております`,
    `🍿 ${a}〜！さっきの攻撃、観客席から見ても完璧だったよ！`,
    `🚑 ${b}…負けても救急車は手配済みだってさ`,
    `🐸 ${a}にカエルバフ付与！ぴょんぴょん勝て！`,
    `📦 ${b}には謎のダンボールを贈呈しておきます`,
    `💃 ${a}！この戦い、ダンスバトルでも勝てるぞ！？`,
    `🎉 ${a}のファン10万人が応援中！！`,
    `⚖️ え？審判買収したの誰？（もちろん${a}の勝利です）`,
    `🤖 ${b}、残念ながらスクリプトエラーです。${a}の勝利！`,
    `🪐 ${a}の攻撃が宇宙に届いた！？`,
    `⛩️ 勝利の神が微笑んでいる…${a}に！`,
    `💸 ${b}、勝てたら100万ジンバブエドル進呈`,
    `📕 教科書にも載るぞ、この戦い。がんばれ${a}！`,
    `🪖 ${a}、ここで決めるんだ！伝説を作れ！`,
    `📢 ${b}ーッ！今のはやられたふりだよな！？…え？マジ？`,
  ];
  return cheeringTemplates.sort(() => 0.5 - Math.random()).slice(0, 4);
};

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

  const battle = generateBattleActions(userName, opponentName);
  for (const act of battle) {
    await new Promise(r => setTimeout(r, 1100 + Math.random() * 400));
    await interaction.followUp(act);
  }

  const cheers = generateCheeringMessages(userName, opponentName);
  for (const cheer of cheers) {
    await new Promise(r => setTimeout(r, 800 + Math.random() * 500));
    await interaction.followUp(`👥 観客: ${cheer}`);
  }

  const winner = Math.random() < 0.5 ? userName : opponentName;

  await new Promise(r => setTimeout(r, 1500));
  await interaction.followUp(`🏆 **${winner}** の勝利！ 🎉`);
}
