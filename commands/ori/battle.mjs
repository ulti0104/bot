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
  '{A} は叫ぶ「覚悟しろぉぉ！」',
  '{B} の武器が…壊れた！？',
];

function generateBattleActions(a, b, count = 4) {
  return [...battleActions]
    .sort(() => 0.5 - Math.random())
    .slice(0, count)
    .map(t => t.replace(/{A}/g, a).replace(/{B}/g, b));
}

const cheeringTemplates = [
  `すごいぞ！信じてるぞ！`,
  `がんばれー！逆転のチャンスだ！`,
  `その攻撃、かっこよすぎ！`,
  `いけぇぇぇ！決めてくれ！！`,
  `こんなバトル、見たことない！`,
  `これは伝説になるぞ！！`,
  `勝利は目の前だ！集中！`,
  `もう目が離せない！`,
  `燃えてきたぁぁぁ🔥🔥🔥`,
  `ギャーー！！最高！！`,
  `今の見た！？やばすぎ！`,
  `実況つけて！誰か実況して！`,
  `勝ったら奢ってね！？`,
  `この試合…映画化決定でしょ！？`,
  `もう誰にも止められない！！`,
];

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

  // 観客コメント：対戦者以外のランダムユーザー名 + ランダムセリフ
  const allMembers = await interaction.guild.members.fetch();
  const spectators = allMembers.filter(m => !m.user.bot && m.id !== user.id && m.id !== opponent.id);
  const selectedSpectators = [...spectators.values()]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  for (const spectator of selectedSpectators) {
    const cheer = cheeringTemplates[Math.floor(Math.random() * cheeringTemplates.length)];
    const spectatorName = spectator.displayName;
    await new Promise(r => setTimeout(r, 800 + Math.random() * 400));
    await interaction.followUp(`👥 **${spectatorName}**「${cheer}」`);
  }

  const winner = Math.random() < 0.5 ? userName : opponentName;
  await new Promise(r => setTimeout(r, 1500));
  await interaction.followUp(`🏆 **${winner}** の勝利！ 🎉`);
}
