import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("letsgame")
  .setDescription("レッツゴー！");

export async function execute(interaction) {
  const arr = ["ケーキの名前", "果物の名前", "野菜の名前", "お菓子の名前", "焼肉の部位の名前", "焼肉の部位の名前", "焼肉の部位の名前", "焼肉の部位の名前", "焼肉の部位の名前", "焼肉の部位の名前"];
  const weight = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
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

  await interaction.reply(`うるティから始める山手線ゲーム\nいぇーーーーい！\nお題は　${result} ！`);
}
