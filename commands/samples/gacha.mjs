import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("gacha")
  .setDescription("ガチャを引くよ～");

export async function execute(interaction) {
  const arr = ["GOD 愛しのぺーたん", "UR ダイヤモンドのうるティ", "SSR 金のうるティ", "SR 銀のうるティ", "R 銅のうるティ", "N ただのうるティ"];
  const weight = [0.1, 1, 8, 16, 30, 45];
  let result = "";

  let totalWeight = 0;
  for (let i = 0; i < weight.length; i++) {
    totalWeight += weight[i];
  }
  let random = Math.floor(Math.random() * totalWeight);
  
  for (let i = 0; i < weight.length; i++) {
    if (random < weight[i]) {
      result = arr[i];
      break;
    } else {
      random -= weight[i];
    }
  }

  await interaction.reply(`${result} が出たよ～！`);
}
