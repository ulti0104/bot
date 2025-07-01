import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('dis')
  .setDescription('お楽しみ')
  .addUserOption(option =>
    option.setName('target')
      .setDescription('ユーザー指定')
      .setRequired(true)
  );

const roasts = [
  'お前のIQ、冷蔵庫の温度より低いな…',
  '{name} のファッション、時空を超えてるね（悪い意味で）',
  'いつも頑張ってるけど、方向が真逆だよ？',
  '鏡見た？うん、ご愁傷様です。',
  'その発言、ラグで1時間遅れて届いたのかな？',
  '天才だって？違う意味でのね。',
  '存在感が空気より希薄…透明人間なの？',
  '{name} の辞書には「センス」がないらしい',
  '全力で走っても、道を間違えてるタイプ',
  'ユーモアが足りない？いや、君がギャグそのものだよ',
  'その髪型…意識してる？それとも事故？',
  '今日も安定のポンコツっぷり、さすがです。',
  'AIでも判別できない存在、それが {name}。',
  '口開いた瞬間、知能指数が減る音が聞こえるよ'
];

export async function execute(interaction) {
  const target = interaction.options.getUser('target');

  if (target.bot) {
    return interaction.reply("🤖 ボットにディスは効きません…たぶん。");
  }

  if (target.id === interaction.user.id) {
    return interaction.reply("😅 自分自身をディスるとは、深い…！");
  }

  const member = await interaction.guild.members.fetch(target.id);
  const name = member.displayName;

  const selected = roasts[Math.floor(Math.random() * roasts.length)]
    .replace(/{name}/g, name);

  return interaction.reply(`🔥 ${selected}`);
}
