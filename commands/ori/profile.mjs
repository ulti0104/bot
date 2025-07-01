import { SlashCommandBuilder, AttachmentBuilder } from 'discord.js';
import Canvas from '@napi-rs/canvas';

export const data = new SlashCommandBuilder()
  .setName('profile')
  .setDescription('あなたのプロフィールカードを表示します');

const TITLES = [
  '🌟 伝説の勇者',
  '💡 天才プログラマー',
  '🔥 情熱の戦士',
  '🧠 知識の探究者',
  '🌙 夜更かしチャンピオン',
  '🥔 ツイストポテト愛好家',
  '🧌 Discordマスター',
  '🎮 ゲームの達人',
  '😎 クールな奴',
  '📚 本の虫'
];

export async function execute(interaction) {
  const user = interaction.user;
  const member = interaction.member;

  // ランダムな称号を選ぶ
  const title = TITLES[Math.floor(Math.random() * TITLES.length)];

  // Canvas作成
  const width = 800;
  const height = 300;
  const canvas = Canvas.createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 背景
  ctx.fillStyle = '#2c2f33';
  ctx.fillRect(0, 0, width, height);

  // アバター
  const avatarURL = user.displayAvatarURL({ extension: 'png', size: 256 });
  const avatar = await Canvas.loadImage(avatarURL);
  ctx.beginPath();
  ctx.arc(150, 150, 100, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatar, 50, 50, 200, 200);
  ctx.restore();

  // テキストスタイル
  ctx.font = 'bold 30px Sans';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(user.tag, 270, 80);
  ctx.font = '24px Sans';
  ctx.fillText(`🆔 ${user.id}`, 270, 120);
  ctx.fillText(`🎉 サーバー参加: ${member.joinedAt.toDateString()}`, 270, 170);

  // 称号
  ctx.fillStyle = '#ffcc00';
  ctx.font = 'bold 26px Sans';
  ctx.fillText(`🏷️ ${title}`, 270, 260);

  // 出力
  const buffer = await canvas.encode('png');
  const attachment = new AttachmentBuilder(buffer, { name: 'profile-card.png' });

  await interaction.reply({ files: [attachment] });
}
