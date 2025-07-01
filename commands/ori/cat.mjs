// commands/fun/cat.mjs
import { SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch'; // Node 18未満の場合のみ必要

export const data = new SlashCommandBuilder()
  .setName('cat')
  .setDescription('猫!猫!猫!猫!猫!猫!');

export async function execute(interaction) {
  await interaction.deferReply();

  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();

    if (!data[0]?.url) throw new Error("猫画像の取得に失敗しました");

    await interaction.editReply({
      content: "🐾 にゃーん！",
      files: [data[0].url],
    });
  } catch (error) {
    console.error("🐱 catコマンドエラー:", error);
    await interaction.editReply("⚠️ 猫の画像を取得できませんでした。");
  }
}
